---
title: 队列
order: 2
footer: false
---

## 队列简介
+ 队列是遵循先进先出FIFO原则的一组有序的项。  
+ 队列在尾部添加新元素，并从顶部移除元素。
+ 最新添加的元素必须排在队列的末尾。

## 方法
```typescript
interface QueueInterface <T> {
  // 想队列中添加一个或者多个元素
  enqueue: (elements: T|Array<T>, priority?: number) => void;
  // 移除队列的第一项，并返回被移除的元素
  dequeue: () => T|undefined;
  // 返回队列中第一个元素，队列不做任何变动
  front: () => T|undefined;
  // 判断队列是否为空
  isEmpty: () => boolean;
  // 队列的长度
  size: () => number;
}
```

## 方法实现
```typescript
class Queue <T> implements QueueInterface<T> {
  private items: Array<T> = [];

  // 想队列中添加一个或者多个元素
  enqueue (elements: T|Array<T>) {
    Array.isArray(elements)
    ? this.items.push(...elements)
    : this.items.push(elements)
  };
  // 移除队列的第一项，并返回被移除的元素
  dequeue (): T|undefined  {
    return this.items.shift()
  };
  // 返回队列中第一个元素，队列不做任何变动
  front (): T|undefined {
    return this.items.shift()
  };
  // 判断队列是否为空
  isEmpty (): boolean {
    return !this.items.length
  };
  // 队列的长度
  size (): number {
    return this.items.length
  };
  toString () {
    console.log(this.items)
  }
}
```

## 优先队列

### 节点
```typescript
interface QueueNodeType<T> {
  element: T,
  priority: number
}
class QueueNode <T> implements QueueNodeType<T> {
  element: T;
  priority: number;
  constructor (element: T, priority: number) {
    this.element = element
    this.priority = priority
  }
}
```
### 重写enqueue方法
```typescript
class PriorityQueue<E> extends Queue<QueueNodeType<E>> {
  enqueue (element: QueueNodeType<E>, priority?: number) {
    if (!priority) {
      priority = 0
    }
    let items = this.items
    let length = items.length
    
    for (let i = 0; i < length; i++) {
      if (priority > items[i].priority) {
        this.items.splice(i, 0, element)
        break
      }
    }
    if (length === 0 || length === this.items.length) {
      this.items.push(element)
    } 
  }
  enqueuePriority (val: E, priority: number) {
    const node: QueueNodeType<E> = new QueueNode<E>(val, priority)
    this.enqueue(node, priority)
  }
  print () {
    let str = ''
    this.items.forEach((item) => {
      str += `val: ${item.element}\n`
      str += `priority: ${item.priority}\n`
      str += '\n'
    })
    console.log(str)
  }
}
```
### 示例
```typescript
const queue = new PriorityQueue<number>()

;[1, 2, 3, 4].forEach((item, index) => {
  queue.enqueuePriority(item, 10 - index)
})

queue.print()
/*
val: 1
priority: 10

val: 2
priority: 9

val: 3
priority: 8

val: 4
priority: 7
*/
```

## 循环队列
```typescript
;(function(nameList: Array<string>, nums: number) {
 
  const queue = new Queue<string>()
  nameList.forEach((item) => {
    queue.enqueue(item)
  });
  let eliminated = ''
  while (queue.size() > 1) {
    for (let i = 0; i < nums; i++) {
      let _item = queue.dequeue()
      if (_item) {
        queue.enqueue(_item)
      }
    }
    eliminated = queue.dequeue() || ''
    console.log(`${eliminated}被淘汰了`)
  }
  console.log(queue.dequeue()) 
})(['Mark', 'Jane','Jack','Camila','Ingrid','Carl'], 2);
```
## js任务队列
当我们在浏览器中打开新标签时，就会创建一个任务队列。  
这是因为每个标签都是单线程处理所有的任务，它被称为事件循环。  
浏览器负责多个任务例如：渲染HTML、执行javascript代码、处理用户交互(用户输入、点击等)  
执行和处理异步请求。
