const fs = require('fs')

const buf = Buffer.alloc(6)

// fs.writeFile(
//   'data.txt',
//   'hello world',
//   {
//     mode: 0o777,
//     flag: 'w',
//     encoding: 'utf-8',
//   },
//   (e, d) => {
//     if (!e) {
//       fs.readFile('data.txt', 'utf-8', (e, r) => {
//         console.log(r)
//       })
//     }
//   }
// )

// 打开文件
// fs.open('data.txt', 'r', (err, fd) => {
//   // 读取文件
//   fs.read(fd, buf, 0, 3, 0, (err, bytesRead, buffer) => {
//     // console.log(bytesRead)
//     console.log('first', buffer.toString())
//     console.log('\n')

//     // 继续读取
//     fs.read(fd, buf, 3, 3, 3, (err, bytesRead, buffer) => {
//       // console.log(bytesRead)
//       // console.log(buffer)
//       console.log('second', buffer.toString())
//     })
//   })
// })

function copyFile(sourceFile, targetFile) {
  fs.readFile(sourceFile, 'utf-8', (e, d) => {
    if (!e) {
      fs.writeFile(targetFile, d, (err) => {
        if (err) {
          console.log(err)
          throw err
        }
      })
    } else {
      throw e
    }
  })
}

// copyFile('data.txt', 'data-copy.txt')

fs.open('data.txt', 'r', (e, rd) => {
  console.log(rd)
})

/**
 * rfd是表示文件标识符
 * buf 是 buffer -> Buffer.alloc(10)
 * 第三个参数是从buffer的第几位开始
 * 第四个参数是读的长度
 * 第五个参数是从文件第几个字节对应的位置开始读取
 * fs.read(rfd, buf, 0, 3, 0, (err, readBytes, data) => {
 *  // 
 * })
 */

/**
 * write 将缓冲区里的内容写入磁盘中
 * wfd 文件标识符
 * buf buffer
 * 第三个参数：从buffer的第几个位置
 * 第四个参数：长度
 * 第五个参数：从文件的哪个位开始写(一般写0，从头开始写)
 */

