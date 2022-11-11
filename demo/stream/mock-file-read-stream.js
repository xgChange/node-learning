/**
 * @description 模拟文件可读流
 */

const fs = require('fs')
const EventEmitter = require('events')
const path = require('path')
const promisify = require('util').promisify

const openFile = promisify(fs.open)
const read = promisify(fs.read)

class MyFileReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()

    this.path = path
    this.flags = options.flags || 'r'
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.end = options.end
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.readOffset = 0

    this.open()

    this.on('newListener', (name) => {
      if (name === 'data') {
        // 读数据
        this.read()
      }
    })
  }

  async open() {
    try {
      const fd = await openFile(this.path, this.flags, this.mode)
      this.fd = fd
      this.emit('open', this.fd)
    } catch (error) {
      this.emit('error', error)
    }
  }

  async read() {
    if (typeof this.fd !== 'number') return this.once('open', this.read)

    let howmuchToRead = this.end ? Math.min.call(null, this.end - this.readOffset + 1, this.highWaterMark) : this.highWaterMark

    console.log(howmuchToRead)

    let buffer = Buffer.alloc(this.highWaterMark)
    const { bytesRead } = await read(
      this.fd,
      buffer,
      0,
      howmuchToRead,
      this.readOffset
    )
    if (bytesRead) {
      this.readOffset += bytesRead
      this.emit('data', buffer.slice(0, bytesRead))
      this.read()
    } else {
      this.emit('end')
      this.close()
    }
  }

  close() {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
}

const myStream = new MyFileReadStream(path.resolve(__dirname, 't2.txt'), {
  end: 6,
  highWaterMark: 3
})

// myStream.on('open', (fd) => {
//   console.log('open', fd)
// })

// myStream.on('error', (e) => {
//   console.log('error', e)
// })

myStream.on('data', (d) => {
  console.log(d)
})

myStream.on('end', () => {
  console.log('end')
})

myStream.on('close', () => {
  console.log('close')
})
