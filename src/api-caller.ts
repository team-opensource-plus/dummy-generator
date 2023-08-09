import {  Configuration,  OpenAIApi } from "openai";
import * as fs from 'fs';
import * as path from 'path';


// 사용자의 apiKey 설정
const configuration = new Configuration({
  organization: 'org-en1pZyG8yVp5oemdDiDLPXof',
  apiKey: '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'
});


// 파일 읽어오는 부분
export function parseConfigFile(filePath: string): any {
  const configFilePath = path.resolve(filePath);
  console.log(`configFilePath : ${configFilePath}`);
  const columns = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
  console.log(`columns : ${columns}`);
  return columns;
}


// 프롬프트 명령어
export function generateChatPrompt(columns: any[]): string {
  const prompt = `나는 인공지능 AI Chatbot이야. 질문을 하면 내가 답변을 해줄께. 만약 모른다면 "모름"이라고 할께.
      \n\nQ: ${JSON.stringify(columns)} 해당 data-config 를 보고 임시 데이터 10개를 json 형식으로 만들어줘
      A:`;
  return prompt;
}


// gpt 호출하는 부분
export class ApiCaller {

  async createChatCompletion(prompt: string): Promise<any> {
    const openai = new OpenAIApi(configuration); // Configuration을 생성하여 전달할 수도 있음

    return openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
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


// export enum OutputType {
//   JSON = 'json', 
//   XML = 'xml'
// }