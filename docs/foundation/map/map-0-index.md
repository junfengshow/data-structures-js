---
title: 简介
group:
  title: 字典
  order: 5
footer: false
---
## 字典简介 
在字典中，存储的是[键，值] 对，其中键名是用来查询特定元素的。字典和集合很相似，集合以[值，值]的形式存储元素，字 典则是以[键，值]的形式来存储元素。字典也称作映射。

### 基础方法
+ set(key,value):向字典中添加新元素。
+ delete(key):通过使用键值来从字典中移除键值对应的数据值。
+ has(key):如果某个键值存在于这个字典中，则返回true，反之则返回false。 
+ get(key):通过键值查找特定的数值并返回。
+ clear():将这个字典中的所有元素全部删除。
+ size():返回字典所包含元素的数量。与数组的length属性类似。
+ keys():将字典所包含的所有键名以数组形式返回。
+ values():将字典所包含的所有数值以数组形式返回。

## 散列表 HashMap
HashTable也叫HashMap类，他是Dictionary类的一种散列表实现方式。

## 散列算法
散列算法的作用是尽可能快的在数据结构中找到一个值。之前在数据结构中获取一个值的做法是遍历整个
数据结构来找它。如果用散列函数，就知道值的具体位置，因此能快速检索到该值。散列函数的作用是给
定一个键值，然后返回值在表中的地址。

[详细内容](/foundation/map/map-2-hash)

## ES6 Map
```typescript
interface Map<K, V> {
  clear(): void;
  delete(key: K): boolean;
  forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void, 
    thisArg?: any
  ): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
  readonly size: number;
}
```

## ES6 WeakMap
```typescript
interface WeakMap<K extends object, V> {
  delete(key: K): boolean;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
}
```