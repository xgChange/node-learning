const fs = require('fs')
const path = require('path')


const rs = fs.createReadStream(path.resolve(__dirname, 'text.txt'))
const ws = fs.createWriteStream(path.resolve(__dirname, 't2.txt'))

rs.pipe(process.stdout)

/**
 * 可读流 生产数据 rs
 * 可写流 消费数据 ws (消费数据可以在 onData 中监听到)
 * 全双工 Duplex
 * 转换流
 */