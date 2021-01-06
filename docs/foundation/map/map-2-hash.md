---
title: 散列表
footer: false
---

## 散列表 HashTable HashMap
HashTable也叫HashMap类，他是Dictionary类的一种散列表实现方式。

## 散列算法
散列算法的作用是尽可能快的在数据结构中找到一个值。之前在数据结构中获取一个值的做法是遍历整个
数据结构来找它。如果用散列函数，就知道值的具体位置，因此能快速检索到该值。散列函数的作用是给
定一个键值，然后返回值在表中的地址。

<div>
  <a href='https://upload.junfengshow.com/docs/foundation/hash_explain_01.png' target='_blank'>
    <img 
      src='https://upload.junfengshow.com/docs/foundation/hash_explain_01.png'
      width='500'
    />
  </a>
</div>

## 创建散列表
```typescript
interface HashTableInterface {}
```

## 散列表和散列集合

## 处理散列表中的冲突

## 创建更好的散列函数
