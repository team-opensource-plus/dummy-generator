#!/usr/bin/env node

'use strict';

const commander = require('commander');
const program = new commander.Command();

program
  .command('generator')
  .action(() => {
    console.log('hello world');
  });

program
  .parse();