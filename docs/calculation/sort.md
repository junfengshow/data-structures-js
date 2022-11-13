---
title: 排序
order: 4
footer: false
---
排序
===

```typescript
// typescript
// 交换函数
function swap (array: Array<number>, i: number, j: number) {
  [array[j], array[i]] = [array[i], array[j]]
}
```

## 冒泡排序
原理：将当前位置的元素与之后的每个元素比较，将符合条件的元素交换到当前位置，
当前位置比较完成之后，指针向后移动进行下一个位置的比较。

```typescript
// typescript
// 冒泡排序 小 --> 大
export function bubbleSort (array: Array<number>): void {
  let arrayLength = array.length
  for (let i = 0; i < arrayLength; i++) {
    for (let j = i + 1; j < arrayLength; j++) {
      if (array[i] > array[j]) {
        swap(array, i, j)
      }
    }
  }
}
```

## 选择排序
原理：找到最小的放在第一位，找到第二小的放在第二位依次类推。或者可以理解为每个位置都是
数组当前范围内最小的值。

```typescript
// typescript
// 选择排序 小 --> 大
export function selectionSort (array: Array<number>): void {
  let arrayLength = array.length, minIndex
  for (let i = 0; i < arrayLength; i++) {
    minIndex = i
    for (let j = i + 1; j < arrayLength; j++) {
      if (array[minIndex] > array[j]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      swap(array, i, minIndex)
    }
  }
}
```

## 插入排序
原理：当前项之前的所有项已经按要求排好顺序。只要对当前项按要求插入之前的数组项即可。

```typescript
// typescript
export function insertSort(array: Array<number>): Array<number> {
  let arrayLength: number = array.length, j: number, temp: number
  for (let i = 0; i < arrayLength; i++) {
    j = i
    temp = array[i]
    // 前i个已经排序好，挨个判断比当前的大的向前推
    while (j > 0 && array[j - 1] > temp) {
      array[j] = array[j - 1]
      j--
    }
    // 找到了合适的位置放入即可
    array[j] = temp
  }
  return array
}
```
过程如下图所示
>
<a href='https://upload.junfengshow.com/docs/calculation/sort_insert.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/calculation/sort_insert.png'
    width='460'
  />
</a>

---

## 归并排序
原理：将原始数组切分成较小的数组，知道每个小数组只有一个位置，接着将小数组归并成大数组，
直到最后只有一个排序好的大数组。
```typescript
// typescript
// 归并排序 小 --> 大
export function mergeSort (array: Array<number>): Array<number> {
  let arrayLength: number = array.length
  if (arrayLength === 1) {
    return array
  } 
  let mid = Math.floor(arrayLength / 2),
    left = array.slice(0, mid),
    right = array.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}
// 合并函数
function merge (left: Array<number>, right: Array<number>): Array<number> {
  let result: Array<number> = [], il = 0, ir = 0
  while (il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il++])
    } else {
      result.push(right[ir++])
    }
  }
  while (il < left.length) {
    result.push(left[il++])
  }
  while (ir < right.length) {
    result.push(right[ir++])
  }
  return result
}
```
过程如下图所示
>
<a href='https://upload.junfengshow.com/docs/calculation/sort_merge.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/calculation/sort_merge.png'
    width='300'
  />
</a>

---

## 快速排序
原理：设置主元(一般下标中间项)然后进行比较，小的放左边，大的放右边，依次递归。
+ 1.首先，从数组中选择中间一项作为主元。 
+ 2.创建两个指针，左边一个指向数组第一个项，右边一个指向数组最后一个项。移动左指 针直到我们找到一个比主元大的元素，接着，移动右指针直到找到一个比主元小的元素，然后交 换它们，重复这个过程，直到左指针超过了右指针。这个过程将使得比主元小的值都排在主元之 前，而比主元大的值都排在主元之后。这一步叫作划分操作。
+ 3.接着，算法对划分后的小数组(较主元小的值组成的子数组，以及较主元大的值组成的 子数组)重复之前的两个步骤，直至数组已完全排序。

