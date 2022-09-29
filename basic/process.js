const fs = require('fs');

// 1. 内存
console.log(process.memoryUsage())

// 2. cpu
console.log(process.cpuUsage())

// 3. 运行环境
console.log(process.cwd()) // 当前的工作目录
console.log(process.version) // node 版本
console.log(process.versions) // 更多的版本信息
console.log(process.arch) // cpu 架构
// console.log(process.env) // 用户环境
console.log(process.platform) // 系统平台


// 4. 运行状态：启动参数、pid、运行时间

console.log(process.argv) // 启动参数
console.log(process.pid) // pid
console.log(process.uptime()) // 运行时间

// 5. 事件
// process.on() // 监听
// 有 exit 、beforeExit; exit 里面只能写同步代码、before里面可以写异步

// 6. 标准输出、输入 错误 流
console.log = function (data) {
  process.stdout.write('--' + data + '\n') // 可以把 console的内容写到日志中
}

console.log(11)
console.log(22)