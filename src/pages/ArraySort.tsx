import React, { useEffect } from 'react'
function swap (array: any, i: number, j: number) {
  [array[i], array[j]] = [array[j], array[i]]
}
export default () => {
  useEffect(() => {

    const array = [1, 10, 6, 2, 4, 3, 5, 7, 9, 8, 2, 2]
    // 堆排序
    function heapSort (array: Array<number>) {
      buildHeap(array)
      let heapSize = array.length 
      while (heapSize > 1) {
        heapSize--
        swap(array, heapSize, 0)
        heapfy(array, heapSize, 0)
      }
      return array
    }

    function buildHeap (array: Array<number>) {
      let heapSize = array.length
      for (let i = Math.floor(heapSize / 2); i >= 0; i--) {
        heapfy(array, heapSize, i)
      }
    }

    function heapfy (array: Array<number>, heapSize: number, i: number) {
      let largest = i, left = i * 2 + 1, right = i * 2 + 2
      if (left < heapSize && array[left] > array[largest]) {
        largest = left
      }
      if (right < heapSize && array[right] > array[largest]) {
        largest = right
      }
      if (largest !== i) {
        swap(array, largest, i)
        heapfy(array, heapSize, largest)
      }
    }

    console.log(heapSort(array))
  }, [])
  return (
    <div>sort</div>
  )
}
