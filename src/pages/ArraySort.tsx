import React, { useEffect, useState } from 'react'
import { Button } from '@fdt/cmp-react';

function start () {
  function swap (array: any, i: number, j: number) {
    [array[i], array[j]] = [array[j], array[i]]
  }
  const array = [1, 10, 6, 2, 4, 3, 100, 3, 5, 7, 9, 8, 2, 2];
  console.log('元数组', array);
  
  // 冒泡排序
  ;((array: number[]) => {
    function bubbleSort (array: number[]) {
      let length = array.length;
      for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
          if (array[i] > array[j]) {
            swap(array, i, j);
          }
        }
      }
    }
    // bubbleSort(array);
    // console.log('array', array);
  })(array);
  
  // 选择排序
  ;((array: number[]) => {
    function chooseSort (array: number[]) {
      for (let i = 0; i < length; i++) {
        let largest = i;
        for (let j = i + 1; j < length; j++) {
          if (array[largest] < array[j]) {
            largest = j;
          }
        }
        if (largest !== i) {
          swap(array, largest, i);
        }
      }
    }
    // chooseSort(array);
    // console.log('array', array);
  })(array);
  
  // 插入排序
  ;((array: number[]) => {
    function insertSort (array: number[]) {
      for (let i = 0; i < length; i++) {
        let temp = array[i];
        let j = i - 1;
  
        // 将temp插入之前的位置
        while (j > 0 && array[j] > temp) {
          // array[j] = temp;
          j--;
        }
        if (j > 0) {
          array[i] = array[j];
          array[j] = temp;
        }
      }
    }
    // insertSort(array);
    // console.log('insertSort array', array);
  })(array);
  
  // 堆排序
  ;((array) => {
    function buildHeap (array: number[]) {
      const length = array.length;
      const middle = Math.floor(length / 2);
      for (let i = middle; i >= 0; i--) {
        heapfy(array, length, i);
      }
    }
  
    function heapfy (array: number[], size: number, i: number) {
      let largest = i;
      const left = 2 * i;
      const right = 2 * i + 1;
      if (left < size && array[left] > array[largest]) {
        largest = left;
      }
      if (right < size && array[right] > array[largest]) {
        largest = right;
      }
      if (largest !== i) {
        swap(array, largest, i);
        heapfy(array, size, largest);
      }
    }
  
    const sortArray = (array: number[]) => {
      // 1.将数组生成一个顶最大的堆数组
      buildHeap(array);
      // 2.最大和最小的交换
      let length = array.length;
      while (length > 0) {
        length--;
        swap(array, 0, length);
        heapfy(array, length, 0);
      }
      return array;
    }
    // console.log('array', sortArray(array))
  })(array);
  
  // 归并排序
  ;((array: number[]) => {
    function merge (left: number[], right: number[]): number[] {
      let lIndex = 0, rIndex = 0, result = [];
      while (lIndex < left.length && rIndex < right.length) {
        if (left[lIndex] < right[rIndex]) {
          result.push(left[lIndex++]);
        } else {
          result.push(right[rIndex++])
        }
      }
      while (lIndex < left.length) {
        result.push(left[lIndex++]);
      }
      while (rIndex < right.length) {
        result.push(right[rIndex++]);
      }
      return result;
    }
  
    function mergeSort (array: number[]): number[] {
      if (array.length <= 1) {
        return array;
      }
      let middle = Math.floor(array.length / 2);
      let left = array.slice(0, middle);
      let right = array.slice(middle);
      return merge(mergeSort(left), mergeSort(right));
    }
    // mergeSort(array);
    // console.log('mergeSort array', array);
  })(array);
  let index = 0;
  ;((array: number[]) => {
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
        console.log(arr)
      }
      return arr;
    }
    console.log('radixSort', radixSort(array, 4))
  })(array);
  
  // 快速排序 1
  ;((array) => {
    function quickSort (array: number[]): number[] {
      const length = array.length;
      if (length <= 1) {
        return array;
      }
      const middleIndex = Math.floor(length / 2);
      const leftArr: number[] = [];
      const rightArr: number[] = [];
      const middleArr: number[] = [];
      for (let i = 0; i < length; i++) {
        if (array[i] < array[middleIndex]) {
          leftArr.push(array[i])
        } else if (array[i] > array[middleIndex]) {
          rightArr.push(array[i])
        } else {
          middleArr.push(array[i]);
        }
      }
      return quickSort(leftArr).concat(middleArr).concat(quickSort(rightArr));
    }
    // console.log('array', quickSort(array));
  })(array);
  
  // 快速排序 2
  ;((array: number[]) => {
    function partition (array: number[], left: number, right: number): number {
      const pivot = array[Math.floor((left + right) / 2)];
      let i = left;
      let j = right;
      while (i <= j) {
        while (array[i] < pivot) {
          i++;
        }
        while (array[j] > pivot) {
          j--;
        }
        if (i <= j) {
          swap(array, i, j);
          i++;
          j--;
        }
      }
      return i;
    }
    function quickSort (array: number[], left: number, right: number) {
      if(array.length <= 1) {
        return array;
      }
      const index = partition(array, left, right);
      if (left < index - 1) {
        quickSort(array, left, index - 1);
      }
      if (right > index) {
        quickSort(array, index, right);
      }
    }
    quickSort(array, 0, array.length - 1);
    // console.log('array', array)
  })(array);
  
  // 散列函数 HashTable
  ;(() => {
  
  })();
}

class Children extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
    this.state = {
      age: 1,
    }
  }
  setAge = (age: number) => {
    this.setState({ age });
  }
  render () {
    const { age } = this.state;
    // const [age, setAge] = useState(1);
    // console.log('this is children')
    return (
      <div onClick={() => {
        this.setAge(age + 1);
      }}>
        this is children {age}
      </div>
    )
  }
}

export default class extends React.Component {
  componentDidMount () {
    start();
  }
  render () {
    // console.log('this is parent')
    return (
      <div>
        <a className='cmpBtn'>sort</a>
        <Button onClick={() => {
          console.log('this is a button')
        }}>this is a button</Button>
        <Children />
      </div>
    )
  }
}
