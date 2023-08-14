import {
  Configuration,
  OpenAIApi
} from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

// 사용자의 apiKey 설정
const configuration = new Configuration({
  apiKey: 'YOUR_API_KEY',
});

// gpt 호출하는 부분
export class ApiCaller {
  private prompt: any;
  constructor() {}
  async createChatCompletion(
    config: any,
    outputType: OutputType,
    count: number,
  ): Promise < any > {
    this.prompt = `나는 인공지능 AI Chatbot이야. 질문을 하면 내가 답변을 해줄께. 만약 모른다면 "모름"이라고 할께.
      \n\nQ: ${JSON.stringify(
        config,
      )} 해당 data-config를 보고 임시 데이터 ${count}개를 ${outputType}형식으로 만들어줘
      A:`;
  }

  async callGptApi(updateProgress: (progress: number) => void) {
    try {
      const openai = new OpenAIApi(configuration);
      const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: this.prompt }],
      });
  
      const processedResult = result.data.choices.map((choice: any) => choice.message.content);
      
      for (let i = 0; i <= 100; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        updateProgress(i / 100); // 프로그래스 진행률 업데이트
      }
  
      return processedResult;
    } catch (error) {
      console.log('callGptApi error');
      throw error;
    }
  }

}

// 파일 저장하는 부분
export interface SaveOptions {
  outputPath: string;
}

export class DataSaver {
  constructor(private options: SaveOptions) {}

  saveData(dataObj: any) {
    const {
      outputPath
    } = this.options;

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, {
        recursive: true
      });
    }

    const now = new Date();
    const timestamp = now.getTime();

    const defaultName = `dummy_${timestamp}.json`;
    console.log(`defaultName : ${defaultName}`);

    const filePath = path.join(outputPath, defaultName);
    console.log(`filePath : ${filePath}`);

    fs.writeFileSync(filePath, JSON.stringify(dataObj, null, 2));

    console.log(`Dummy data saved to: ${filePath}`);
  }
}

// 파일 읽어오는 부분
export function parseConfigFile(filePath: string): any {
  const configFilePath = path.resolve(filePath);
  console.log(`configFilePath : ${configFilePath}`);
  const data = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));

  const outputType = data['output-type'];
  if (
    outputType == undefined ||
    (outputType !== 'json' && outputType !== 'xml' && outputType !== 'csv')
  ) {
    throw new Error('Invalid outputType');
  }

  const requireCount = data['require_count'];
  if (requireCount == undefined || requireCount <= 0) {
    throw new Error('Invalid requireCount');
  }

  const columns = data.columns;
  columns.forEach((column: {
    [x: string]: any
  }) => {
    const columnName = column['column-name'];
    const columnDescription = column['column-description'];
    const maxLength = column['max-length'];
    const isUnique = column['unique'];

    console.log(`Column Name: ${columnName}`);
    console.log(`Column Description: ${columnDescription}`);
    console.log(`Max Length: ${maxLength}`);
    console.log(`Unique: ${isUnique}`);
    console.log('---');

    if (
      columnName === undefined ||
      columnDescription === undefined ||
      maxLength === undefined ||
      isUnique === undefined
    ) {
      throw new Error('Invalid config file');
    }
  });

  console.log(`columns : ${columns}`);
  return columns;
}

export enum OutputType {
  JSON = 'json',
    XML = 'xml',
}