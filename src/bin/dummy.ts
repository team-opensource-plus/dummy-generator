#!/usr/bin/env node
import { GenerateCommand } from '../commands';
import { BANNER } from '../ui';

const initCommand = new GenerateCommand();

console.log(BANNER);
initCommand.load();
