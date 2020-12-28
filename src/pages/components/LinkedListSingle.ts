interface NodeInterface <T> {
  val: T|null,
  next: NodeInterface<T>|null
}
// 节点
class LinkNode<V> {
  val: V|null;
  next: NodeInterface<V>|null  = null
  constructor (val: V) {
    this.val = val
  }
}

interface LinkedListInterface<T> {
  // 向链表末尾添加元素
  append: (val: T) => number;
  // 向指定位置添加元素
  insert: (position: number, val: T) => void;
  // 移除指定位置的元素
  removeAt: (position: number) => void;
  // 移除指定元素
  remove: (val: T) => void;
  // 指定元素的位置
  indexOf: (val: T) => number;
  // 链表是否为空
  isEmpty: () => boolean;
  // 链表长度
  size: () => number;
  // 获取链头
  getHead: () => NodeInterface<T> | null
  // 将LinkedList对象转换为字符串
  toString: () => string
  // 输出链表
  print: () => void
}

// 链表
class LinkedList<V> implements LinkedListInterface<V> {
  length = 0
  head: NodeInterface<V>|null = null

  // 向链表末尾添加元素
  append (val: V): number {
    const node = new LinkNode<V>(val)
    if (!this.head) {
      this.head = node
      return ++this.length
    }
    let head = this.head
    while (head.next) {
      head = head.next
    }
    head.next = node
    return ++this.length
  }
  // 向指定位置添加元素
  insert (position: number, val: V) {
    // 边界
    if (position < 0 || position > this.length - 1) {
      return this.length
    }
    
    const node = new LinkNode(val)

    if (position === 0) {
      node.next = this.head
      this.head = node
      return ++this.length
    }
    let current: any = this.head, i = 0, previous
    while (i++ < position) {
      previous = current
      current = current.next
    }
    node.next = current
    previous.next = node
    return ++this.length
  }
  // 移除指定位置的元素
  removeAt (position: number) {
    if (position < 0 || position >= this.length) {
      return
    }
    if (!this.head) {
      return
    }

    if (position === 0) {
      this.head = this.head.next
      this.length = 0
      return
    }
    let current: any = this.head, i: number = 0, previous = null
    while (i++ < position) {
      previous = current
      current = current.next
    }
    previous.next = current.next
    this.length--
  }
  // 移除指定元素
  remove (val: V) {
    if (!this.head) {
      return
    }
    let current: any = this.head
    while (current.next) {
      if (current.next.val === val) {
        // 移除相同的元素 1, 2, 2
        let loopCurrent = current.next
        current.next = loopCurrent.next
        this.length--
      } else {
        current = current.next
      }
    }
    // 第一个未处理
    if (this.head.val === val) {
      this.head = this.head.next
      this.length--
    }
  }
  // 指定元素的位置
  indexOf (val: V) {
    if (!this.head) {
      return -1
    }

    let current: any = this.head, i: number = 0
    while (current) {
      if (current.val === val) {
        return i
      }
      i++
      current = current.next
    }
    return -1
  }
  // 链表是否为空
  isEmpty () {
    return !this.length
  }
  // 链表长度
  size () {
    return this.length
  }
  // 获取链头
  getHead () {
    return this.head
  }
  // 将LinkedList对象转换为字符串
  toString () {
    let current = this.head
    let str = ''
    if (!current) {
      return str
    }
    let dot = ' '

    while (current) {
      str += `${dot}{val: ${current.val}, next: ${current.next ? 'next' : 'null'}}\n`
      dot += ' '
      current = current.next
    }
    return str // JSON.stringify(this.head)
  }
  // 输出链表
  print () {
    let current = this.head
    if (!current) {
      return 'list is empty'
    }
    let str = 'linkedList size:' + this.size() + '\n', dot = '>', position = 0
    while (current) {
      str += `${dot} position: ${position++} \n`
      str += `${dot} val: ${current.val} \n`
      str += `${dot} next: ${current.next ? 'LinkNode' : 'null'} \n`
      str += '\n'
      dot += '>'
      current = current.next
    }
    console.log(str)
  }
}

;(function () {
  
  const linkedList = new LinkedList<number>()
  ;[1, 2, 2, 3, 4].forEach((item) => {
    linkedList.append(item)
  })

  // linkedList.removeAt(2)
  // linkedList.remove(2)
  // console.log(linkedList.size())
  // console.log(linkedList.toString())
  console.log(linkedList.indexOf(2))
  // linkedList.print()
  
})();
