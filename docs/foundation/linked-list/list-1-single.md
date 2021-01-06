---
title: 单向链表
group:
  title: 链表
footer: false
---

单向链表
===
> 顾名思义是从表头到表尾是但流向的即只有next指向下一个节点的指针。
> 并无prev指向上一个节点的指针

### append
只需要考虑next指针。循环到链尾后将链尾到next属性指向该新创建到节点。

<a href='https://upload.junfengshow.com/docs/foundation/l1.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/foundation/l1.png'
    width='611'
  />
</a>

```typescript
// 向链表末尾添加元素
class LinkedList<V> implements LinkedListInterface<V> {
  // ...
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
  // ...
}
```

### insert
向指定位置添加元素。

```typescript
// 向指定位置添加元素
class LinkedList<V> implements LinkedListInterface<V> {
  // ...
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
    let current = this.head, i = 0, previous
    while (i++ < position) {
      previous = current
      current = current.next
    }
    node.next = current
    previous.next = node
    return ++this.length
  }
  // ...
}
```

### removeAt
移除指定位置的元素。

```typescript
class LinkedList<V> implements LinkedListInterface<V> {
  // ...
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
  // ...
}
```

### remove
移除指定元素。

```typescript
class LinkedList<V> implements LinkedListInterface<V> {
  // ...
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
  // ...
}
```

### indexOf
指定元素的位置。

```typescript
class LinkedList<V> implements LinkedListInterface<V> {
  // ...
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
  // ...
}
```

### isEmpty
判断链表是否为空。

```typescript
class LinkedList<V> implements LinkedListInterface<V> {
  // ...
  // 链表是否为空
  isEmpty () {
    return !this.length
  }
  // ...
}
```

### size
获取链表长度。

```typescript
class LinkedList<V> implements LinkedListInterface<V> {
  // ...
  // 链表长度
  size () {
    return this.length
  }
  // ...
}
```

### getHead
获取链头。

```typescript
class LinkedList<V> implements LinkedListInterface<V> {
  // ...
  // 获取链头
  getHead () {
    return this.head
  }
  // ...
}
```

### toString
将LinkedList对象转换为字符串，并返回。

```typescript
class LinkedList<V> implements LinkedListInterface<V> {
  // ...
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
    return str 
  }
  // ...
}
```

### print
输出链表。

```typescript
class LinkedList<V> implements LinkedListInterface<V> {
  // ...
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
  // ...
}
```