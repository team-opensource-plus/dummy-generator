import { Command } from 'commander';
import * as fs from 'fs';

// extends GenerateCommand import constructor
export const initCommand = async (program: Command, tokenPath: string) => {
  program
    .command('init')
    .argument('<token>', 'set openai token')
    .action((token) => {
      try {
        if (!fs.existsSync(tokenPath)) {
          fs.mkdirSync(tokenPath);
        }
      } catch (err) {
        console.error(err);
      }

      (async () => {
        fs.writeFileSync(`${tokenPath}/gptToken`, token);
      })();

      const tokenResult = fs.readFileSync(`${tokenPath}/gptToken`, 'utf8');

      console.log('success set token : ', tokenResult);
    });
};
