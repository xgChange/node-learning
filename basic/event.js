const EventEmitter = require('events')

const myEvent = new EventEmitter()

myEvent.on('event1', () => {
  console.log('监听事件1')
})

myEvent.emit('event1')