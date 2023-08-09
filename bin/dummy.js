#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const jsonfile = require("jsonfile");
const program = new commander_1.Command();
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
        console.log(`-f : ${options.file}`);
        const config = await jsonfile.readFileSync(options.file);
        console.log(`config: ${JSON.stringify(config)}`);
        const result = config;
        console.log(`result: ${JSON.stringify(result)}`);
        const outputPath = `./default.${options.output}`;
        await jsonfile.writeFileSync(outputPath, result);
        console.log(`Dummy data saved to: ${outputPath}`);
    }
    catch (error) {
        console.error('Error:', error.message);
    }
});
//# sourceMappingURL=dummy.js.map