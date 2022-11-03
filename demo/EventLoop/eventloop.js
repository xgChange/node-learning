/**
 * 浏览器端：
 * 宏、微任务
 *
 * 完整事件执行顺序：
 * 1. 从上至下执行所有的同步代码
 * 2. 执行过程中将遇到的宏任务和微任务添加到相应的队列
 * 3. 同步代码执行完毕后，执行满足条件的微任务回调
 * 4. 微任务执行完毕后，执行所有的宏任务回调
 * 5. 循环事件环操作
 *
 * 每执行一个宏任务之后就会立即检查微任务队列
 */

/**
 * Node中的事件循环
 *
 * 操作顺序
 * (都是队列，事件环，有顺序的)
 * close callbacks -> timers -> pending callbacks -> idle, prepare -> poll -> check -> close callbacks
 *
 * timers: 执行 setTimeout 和 setInterval 回调
 * pending callbacks: 执行操作系统的回调，例如 tcp udp
 * idle, prepare: 只在系统内部使用
 * poll: 执行I/O相关回调
 * check: 执行 setImmediate 中的回调
 * close callbacks: 执行close事件的回调
 *
 *
 * Node完整事件环
 * 1. 执行同步代码，将不同的任务添加到相应的队列
 * 2. 所有同步代码执行完毕后，执行满足条件的微任务
 * 3. 所有微任务执行后，会执行timer里面的宏任务
 * 4. timer里面的宏任务执行完成后，就会依次切换队列
 *
 * 在完成队列切换之前会先清空微任务
 *
 * 只关注三个队列：timer、poll、check
 *
 * nextTick 执行优先级高于 promise
 */

// node 中的
// setTimeout(() => {
//   console.log('s1')
// })

// Promise.resolve().then(r => {
//   console.log('p1')
// })

// console.log('start')

// process.nextTick(() => {
//   console.log('nextTick')
// })

// setImmediate(() => {
//   console.log('setImmediate')
// })

// console.log('end')

// start end nextTick p1 s1 setImmediate

// node 事件循环2 不同版本的node执行顺序会不一样，测试在10的时候 会先跑里面的宏，然后再清空里面的所有微
setTimeout(() => {
  console.log('s1')

  Promise.resolve().then((r) => {
    console.log('s1-p1')
  })

  process.nextTick(() => {
    console.log('s1 - n1')
  })
})

setTimeout(() => {
  console.log('s2')
  Promise.resolve().then((r) => {
    console.log('s2-p2')
  })

  process.nextTick(() => {
    console.log('s2 - n2')
  })
})

Promise.resolve().then((r) => {
  console.log('p1')
})

console.log('start')

process.nextTick(() => {
  console.log('nextTick')

  setImmediate(() => {
    console.log('n1 - st1')
  })
  setTimeout(() => {
    console.log('n1 - s1')
  })
})

setImmediate(() => {
  console.log('setImmediate')
})

console.log('end')

// start end nextTick p1 s1 s1-n1 s1-p1 s2 setImmediate  n1-st1 n1-s1

/**
 * node 中的常见问题：
 * 默认情况下 如果setTimeout没传时间，则每次执行可能不同
 * 但是在 fs 回调里面，永远都是 setImmediate 再 s1；因为fs是属于poll，他在执行回调的时候，切换队列时会向下走到check，check就会走 setImmediate
 * 最后再回到 timer 环
 */
setTimeout(() => {
  console.log('s1')
})

setImmediate(() => {
  console.log('setImmediate')
})

// 这里面永远都是 先 setImmediate 再 s1
fs.readFile('', () => {
  setTimeout(() => {
    console.log('s1')
  })

  setImmediate(() => {
    console.log('setImmediate')
  })
})
