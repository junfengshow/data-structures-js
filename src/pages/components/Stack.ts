/**
 * 
 * 栈数据结构
 */

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


;(function (array: Array<number>) {
  const stack = new Stack<number>()
  array.forEach((item) => {
    stack.push(item)
  })
  // console.log(stack.peek())
  // console.log(stack.pop())
  stack.clear()
  // console.log(stack.isEmpty())
  // stack.print()
})([1, 2, 3, 4, 10]);

;(function () {
  
  function baseConvert (decNumber: number, base: number) {
    let remStack = new Stack<number>(), 
    rem, 
    binaryString = decNumber > 0 ? '' : '-'
    decNumber = Math.abs(decNumber)
    while (decNumber > 0) { 
      rem = Math.floor(decNumber % base)
      remStack.push(rem)
      decNumber = Math.floor(decNumber / base)
    } 
    while (!remStack.isEmpty()){ //{5} 
      binaryString += remStack.pop()?.toString(); 
    }
    return binaryString
  }
  console.log(baseConvert(-10, 2)) // -1010
})();
