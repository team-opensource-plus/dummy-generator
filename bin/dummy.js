#!/usr/bin/env node
import { Configuration, OpenAIApi } from "openai";
import { Command } from 'commander';
import { ApiCaller } from "./gptapi/api-caller.js";
require("dotenv").config();
const program = new Command();
import { readFileSync, writeFileSync } from 'jsonfile';
// const  test = require('@util/api');
// test.test();
// require('../gptapi');
// const ApiCaller = apiCaller.ApiCaller;

program.name('dummy data generator').description('dummy data generator').version('0.0.1');
program.command('g').description('Generate dummy data').requiredOption('-f, --file <path>', 'import data config file path').option('-o, --output <type>', 'Output type (json or xml)', 'json').action(async options => {
  try {
    const configFilePath = path.resolve(options.file);
    const columns = JSON.parse(readFileSync(configFilePath, 'utf-8'));
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
    const prompt = `나는 인공지능 AI Chatbot이야. 질문을 하면 내가 답변을 해줄께. 만약 모른다면 "모름"이라고 할께.
      \n\nQ: ${JSON.stringify(columns)} 해당 data-config 를 보고 임시 데이터 10개를 json 형식으로 만들어줘
      A:`;
    const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"]
    });
    const jsonData = chat_completion.data.choices[0].message.content;
    const dataObj = JSON.parse(jsonData);
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