---
title: 集合简介
group: 
  title: 集合
  order: 4
footer: false
---
集合
===

集合是由一组无序且唯一的项组成。

## 方法
### 创建集合
```typescript
// typescript
interface SetDemoInterface<T> {
  // 如果值在集合中返回true，否则返回false
  has: (value: T) => boolean;
  // 向集合中添加一个值
  add: (value: T) => boolean;
  // 从集合中移除一个值
  delete: (value: T) => boolean;
  // 清空集合
  clear: () => void;
  // 返回集合中项的数量
  size: () => number;
  // 返回一个包含集合中所有值的数组
  values: () => Array<T>;
}
```

### 操作集合
```typescript
interface SetDemoInterface<T> {
  // ...
  // 合并两个集合 
  union?: (otherSet: SetDemoInterface<T>) => SetDemoInterface<T>;
  // 集合的交集
  intersection?: (otherSet: SetDemoInterface<T>) => SetDemoInterface<T>;
  // 集合的差集
  difference?: (otherSet: SetDemoInterface<T>) => SetDemoInterface<T>;
  // 集合的子集
  subset?: (otherSet: SetDemoInterface<T>) => SetDemoInterface<T>;
}
```


## ES6 -- Set类
ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
Set本身是一个构造函数，用来生成Set数据结构。
<br />
Set函数可以接受一个数组或者具有iterable接口的其它数据结构参数，用来初始化。

### 实例属性
+ Set.prototype.constructor
+ Set.prototype.size (getter)

### 实例方法
```typescript
interface Set<T> {
  add: (value: T) => this;
  clear: () => void;
  delete: (value: T) => boolean;
  forEach: (
    callbackfn: (value: T, value2: T, set: Set<T>) => void, 
    thisArg?: any
  ) => void;
  has: (value: T) => boolean;
  readonly size: number;
}
```
### 遍历
+ Set.prototype.forEach
+ Set.prototype.keys (返回键名的遍历器)
+ Set.prototype.values (返回键值的遍历器)
+ Set.prototype.entries (返回键值对的遍历器)

### 间接配合数组方法
+ map
+ filter
+ reduce

## ES6 -- WeakSet类
其与Set的区别:
+ WeakSet的成员只能是对象，而不能是其它类型的值。
+ WeakSet中的对象都是弱引用，即垃圾回收机制不考虑该对象的引用。
+ WeakSet不可遍历，因为垃圾回收机制，可能已经将对象回收。

```typescript
interface WeakSet<T extends object> {
  add(value: T): this;
  delete(value: T): boolean;
  has(value: T): boolean;
}
```

WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，
很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，
而不用担心这些节点从文档移除时，会引发内存泄漏。
