#!/usr/bin/env node
import { ApiCaller, parseConfigFile, DataSaver, SaveOptions, generateChatPrompt } from "./api-caller";
import {  Command } from 'commander';
import {  config } from "dotenv";
import path from "path";
config();

import figlet from "figlet";

const program = new Command();

// 기본 배너
console.log(figlet.textSync("DUMMY-GENERATOR"));

// 배너를 기본적으로 출력할지 여부
let showBanner = true;

// 기본 설정
program
  .name('dummy data generator')
  .description('dummy data generator')
  .version('0.0.1');


// 메인 기능
program
  .command('g')
  .description('Generate dummy data')
  .requiredOption('-f, --file <path>', 'import data config file path')
  .option('-o, --output <type>', 'Output type (json or xml)', 'json')
  .action(async (options) => {
    showBanner = false;
    try {

      const columns = parseConfigFile(options.file);

      const prompt = generateChatPrompt(columns);

      const apiCaller = new ApiCaller();

      const chat_completion = await apiCaller.createChatCompletion(prompt);

      const jsonData = chat_completion.data.choices[0].text;
      console.log(`jsonData : ${jsonData}`);

      const dataObj = JSON.parse(jsonData);
      console.log(`dataObj : ${dataObj}`);

      const outputPath: SaveOptions = {
        outputPath: path.resolve(__dirname, '..', `${options.output}`),
      };
      const dataSaver = new DataSaver(outputPath);
      dataSaver.saveData(dataObj);
      
    } catch (error) {
      console.error('Error:', (error as Error).message);
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

// 배너 출력 여부에 따라 메시지 출력
if (showBanner) {
  console.log(figlet.textSync("DUMMY-GENERATOR"));
}

// const options = program.opts();
// const limit = options.first ? 1 : undefined;
// console.log(program.args[0].split(options.separator, limit));