#!/usr/bin/env node
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const commander = require('commander');
const program = new commander.Command();
const jsonfile = require('jsonfile');
const { ApiCaller } = require("../utils/api-caller");
require('../utils/api-caller');

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
      const config = jsonfile.readFile(options.file);
      const client = ApiCaller.createClient('token');
      const result = await client.generateDummyData(config, options.output, 10);
    
      console.log(`result: ${JSON.stringify(result)}`);
      const outputPath = `./default.${options.output}`;
      jsonfile.writeFile(outputPath, result);
      console.log(`Dummy data saved to: ${outputPath}`);
    } 
    catch (error) {
      console.error('Error:', error.message);
    }
  });



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Start function
const start = async function () {
  console.log("hellodd");
  const chat_completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: "더미데이터를 만들어서 JSON으로 출력해줘 " },
    ],
  });
  console.log(JSON.stringify(chat_completion.data.choices[0].message.content));
};

start();

// TODO:
// 명령어를 입력하면 config 파일을 읽어와서 (xml, json, sql)파일을 읽어와서
// -> 위에 프롬프트에서 위 값을 입력해서 원하는 더미 내용을 생성 -> 파일로 저장
// 사용자가 쉽게 만들수 있도록 해야함
// nest js cli 보면 굉장히 심플하게 되어 있음
//
program.option("--generate").option("-s, --separator <char>");
program.option("--loadxml").option("-s, --separator <char>");
program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));
