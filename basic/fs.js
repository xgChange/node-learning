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

copyFile('data.txt', 'data-copy.txt')
