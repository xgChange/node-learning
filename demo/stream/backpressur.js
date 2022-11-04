/**
 * @description 背压机制
 *
 * 数据被磁盘读取到内存的速度，远大于写入到磁盘的速度
 * 消费者速度 跟不上 生产者速度
 *
 * 可能会造成内存溢出、GC频繁调用、其他进程变慢
 */

const fs = require('fs')
const path = require('path')

const rs = fs.createReadStream(path.resolve(__dirname, 't2.txt'), {
  highWaterMark: 2,
})

const ws = fs.createWriteStream(path.resolve(__dirname, 't3.txt'), {
  highWaterMark: 1,
})

function controlStream() {
  let flag = true
  rs.on('data', (v) => {
    flag = ws.write(v)
    if (!flag) {
      rs.pause()
    }
  })

  // 当 ws.write 返回了false后，并且当适合恢复继续wirte时会触发
  ws.on('drain', () => {
    rs.resume()
  })
}

controlStream()
