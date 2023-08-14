import { Configuration, OpenAIApi } from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

// 사용자의 apiKey 설정
const configuration = new Configuration({
  apiKey: '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',
});

// gpt 호출하는 부분
export class ApiCaller {
  public prompt: any;
  constructor() {}

  async createChatCompletion(
    config: any,
    outputType: OutputType,
    count: number,
  ): Promise<any> {
    this.prompt = `나는 인공지능 AI Chatbot이야. 질문을 하면 내가 답변을 해줄께. 만약 모른다면 "모름"이라고 할께.
      \n\nQ: ${JSON.stringify(
        config,
      )} 해당 data-config를 보고 임시 데이터 ${count}개를 ${outputType}형식으로 만들어줘
      A:`;
  }

  async callGptApi() {
    try {
      const openai = new OpenAIApi(configuration); // Configuration을 생성하여 전달할 수도 있음

      const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: this.prompt }],
      });

      return result.data.choices.map(
        (choice: any) => choice.message.content,
      );
    } catch (error) {
      console.log(error);
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
    const { outputPath } = this.options;

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
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
  const columns = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
  console.log(`columns : ${columns}`);
  return columns;
}

export enum OutputType {
  JSON = 'json',
  XML = 'xml',
}
