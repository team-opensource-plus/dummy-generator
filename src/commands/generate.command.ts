import { Command } from 'commander';
import { ApiCaller, OutputType } from '../gptapi';
import * as jsonfile from 'jsonfile';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import cliProgress from 'cli-progress';
import colors from 'ansi-colors';

export class GenerateCommand {
  private program;
  public token_path = `${process.env.HOME}/.dummy-generator`;
  constructor() {
    this.program = new Command();
  }

  public async load(): Promise<void> {
    this.program
      .name('dummy data generator')
      .description('dummy data generator')
      .version('0.0.1');

    this.program
      .command('init')
      .argument('<token>', 'set openai token')
      .action((token) => {
        try {
          if (!fs.existsSync(this.token_path)) {
            fs.mkdirSync(this.token_path);
          }
        } catch (err) {
          console.error(err);
        }
        (async () => {
          fs.writeFileSync(`${this.token_path}/gptToken`, token);
        })();

        const hello = fs.readFileSync(`${this.token_path}/gptToken`, 'utf8');
        console.log(hello);
      });

    this.program
      .command('g')
      .requiredOption('-f, --file <path>', 'import data config file path')
      // .option('-f, --file <path>', 'import data config file path')
      .option('-o, --output <type>', 'Output type (json or xml)', 'json')
      .option('-l, --lang <type>', 'Language (ko or en)', 'ko')
      .option('-c, --count <number>', 'input count 100', '100')
      .action(async (options: any) => {
        try {
          try {
            fs.readFileSync(`${this.token_path}/gptToken`, 'utf8');
          } catch (err) {
            console.log('token is not exist');
            console.log('plase set token');
            console.log('dummy init token');
            return;
          }

          const progressBar = new cliProgress.SingleBar({
            format:
              colors.magenta('GPT Progress |') +
              colors.cyan('{bar}') +
              colors.magenta('| {percentage}%') +
              colors.magenta('|| {value}/{total} Chunks'),
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true,
          });

          if (options.file == undefined) {
            throw new Error('Error: file is undefined');
          }

          console.log(`-f : ${options.file}`);
          const filePath = options.file;
          const parts: string[] = options.file.split('.');

          const fileExtension: string =
            parts.length > 1 ? parts.pop() || '' : '';

          console.log('File extension:', fileExtension);

          let config = null;

          if (fileExtension == 'json') {
            await validateConfigFile(filePath);
            config = JSON.stringify(jsonfile.readFileSync(filePath));
          } else {
            config = await readFileAsString(filePath);
          }

          const client = new ApiCaller();
          // 프로그래스 바, 시작 값을 0에서 전체 값을 100으로  설정
          progressBar.start(100, 0, {
            speed: 'N/A',
          });

          await client.createChatCompletion(config, OutputType.JSON, 10);

          const result = await client.callGptApi((progress) => {
            progressBar.update(progress * 100);
          });

          progressBar.stop();

          progressBar.increment();

          if (result == undefined) {
            throw new Error('Error: GPT error');
          }

          // Stop the progress bar
          progressBar.stop();

          const outputPath = `./default.${options.output}`;

          jsonfile.writeFileSync(outputPath, result);

          console.log(`Dummy data saved to: ${outputPath}`);
        } catch (error: any) {
          console.error('Error:', error.message);
        }
      });

    this.program.parse(process.argv);
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
  columns.forEach((column: { [x: string]: any }) => {
    const columnName = column['column-name'];
    const columnDescription = column['column-description'];
    const maxLength = column['max-length'];
    const isUnique = column['unique'];

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

function readFileAsString(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}