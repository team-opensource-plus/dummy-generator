import { Command } from 'commander';
import { Configuration, OpenAIApi } from 'openai';
import { ApiCaller, OutputType } from '../gptapi';
import * as jsonfile from 'jsonfile';

export class GenerateCommand {
  private program;
  constructor() {
    this.program = new Command();
  }

  public async load(): Promise<void> {
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
          console.log(`-f : ${options.file}`);
          const config = await jsonfile.readFileSync(options.file);
          console.log(`config: ${JSON.stringify(config)}`);
          const client = new ApiCaller();

          const result = await client.createChatCompletion(
            config,
            OutputType.JSON,
            10,
          );
          const result2 = client.callGptApi();
          console.log(`result: ${JSON.stringify(result2)}`);

          const outputPath = `./default.${options.output}`;
          await jsonfile.writeFileSync(outputPath, result);
          console.log(`Dummy data saved to: ${outputPath}`);
        } catch (error: any) {
          console.error('Error:', error.message);
        }
      })
      .parse(process.argv);
  }
}
