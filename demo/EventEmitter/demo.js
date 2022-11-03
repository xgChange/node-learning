const EventEmitter = require('events')

const ev = new EventEmitter()

ev.on('e1', () => {
  console.log('e1')
})

ev.emit('e1')