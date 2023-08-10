#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const figlet = require("figlet");
import { readFileSync, writeFileSync } from 'jsonfile';
import { ApiCaller } from '../gptapi/api-caller';
require("dotenv").config();

console.log(figlet.textSync("Dummy Generator"));

program
  .name('dummy data generator')
  .description('dummy data generator')
  .version('0.0.1');

program
  .command('g')
  .description('Generate dummy data')
  .requiredOption('-f, --file <path>', 'import data config file path')
  .option('-o, --output <type>', 'Output type (json or xml)', 'json')
  .action(async (options: any) => {

    try {
      console.log(`-f : ${options.file}`);
      const config = await readFileSync(options.file);
      console.log(`config: ${JSON.stringify(config)}`);
      const client = ApiCaller.createClient('token');
      const result = await client.generateDummyData(config, options.output, 10);
      console.log(`result: ${JSON.stringify(result)}`);
      
      const outputPath = `./default.${options.output}`;
      await writeFileSync(outputPath, result);
      console.log(`Dummy data saved to: ${outputPath}`);
    } 
    catch (error: any) {
      console.error('Error:', error.message);
    }
  })
  .parse(process.argv);