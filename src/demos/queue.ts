/**
 * 
 * 队列
 */
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

export class Queue <T> implements QueueInterface<T> {
  items: Array<T> = [];

  // 想队列中添加一个或者多个元素
  enqueue (elements: T|Array<T>) {
    
    if (Array.isArray(elements)) {
      this.items.push(...elements)
    } else {
      
      this.items.push(elements)
    }
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
  print () {
    console.log(this.items)
  }
}

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

;(function () {
  const queue = new Queue<number>()
  
  ;[1, 2, 3, 4].forEach((item, index) => {
    queue.enqueue(item)
  })
  // console.log(queue.isEmpty())
  // queue.print()
})();
;(function () {
  const queue = new PriorityQueue<number>()
  
  ;[1, 2, 3, 4].forEach((item, index) => {
    queue.enqueuePriority(item, 10 - index)
  })

  // queue.print()
})();

let loop = 0
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
    // console.log(`${eliminated}被淘汰了`)
  }
  // console.log(queue.dequeue()) 
})(['Mark', 'Jane','Jack','Camila','Ingrid','Carl'], 2);