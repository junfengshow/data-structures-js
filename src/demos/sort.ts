function swap (array: Array<number>, i: number, j: number) {
  [array[j], array[i]] = [array[i], array[j]]
}
/******************************************/ 
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

/******************************************/ 
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

/******************************************/ 
// 插入排序 小 --> 大
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

/******************************************/ 
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


/******************************************/ 
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
function partition (array: Array<number>, left: number, right: number): number {
  let pivot = array[Math.floor((right + left) / 2)], i = left, j = right
  while (i <= j) {
    while (array[i] < pivot) {
      i++
    }
    while (array[j] > pivot) {
      j--
    }
    if (i <= j) {
      swap(array, i, j)
      i++
      j--
    }
  }
  return i
}

/******************************************/ 
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

/******************************************/ 
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

/******************************************/ 
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
/******************************************/ 
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
    let pos = 0;
    for(let j = 0; j < counter.length; j++) {
      let value = null;
      if(counter[j]!=null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value;
        }
      }
    }
  }
  return arr;
}

;(function (array: Array<number>) {
  // const insertResult = insertSort(array)
  // const mergeResult = mergeSort(array)
  // const quickResult = quickSort(array)
  // heapSort(array)
  // console.log(countSort(array))
  // bucketSort(array)

  // console.log(radixSort(array, 4))
  // bubbleSort(array)
  // selectionSort(array)
  // console.log(array)
})([1, 10, 9, 8, 7, 2, 5, 3, 4, 6, 2]);