```typescript
// typescript
// 快速排序 小 --> 大
export function quickSort (array: Array<number>) {
  quick(array, 0, array.length - 1)
}
function quick (array: Array<number>, left: number, right: number) {
  let index
  if (array.length > 1) {
    index = partition(array, left, right)
    if (left < index - 1) {
      quick(array, left, index - 1)
    }
    if (index < right) {
      quick(array, index, right)
    }
  }
}
// 
function partition (array: Array<number>, left: number, right: number): number {
  let pivot = array[Math.floor((right + left) / 2)], i = left, j = right
  while (i <= j) {
    // 找到左边比主元大的下标
    while (array[i] < pivot) {
      i++
    }
    // 找到右边比主元小的下标
    while (array[j] > pivot) {
      j--
    }
    // 大的放右边，小的放左边
    if (i <= j) {
      swap(array, i, j)
      i++
      j--
    }
  }
  return i
}

```
示例：
> 
<a href='https://upload.junfengshow.com/docs/calculation/sort_quick_01.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/calculation/sort_quick_01.png'
    width='400'
  />
</a>

> 
<a href='https://upload.junfengshow.com/docs/calculation/sort_quick_02.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/calculation/sort_quick_02.png'
    width='400'
  />
</a>

> 
<a href='https://upload.junfengshow.com/docs/calculation/sort_quick_03.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/calculation/sort_quick_03.png'
    width='400'
  />
</a>

> 
<a href='https://upload.junfengshow.com/docs/calculation/sort_quick_04.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/calculation/sort_quick_04.png'
    width='400'
  />
</a>

> 
<a href='https://upload.junfengshow.com/docs/calculation/sort_quick_05.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/calculation/sort_quick_05.png'
    width='400'
  />
</a>

## 堆排序
堆排序是一种很高效的算法，因其把数组当作二叉树来排序而得名。这个算法会根据以下
信息，把数组当作二叉树来管理。
+ 索引0是树的根节点;
+ 除根节点外，任意节点N的父节点是N/2;
+ 节点L的左子节点是2*L;
+ 节点R的右子节点是2*R+1。

数组[3, 5, 1, 6, 4, 7, 2]可以想象成如下所示的树
>
<a href='https://upload.junfengshow.com/docs/calculation/sort_heap_01.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/calculation/sort_heap_01.png'
    width='200'
  />
</a>

算法简介：
+ 第一步，构造一个满足array[parent(i)] >= array[i]的堆结构 buildHeap
+ 第二步，交换堆里的第一个元素和最后一个元素，通过函数heapify再次将数组转换为堆。
就是找到当前堆堆根节点(较小的值)，重新放到树的底部。

>
<a href='https://upload.junfengshow.com/docs/calculation/sort_heap_02.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/calculation/sort_heap_02.png'
    width='400'
  />
</a>

堆算法
> 
<a href='https://upload.junfengshow.com/docs/calculation/sort_heap.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/calculation/sort_heap.png'
    width='500'
  />
</a>

```typescript
// typescript
// 堆排序 小 --> 大
export function heapSort (array: Array<number>) {
  let heapSize = array.length
  buildHeap(array)
  
  while (heapSize > 1) {
    heapSize--
    swap(array, 0, heapSize)
    heapify(array, heapSize, 0)
  }
}
function buildHeap (array: Array<number>) {
  let heapSize = array.length
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    heapify(array, heapSize, i)
  }
}
function heapify (array: Array<number>, heapSize: number, i: number) {
  let left = i * 2 + 1, right = i * 2 + 2, largest = i
  if (left < heapSize && array[left] > array[largest]) {
    largest = left
  }
  if (right < heapSize && array[right] > array[largest]) {
    largest = right
  }
  if (largest !== i) {
    swap(array, i, largest)
    heapify(array, heapSize, largest)
  }
}
```

