#! /usr/bin/env node

const { program } = require('commander')

const options = {
  '-p --port <p...>': {
    description: 'init server port',
    example: 'mycliserver -p 1234',
  },
  '-d --directory <d...>': {
    description: 'init server directory',
    example: 'mycliserver -d directory',
  },
}

function formatConfigs(configs, cb) {
  Object.entries(configs).forEach(([key, val]) => {
    cb(key, val)
  })
}

formatConfigs(options, (key, val) => {
  program.option(key, val.description)
})

program.on('--help', () => {
  const examples = []
  formatConfigs(options, (key, val) => {
    examples.push(`$ ${val.example}`)
  })
  
  program.addHelpText('after', `
Example call: 
  ${examples.join('\n  ')}
  `)
})

const version = require('../package.json')
program.version(version.version)
program.name('mycliserver')

program.parse(process.argv)

const cmdOptions = program.opts()
console.log(cmdOptions)