---
title: 栈
order: 1
footer: null
---
## 栈简介
+ 栈是一种遵从后进先出（LIFO）原则的有序集合。新添加的或待删除的元素都保存在栈的
+ 同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

## 方法
```typescript
interface StackInterface <E> {
  // 向栈中添加一个或者多个元素
  push: (element: E|Array<E>) => number;
  // 移除栈顶的元素，同时返回被移除的元素
  pop: () => E|undefined;
  // 返回栈顶的元素，不对栈做任何修改
  peek: () => E|undefined;
  // 判断栈中是否为空
  isEmpty: () => boolean;
  // 移除栈里的所有元素
  clear: () => void;
  // 返回栈中元素的个数
  size: () => number;
}
``` 

## 方法实现
```typescript
class Stack<E> implements StackInterface<E> {
  items: Array<E> = [];
  push (elements: E|Array<E>) {
    Array.isArray(elements)
    ? this.items.push(...elements)
    : this.items.push(elements)
    return this.items.length
  };

  // 移除栈顶的元素，同时返回被移除的元素
  pop (): E|undefined {
    return this.items.pop()
  }
  // 返回栈顶的元素，不对栈做任何修改
  peek (): E|undefined {
    return this.items[this.size() - 1]
  }
  // 判断栈中是否为空
  isEmpty (): boolean {
    return !this.items.length
  }
  // 移除栈里的所有元素
  clear () {
    this.items.length = 0
  }
  // 返回栈中元素的个数
  size () : number {
    return this.items.length
  }

  print () {
    console.log(this.items)
  }
}
```

## 用栈解决问题

### 从十进制到二进制
```typescript
function baseConvert (decNumber: number, base: number) {
  let remStack = new Stack<number>(), 
  rem, 
  binaryString = decNumber > 0 ? '' : '-'
  decNumber = Math.abs(decNumber)
  while (decNumber > 0) { 
    rem = Math.floor(decNumber % 2)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / 2)
  } 
  while (!remStack.isEmpty()){ //{5} 
    binaryString += remStack.pop()?.toString(); 
  }
  return binaryString
}
console.log(baseConvert(-10, 2)) // -1010
```
