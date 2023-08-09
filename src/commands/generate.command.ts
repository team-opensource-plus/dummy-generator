import {Command, CommanderStatic} from 'commander';
export class GenerateCommand {

  public async load(program: CommanderStatic): Promise<void> {

    program
      .command('generate')
      .alias('g')
      .requiredOption(
        '-f, --file <path>', 
        'Data config file path')
      .option(
        '-t, --type <type>', 
        'Specifies the request type for data output.[json or xml]', 
        'json')
      .option(
        '-c, --count <number>',
        'Specifies the number of data records to generate.'
      )
      .action( async (command: Command) => {
        const options: any[] = []; 
        options.push({ name: 'file', value: command.file! });
        options.push({ name: 'type', value: command.type ?? 'json' });
        options.push({ name: 'count', value: command.count! });
      });
    }
}