## 计数排序
通过数组下标来排序。优点是快时间复杂度小。缺点是因为通过下标进行排序所以值不能太大而且是整数。
下标不能太大可以通过计算最大值与最小值的差值进行优化。但是仍然存在最大最小值差值过大的缺点。

```typescript
// typescript
// 计数排序 小 --> 大
export function countSort (array: Array<number>) {
  let arrayLength = array.length
  let countArray: Array<number> = []
  for (let i = 0; i < arrayLength; i++) {
    let item = array[i]
    if (countArray[item]) {
      countArray[item]++
    } else {
      countArray[item] = 1
    }
  }
  let result = []
  for (let j = 0;  j < countArray.length; j++) {
    let item = countArray[j]
    if (item) {
      for (let count = 0; count < item; count++) {
        result.push(j)
      }
    }
  }
  return result
}
```

## 桶排序

```typescript
// typescript
// 桶排序 小 --> 大
export function bucketSort (array: Array<number>) {
  let length = array.length
  let max = Math.max(...array)
  let min = Math.min(...array)
  // 计算桶的数量
  let bucketNum = Math.ceil((max - min) / length)
  let map = new Map()
  for (let i = 0; i < bucketNum; i++) {
    map.set(i, [])
  }
  for (let j = 0; j < length; j++) {
    // 计算index
    let bucketIndex = Math.floor((array[j] - min) / length)
    map.get(bucketIndex).push(array[j])
  }
  // 对每个桶进行排序
  for (let i = 0; i < bucketNum; i++) {
    quickSort(map.get(i))
  }
  let index = 0;
	for(let i = 0; i < bucketNum; i++){
		for(let j = 0; j < map.get(i).length; j++){
			array[index++] = map.get(i)[j];
		}
	}  
}
```

复杂度分析  
1. 时间复杂度：O(N + C)
对于待排序序列大小为 N，共分为 M 个桶，主要步骤有：

N 次循环，将每个元素装入对应的桶中
M 次循环，对每个桶中的数据进行排序（平均每个桶有 N/M 个元素）
一般使用较为快速的排序算法，时间复杂度为 O ( N l o g N ) O(NlogN)O(NlogN)，实际的桶排序过程是以链表形式插入的。

整个桶排序的时间复杂度为：

O ( N ) + O ( M ∗ ( N / M ∗ l o g ( N / M ) ) ) = O ( N ∗ ( l o g ( N / M ) + 1 ) ) O(N)+O(M*(N/M*log(N/M)))=O(N*(log(N/M)+1))O(N)+O(M∗(N/M∗log(N/M)))=O(N∗(log(N/M)+1))

当 N = M 时，复杂度为 O ( N ) O(N)O(N)

2.额外空间复杂度：O(N + M)

稳定性分析
桶排序的稳定性取决于桶内排序使用的算法。

## 基数排序
基数排序是一种非比较型整数排序算法，其原理是将整数按位数(个位、十位)切割成不同的数字，然后按每个位数分别比较。  
由于整数也可以表达字符串（比如名字或日期）和特定格式的浮点数，所以基数排序也不是只能使用于整数。


```typescript
// typescript
// 基数排序 小 --> 大
function radixSort(arr: Array<number>, maxDigit: number) {
 let mod: number = 10;
 let dev: number = 1;
 let counter: Array<Array<number>> = [];
 for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
   for(let j = 0; j < arr.length; j++) {
     let bucket = Math.floor((arr[j] % mod) / dev);
     if(!counter[bucket]) {
       counter[bucket] = [];
     }
     counter[bucket].push(arr[j]);
   }
   let pos: number = 0;
   for(let j = 0; j < counter.length; j++) {
     let value;
     if(counter[j]) {
       while (value = counter[j].shift()) {
         arr[pos++] = value;
       }
     }
   }   
 }
 return arr;
}
```
