/**
 * 
 * 集合示例
 */

type TType = number|string|symbol

type SetDemoItemType = {
  [p in TType]: TType;
}
interface SetDemoInterface<T> {
  // 如果值在集合中返回true，否则返回false
  has: (value: T) => boolean;
  // 向集合中添加一个值
  add: (value: T) => boolean;
  // 从集合中移除一个值，不存在的话返回null
  delete: (value: T) => boolean;
  // 清空集合
  clear: () => void;
  // 返回集合中项的数量
  size: () => number;
  // 返回一个包含集合中所有值的数组
  values: () => Array<T>;

  // 合并两个集合 todo
  union?: (otherSet: SetDemoInterface<T>) => SetDemoInterface<T>;
  // 集合的交集 todo
  intersection?: (otherSet: SetDemoInterface<T>) => SetDemoInterface<T>;
  // 集合的差集 todo
  difference?: (otherSet: SetDemoInterface<T>) => SetDemoInterface<T>;
  // 集合的子集 todo
  subset?: (otherSet: SetDemoInterface<T>) => SetDemoInterface<T>;
}

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
  // 从集合中移除一个值，不存在的话返回null
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

type ObjType = {
  name: string
}
;(function () {
  const setDemo = new SetDemo()
  let obj1 = { name: 'hello' }
  // setDemo.add(1)
  ;[Symbol.for('1'), Symbol('2'), Symbol.for('3')].forEach((item) => {
    setDemo.add(item)
  });
  // setDemo.clear()
  // console.log(setDemo.values())
  // setDemo.print()
})();
;(function () {
  let set = new Set<symbol>();
  set.add(Symbol.for('1'));
  set.add(Symbol.for('2'));
  set.add(Symbol.for('3'));
  set.delete(Symbol.for('2'))
  // console.log(set)
})();
