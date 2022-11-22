/**
 * TCP 建立
 * Net模块实现了底部通信接口
 *
 * @desription
 * 通信过程：
 * 创建服务端：接收和回写客户端数据
 * 创建客户端：发送和接受服务的数据
 * 数据传输：内置服务事件和方法读写数据
 */

const net = require('net')

const PORT = 1234
const localIp = 'localhost'
const server = net.createServer((socket) => {
  socket.on('connect', () => {
    console.log('服务端已连接')
  })

  socket.on('data', (data) => {
    console.log('服务端接受数据', data.toString())

    socket.write(`这是服务端的数据-${data.toString()}`)
  })
})

server.listen(PORT, localIp)

server.on('connection', () => {
  console.log('服务端已连接')
})

server.on('listening', () => {
  console.log(`http://${localIp}:${PORT} is successed`)
})

server.on('close', () => {
  console.log('服务端断开连接')
})

// 客户端
const client = net.createConnection({
  port: PORT,
  host: localIp,
})

client.on('connect', () => {
  console.log('客户端已连接')
  client.write('客户端的数据')
})

client.on('data', (data) => {
  console.log('客户端接受数据', data.toString())
})

client.on('close', () => {
  console.log('客户端断开连接')
})
