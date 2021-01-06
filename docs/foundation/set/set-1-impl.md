---
title: 实现集合
group: 
  title: 集合
footer: false
---

集合
===

## 方法实现
```typescript
// typescript
type TType = number|string|symbol
type SetDemoItemType = {
  [p in TType]: TType;
}
// 实现SetDemoInterface接口
class SetDemo implements SetDemoInterface<TType> {
  items: SetDemoItemType = {}
  
  // 如果值在集合中返回true，否则返回false
  has(value: TType): boolean {
   
    if (typeof value === 'symbol') {
      return Object.getOwnPropertySymbols(this.items).some(item => item === value)
    }
    
    return this.items.hasOwnProperty(value)
  };
  // 向集合中添加一个值
  // value: TType 报错 symbol不能作为index
  add (value: any): boolean {
    if (!this.has(value)) {
      this.items[value] = value
      return true
    }
    return false
  };
  // 从集合中移除一个值
  delete (value: TType): boolean {
    return Reflect.deleteProperty(this.items, value)
  };
  // 清空集合
  clear (): void {
    this.items = {}
  };
  // 返回集合中项的数量
  size (): number {
    return Reflect.ownKeys(this.items).length
  };
  // 返回一个包含集合中所有值的数组
  values (): Array<TType> {
    return Reflect.ownKeys(this.items).map((attr: any) => {
      return this.items[attr]
    })
  };

  print () {
    console.log(this.items)
  }
}
```
### 合并两个集合

```jsx
/**
 * compact: true
 * background: '#f6f7f9'
 */ 
import React from 'react'
import { SetUnion } from './SetImgExplain'
export default () => <SetUnion />
```


## ES6 -- Set类
## ES6 -- WeakSet类
