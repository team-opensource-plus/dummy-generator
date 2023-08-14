import {Command} from 'commander';
import {Configuration, OpenAIApi} from 'openai';
import {ApiCaller,OutputType} from '../gptapi';
import * as jsonfile from 'jsonfile';
import * as path from 'path';
import * as fs from 'fs';
import cliProgress from 'cli-progress';
import colors from 'ansi-colors';

export class GenerateCommand {
  private program;
  constructor() {
    this.program = new Command();
  }

  public async load(): Promise < void > {
    this.program
    .name('dummy data generator')
    .description('dummy data generator')
    .version('0.0.1');

    this.program
    .command('g')
    .requiredOption('-f, --file <path>', 'import data config file path')
    .option('-o, --output <type>', 'Output type (json or xml)', 'json')
    // .option('-c, --cout <number>', 'input count 100', '100')
    .action(async (options: any) => {
      try {

        const progressBar = new cliProgress.SingleBar({
          format: colors.magenta('GPT Progress |') + colors.cyan('{bar}') + colors.magenta('| {percentage}%') + colors.magenta('|| {value}/{total} Chunks'),
          barCompleteChar: '\u2588',
          barIncompleteChar: '\u2591',
          hideCursor: true
        });


        console.log(`-f : ${options.file}`);
        validateConfigFile(options.file);
        const config = await jsonfile.readFileSync(options.file);

        console.log(`config: ${JSON.stringify(config)}`);

        const client = new ApiCaller();
        // 프로그래스 바, 시작 값을 0에서 전체 값을 100으로  설정
        progressBar.start(100, 0, {
          speed: "N/A"
        });

        const result = await client.createChatCompletion(config, OutputType.JSON, 10);

        const result2 = await client.callGptApi((progress) => {
          progressBar.update(progress * 100);
        });

        progressBar.stop();

        progressBar.increment();
        console.log(`result : ${result2}`)
        if (result2 == undefined) {
          throw new Error('Error: GPT error');
        }

        // Stop the progress bar
        progressBar.stop();


        const outputPath = `./default.${options.output}`;

        await jsonfile.writeFileSync(outputPath, result2);

        console.log(`Dummy data saved to: ${outputPath}`);
      } catch (error: any) {
        console.error('Error:', error.message);
      }
    })
    .parse(process.argv);
  }
}

export function validateConfigFile(filePath: string): any {
  const configFilePath = path.resolve(filePath);
  console.log(`configFilePath : ${configFilePath}`);
  const data = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));

  const outputType = data['output_type'];
  console.log('output_type' + outputType);
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
