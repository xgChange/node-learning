/**
 * @description 自定义实现 copyFile 功能
 * 01 打开 a 文件，用 read将数据保存在buffer
 * 02 打开 b 文件，用 write 将 buffer 中的数据写到 b
 */

const promisify = require('util').promisify
const fs = require('fs')
const path = require('path')

const readFile = promisify(fs.read)
const writeFile = promisify(fs.write)
const openFile = promisify(fs.open)

async function copyFile(source, target) {
  const buffer = Buffer.alloc(3)
  const oneLength = buffer.length
  let readOffset = 0
  const openPromise = Promise.all([
    openFile(source, 'r'),
    openFile(target, 'w'),
  ])
  const [rfd, wfd] = await openPromise // 文件操作符

  const recursion = async () => {
    fs.read(
      rfd,
      buffer,
      0,
      oneLength,
      readOffset,
      (e, readBytes, readBuffer) => {
        console.log('111', readBytes, readBuffer, buffer)

        if (!readBytes) {
          fs.close(rfd)
          fs.close(wfd)
          return
        }
        readOffset += readBytes
        fs.write(wfd, readBuffer, 0, readBytes, () => {
          recursion()
        })
      }
    )
  }

  // const recursion = async () => {
  //   const { buffer: readBuffer, bytesRead: bytesRead } = await readFile(
  //     rfd,
  //     buffer,
  //     0,
  //     oneLength,
  //     readOffset
  //   )
  //   if (!bytesRead) {
  //     fs.close(rfd)
  //     fs.close(wfd)
  //     return
  //   }
  //   console.log(readBuffer, bytesRead)
  //   readOffset += bytesRead
  //   await writeFile(wfd, readBuffer, 0, bytesRead)
  //   await recursion()
  // }

  recursion()
}
console.log(__dirname)
copyFile(path.resolve(__dirname, 'a.md'), path.resolve(__dirname, 'b.md'))
