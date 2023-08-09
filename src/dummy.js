#!/usr/bin/env node
import { Configuration, OpenAIApi } from "openai";
import { Command } from 'commander';
import { config } from "dotenv";
import path from "path"; // path 모듈 추가
config();
const program = new Command();
import jsonfile from 'jsonfile';
import * as fs from 'fs';
// const  test = require('@util/api');
// test.test();
// require('../gptapi');
// const ApiCaller = apiCaller.ApiCaller;

program
  .name('dummy data generator')
  .description('dummy data generator')
  .version('0.0.1');

program
  .command('g')
  .description('Generate dummy data')
  .requiredOption('-f, --file <path>', 'import data config file path')
  .option('-o, --output <type>', 'Output type (json or xml)', 'json')
  .action(async (options) => {
    try {

      const configuration = new Configuration({
        organization: '',
        apiKey: '' 
      });

      const openai = new OpenAIApi(configuration);

      console.log(`options.file : ${options.file}`);
      
      const configFilePath = path.resolve(options.file);
      console.log(`configFilePath : ${configFilePath}`);

      //const columns = JSON.parse(jsonfile.readFileSync(configFilePath, 'utf-8'));
      const columns = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
      console.log(`columns : ${columns}`);

      const prompt = `나는 인공지능 AI Chatbot이야. 질문을 하면 내가 답변을 해줄께. 만약 모른다면 "모름"이라고 할께.
      \n\nQ: ${JSON.stringify(columns)} 해당 data-config 를 보고 임시 데이터 10개를 json 형식으로 만들어줘
      A:`;

      console.log(`prompt : ${prompt}`)

      // const chat_completion = await openai.createChatCompletion({
      //     // chat-gpt 언어 모델
      //     model: "text-davinci-003",
      //     // 프롬프트 명령어
      //     prompt: '아무거나 대답해',
      //     // 정직한 답변은 0, 상상력 발휘하기 원하면 2 이상
      //     temperature: 0,
      //     // 1024가 설정 기본값, 이상을 넘어가면 과금
      //     max_tokens: 1000,
      //     top_p: 1,
      //     frequency_penalty: 0.0,
      //     presence_penalty: 0.0,
      //     stop: ["\n"],
      // });

          const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt}],
    });

      const chat_completion = await openai.createCompletion(
        {
          model: "text-davinci-003",
          prompt: prompt,
        },
        {
          timeout: 10000,
          headers: {
            "Example-Header": "example",
          },
        }
      );
      
      console.log('OpenAI API Request:', chat_completion.config);
      console.log('OpenAI API Response:', chat_completion.data);
      
      // const jsonData = chat_completion.data.choices[0].message.content;
      const jsonData = chat_completion.data.choices[0].text;
      console.log(`jsonData : ${jsonData}`);
      const dataObj = JSON.parse(jsonData);
      console.log(`dataObj : ${dataObj}`);

      const outputPath = `./default.${options.output}`;
      writeFileSync(outputPath, JSON.stringify(dataObj, null, 2));
      console.log(`Dummy data saved to: ${outputPath}`);
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

program.parse(process.argv);

// start();

// TODO:
// 명령어를 입력하면 config 파일을 읽어와서 (xml, json, sql)파일을 읽어와서
// -> 위에 프롬프트에서 위 값을 입력해서 원하는 더미 내용을 생성 -> 파일로 저장
// 사용자가 쉽게 만들수 있도록 해야함
// nest js cli 보면 굉장히 심플하게 되어 있음
//
program.option("--generate").option("-s, --separator <char>");
program.option("--loadxml").option("-s, --separator <char>");
program.parse();

// const options = program.opts();
// const limit = options.first ? 1 : undefined;
// console.log(program.args[0].split(options.separator, limit));
