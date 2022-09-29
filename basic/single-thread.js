// 单线程

// 阻塞同步代码
function sleepTime(time) {
  const sleep = Date.now() + time * 1000
  while(Date.now() < sleep) {}

  return
}