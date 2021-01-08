/**
 * 
 * 搜索
 */
import { quickSort } from './sort'
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

let i = 0
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

;(function (array: Array<number>) {
  // console.log(baseSearch(array, 2))
  console.log(binarySearch(array, 2))
})([1, 10, 9, 8, 7, 2, 5, 3, 4, 6, 2]);
