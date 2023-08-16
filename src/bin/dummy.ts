#!/usr/bin/env node
import { GenerateCommand } from '../commands';
import { callDummyGenearteBanner } from '../ui';
const init = new GenerateCommand();

callDummyGenearteBanner();
init.loadCommands();
