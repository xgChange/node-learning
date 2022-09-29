# 基础的api

## Node 中的全局对象 global，作为全局变量的宿主

- __filename: 返回正在执行脚本的绝对路径

- __dirname: 返回正在执行脚本所在的目录

- timer类函数：执行顺序与事件循环间的关系

- process 提供与当前进程互动的接口

- require 实现模块的加载

- module、exports 模块的导出

## 默认情况下，this是空对象，和global并不是一样的

> 例如使用 __filename 这些对象时，应该就是 iffe 函数里面的参数

## process 进程操作

```
进程对资源的消耗：cpu、内存.
```

- 内存

```javascript
process.memoryUsage()

{
  rss: 25325568, // 常驻内存
  heapTotal: 4603904, // 申请的内存
  heapUsed: 3702104,  // 实际使用的内存
  external: 220869, // 顶层模块c、c++ 占据的大小
  arrayBuffers: 11146 // 独立的内存大小 buffer
}
```

- cpu

```javascript
process.cpuUsage()
```

- 运行环境

```javascript
// 运行环境
console.log(process.cwd()) // 当前的工作目录
console.log(process.version) // node 版本
console.log(process.versions) // 更多的版本信息
console.log(process.arch) // cpu 架构
// console.log(process.env) // 用户环境
console.log(process.platform) // 系统平台
```

- 运行状态：启动参数、pid、运行时间

- 事件