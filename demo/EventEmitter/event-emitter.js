/**
 * @descrption event emitter
 */

/**
 * 发布订阅
 * 订阅者 (多个) -> 消息调度中心 <- 发布者
 *
 * 缓存队列，存放订阅者信息
 * 具有增加、删除订阅的能力
 * 状态改变时通知所有订阅者执行监听
 *
 * 观察者模式和发布订阅模式的区别：
 * 观察者模式中不存在 调度中心
 * 状态发生改变时，发布订阅无需主动通知，而有调度中心去处理
 */

// 调度中心
class PubSub {
  constructor() {
    this._events = []
  }

  subscribe(eventName, callback) {
    const callbacks = this._events[eventName]
    if (callbacks) {
      callbacks.push(callback)
    } else {
      this._events[eventName] = [callback]
    }
  }

  publish(eventname, ...args) {
    const callbacks = this._events[eventname]

    callbacks.forEach(item => {
      item.apply(this, args)
    })
  }
}

const pb = new PubSub()

pb.subscribe('e1', () => {
  console.log('e1')
})

pb.subscribe('e1', function (...args) {
  console.log('e1-2', args, this)
})

pb.publish('e1', '1', '3245')