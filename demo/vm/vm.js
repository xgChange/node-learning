const vm = require('vm')
const fs = require('fs')
const path = require('path')

const content = fs.readFileSync(path.resolve(__dirname, 'vm.txt'), 'utf-8')
// let p = 1

vm.runInThisContext(content)

console.log('outer p', p)