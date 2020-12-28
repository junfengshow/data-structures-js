---
title: 简介
group:
  title: 链表
  order: 3
footer: false
---
# 链表 LinkedList
## 简介
+ 要存储多个元素数组或者链表是最常用的数据结构。
+ 数组的缺点是从数组的中间或者起点插入或者数据的成本很高，因为要移动元素。
+ 链表是存储有序的元素集合，不同于数组其中的元素在内存中并不是连续放置的。每个元素由一个存储元素
+ 本身的节点和一个指向下一个元素的引用。
+ 所以链表的**好处在于添加或者移除元素**的时候不需要移动其它元素。

## 属性及方法
### 节点
```typescript
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
```
### 方法
```typescript
// 链表
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
```

## 参考链接
+ [1.单向列表](/foundation/linked-list/list-1-single)
+ [2.双向列表](/foundation/linked-list/list-2-doubly)
