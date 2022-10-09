// 1. 创建 Buffer
// 1字节 = 1024比特，1比特 = 8位
// utf8下，一个汉字 = 3个字节，一个英文 = 一个字节

const b1 = Buffer.alloc(10)

// 可以接收三种类型，字符串、数组、buffer
// <Buffer 73> 表示在 utf8下 s 对应的16进制
const b2 = Buffer.from('汉')

// console.log(b1, b2)

// 2. 实例方法
// 将 s 填充到分配的 3个字节中去
const b3 = Buffer.alloc(3)
b3.fill('s')
console.log(b3, b3.toString())