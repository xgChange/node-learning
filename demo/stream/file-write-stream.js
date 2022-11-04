/**
 * @description write 执行流程
 */

const fs = require('fs')
const path = require('path')

const file = path.resolve(__dirname, './text2.txt')

const ws = fs.createWriteStream(file, {
  highWaterMark: 1, // 最多读多少个去缓冲区
})

// 如果flag为false并不是说明当前数据不能被写入，判断累计写入的是否小于highWaterMark

/**
 * 说明：上游（生产者） -> 下游（可写流) -> 文件
 * 
 * 1. 第一次调用 write 时将数据直接写到文件中
 * 2. 第二次调用 write 时将数据写入到缓存中
 * 3. 生产速度和消费速度是不一样的，一般情况下生产速度要比消费速度快很多
 * 4. 当 flag 为false时，并不意味着当前次的数据不能被写入了
 *    但是我们应该告知生产者，当前消费速度已经跟不上生产速度了，
 *    所以这个时候我们一般会将可读流的模块修改为暂停模式
 * 5. 当数据生产者暂停之后，消费者会慢慢的消化他内部缓存中的数据，直到可以再次被执行写入操作
 * 6. 当缓冲区可以继续写入数据时如何让生产者知道？onDrain事件
 */ 
// let flag = ws.write('1-')
// console.log(flag)

// flag = ws.write('2-')
// console.log(flag)

/**
 * drain 与 写入速度
 * 
 * 将数据分批的写入到文件中
 */

const source = ['a', 'b', 'c', 'd']

let flag = false
let num = 0

// 限流
function excuteWrite() {
  flag = true
  while(flag && num <= 3) {
    flag = ws.write(source[num])
    num++
  }
}

excuteWrite()

ws.on('drain', () => {
  console.log('drain')
  excuteWrite()
})