const path = require('path')

console.log(
  path.basename(__filename),
  path.dirname(__filename),
  path.extname(__filename)
)

// 解析路径
console.log(path.parse(__dirname))

// 序列化路径
const obj = path.parse(__dirname)
console.log(path.format(obj))

// 判断是否是绝对路径
console.log(path.isAbsolute(__dirname))