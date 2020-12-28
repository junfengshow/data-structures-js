// 栈和队列
function Stack () {
  this.stack = []
  this.length = 0
}
Stack.prototype.pushStack = function (ele) {
  this.length++
  return this.stack.push(ele)
}
Stack.prototype.popStack = function (ele) {
  if (!this.length) {
    return
  }
  this.length--
  return this.stack.pop()
}
Stack.prototype.isEmpty = function () {
  return !this.length
}

// 队列
function Queue () {
  this.queue = []
  this.length = 0
}
Queue.prototype.enqueue = function (ele) {
  this.length++
  return this.queue.push(ele)
}
Queue.prototype.dequeue = function () {
  if (!this.length) {
    return
  }
  this.length--
  return this.queue.shift()
}
Queue.prototype.isEmpty = function () {
  return !this.length
}

export {
  Stack, Queue
}
