const { Command } = require('commander');
const jsonfile = require('jsonfile');
const figlet = require('figlet'); 
const program = new Command();
import { ApiCaller } from "./gptapi/api-caller";

console.log(figlet.textSync( "Dummy Generator" ));

// program
//   .version("1.0.0")
//   .description("An example CLI for managing a directory")
//   .option("-l, --ls  [value]", "List directory contents")
//   .option("-m, --mkdir <value>", "Create a directory")
//   .option("-t, --touch <value>", "Create a file")
//   .parse(process.argv);

// const options = program.opts();

program
  .command('g')
  .requiredOption('-f, --file <path>', 'import data config file path')
  .option('-o, --output <type>', 'Output type (json or xml)', 'json')
  .action( async (options: any) => {

    try {
      console.log(`-f : ${options.file}`);
      const config = jsonfile.readFileSync(options.file);
      console.log(`config: ${JSON.stringify(config)}`);
      const client = new ApiCaller();
      const result = await client.generateDummyData();
      console.log(`result: ${JSON.stringify(result)}`);
      
      const outputPath = `./default.${options.output}`;
      jsonfile.writeFileSync(outputPath, result);
      console.log(`Dummy data saved to: ${outputPath}`);
    } 
    catch (error: any) {
      console.error('Error:', error.message);
    }
  }).parse(process.argv);



