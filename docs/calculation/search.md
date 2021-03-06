---
title: 搜索
order: 5
footer: false
---
搜索
===

## 顺序搜索
直勾勾的循环比较

```typescript
// typescript
// 顺序搜索
export const baseSearch = (
  array: Array<number>, 
  target: number
): number => {
  let arrayLength = array.length
  for (let i = 0; i < arrayLength; i++) {
    if (array[i] === target) {
      return i
    }
  } 
  return -1
}
```

## 二分搜索
这个算法要求被搜索的数据结构**已排序**。以下是该算法遵循的步骤。
+ 1.选择数组的中间值。
+ 2.如果选中值是待搜索值，那么算法执行完毕(值找到了)。
+ 3.如果待搜索值比选中值要小，则返回步骤1并在选中值左边的子数组中寻找。 
+ 4.如果待搜索值比选中值要大，则返回步骤1并在选种值右边的子数组中寻找。

**得到的下标是排序之后的数组的下标**
```typescript
// typescript
// 二分法搜索
export const binarySearch = (
  array: Array<number>, 
  target: number
) => {
  // 先进性排序
  quickSort(array)
  let length = array.length
  let left = 0, right = length - 1,  mid
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (target < array[mid]) {
      right = mid - 1
    } else if (target > array[mid]) {
      left = mid + 1
    } else {
      // 相等的情况
      return mid
    }
  }
  return -1
}
```


