class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {
  constructor(head, size) {
    this.head = head || null
    this.size = size || 0
  }

  _getNode(index) {
    if (index > this.size || index < 0) {
      throw new Error('cross the border from _getNode')
    }

    let cur = this.head
    let curIndex = 0
    while (curIndex < index) {
      cur = cur.next
      curIndex++
    }
    return cur
  }

  add(...args) {
    let index = args[0]
    let element = args[1]
    if (args.length === 1) {
      element = index
      index = this.size
    }

    if (index > this.size || index < 0) {
      throw new Error('cross the border')
    }

    // 如果没有node，添加一个
    if (index === 0) {
      let head = this.head
      this.head = new Node(element, head)
    } else {
      // 向指定位置添加 node
      let prevNode = this._getNode(index - 1)
      prevNode.next = new Node(element, prevNode.next)
    }

    this.size++
  }

  remove(index) {
    let rmNode = null
    if (index === 0) {
      rmNode = this.head
      if (!rmNode) {
        return undefined
      }
      this.head = rmNode.next
    } else {
      const prevNode = this._getNode(index - 1)
      rmNode = prevNode.next
      prevNode.next = rmNode.next
    }

    this.size--
    return rmNode
  }

  set(index, element) {
    const node = this._getNode(index)
    node.element = element
  }

  get(index) {
    return this._getNode(index)
  }

  clear() {
    this.head = null
    this.size = 0
  }

  print() {
    let cur = this.head
    let printResult = ''
    while (cur !== null) {
      printResult += cur.element + '-'
      cur = cur.next
    }

    return printResult
  }
}

// 链表模拟队列
class Queue {
  constructor() {
    this.LinkedList = new LinkedList()
  }

  enQueue(data) {
    this.LinkedList.add(data)
  }

  deQueue() {
    return this.LinkedList.remove(0)
  }

  print() {
    return this.LinkedList.print()
  }
}

// const li = new LinkedList()

// li.add('node1')
// li.add('node2')
// li.add('node3')
// li.add('node4')

// li.remove(1)
// li.remove(1)

// li.set(0, 'node1-1')
// console.log(li.get(0), 'get')

// li.clear()
// console.log(li)

const queue = new Queue()

queue.enQueue('node1')
queue.enQueue('node2')
queue.enQueue('node3')

console.log('deQueue', queue.deQueue())
console.log('deQueue', queue.deQueue())
console.log('deQueue', queue.deQueue())
// console.log('deQueue', queue.deQueue())
// console.log('deQueue', queue.deQueue())

console.log(queue, 'print', queue.print())
