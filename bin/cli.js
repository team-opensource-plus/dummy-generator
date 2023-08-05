#!/usr/bin/env node

const { program } = require('commander')

// action
program.action(cmd => console.log('✓ Running!!'))

program.parse(process.argv)