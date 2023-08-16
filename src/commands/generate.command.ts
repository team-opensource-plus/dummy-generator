import { Command } from 'commander';
import * as fs from 'fs';
import { initCommand, generateCommand } from './actions';

export class GenerateCommand {
  constructor(
    public program: Command = new Command(),
    public tokenPath: string = `${process.env.HOME}/.dummy-generator`,
  ) {
    (this.program = program), (this.tokenPath = tokenPath);
  }

  public async loadCommands(): Promise<void> {
    this.program
      .name('dummy data generator')
      .description('dummy data generator')
      .version('0.0.1');

    //init command
    initCommand(this.program, this.tokenPath);

    // generate command
    generateCommand(this.program, this.tokenPath);

    this.program.parse(process.argv);
  }
}
