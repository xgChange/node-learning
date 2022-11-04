/**
 * @description 文件可读流操作
 */

const fs = require('fs')
const path = require('path')

/**
 * 生产消费过程：
 * 生产者生产数据放到缓冲区；消费者从缓冲区中取数据消费数据
 */
const rs = fs.createReadStream(path.resolve(__dirname, './text.txt'), {
  mode: 438,
  flags: 'r',
  encoding: null,
  fd: null,
  autoClose: true,
  start: 0,
  highWaterMark: 3 // 最多读多少个去缓冲区
})

let buffers = []

rs.on('data', (v) => {
  buffers.push(v)
  // console.log('data', v.toString())
  // rs.pause() // 暂停
  // setTimeout(() => {
  //   rs.resume() // 恢复
  // }, 2000);
})

// rs.on('readable', v => {
//   // console.log('first', rs.read())
//   // let data = null
//   // console.log('----------', rs._readableState.length)
//   // while((data = rs.read(2)) !== null) { // read 中的 size 是每次从缓冲区读多少个
//   //   console.log(data)
//   // }
// })

rs.on('open', () => {
  console.log('open')
})

rs.on('end', () => {
  Buffer.concat(buffers)
  console.log('end', Buffer.concat(buffers).toString())
})

rs.on('close', () => {
  console.log('close')
})