---
title: 算法复杂度
order: 2
footer: false
---
算法复杂度
===

[myHost]: http://dsjs.docs.junfengshow.com

## 大*O*表示法

|符号|名称|
|:----|:----|
|*O*(1)|常数的|
|*O*(log(n))|对数的|
|*O*((log(n))c)|对数多项式|
|*O*(n)|线性的|
|*O*(n<sup>2</sup>)|二次的|
|*O*(n<sup>c</sup>)|多项式的|
|*O*(c<sup>n</sup>)|指数的|

### 理解大*O*表示法
> 如何衡量算法大效率？通常用资源、例如CPU(时间)占用、内存占用、硬盘占用和
> 网络占用。当讨论大*O*表示法时，一般考虑的时CPU时间占用。

### *O*(1)
```typescript
// typescript
function add(num: number): number { 
  return ++num; 
}
```
假设运行add(1)函数，执行的时间等于x。如果再用不同的参数运行一次add函数，执行时间
仍然是x和参数无关，add函数的性能都一样。因此我们说add函数的复杂度是*O*(1)(常数)。

### *O*(n)
```javascript
// js
function sequentialSearch(array, item){ 
  for (let i = 0; i < array.length; i++){ 
    if (item === array[i]) { 
      return i; 
    } 
  } 
  return -1; 
}
```
sequentialSearch函数执行的总开销取决于数组元素的个数，而且也和搜索的值有关。
最坏情况下，如果数组的大小是10，开销就是10，如果数组的大小是1000开销就是1000.
可以得出sequentialSearch函数的时间复杂度是*O*(n)。

### *O*(n<sup>2</sup>)
```javascript
// javascript
function swap (array, index1, index2) { 
 var aux = array[index1]; 
 array[index1] = array[index2]; 
 array[index2] = aux; 
} 
function bubbleSort (array) { 
  let length = array.length; 
  for (let i = 0; i < length; i++){ //{1} 
    for (let j=0; j < length - 1; j++ ){ //{2} 
      if (array[j] > array[j + 1]){ 
        swap(array, j, j + 1); 
      } 
    } 
  } 
}
```
如果用大小为10的数组执行bubbleSort，开销是 100（102）。如果用大小为100的数组执行
bubbleSort，开销就是 10 000（1002）。<br />
我们每次增加输入的大小，执行都会越来越久。<br />
**时间复杂度O(n)的代码只有一层循环，而O(n2)的代码有双层嵌套循环。如
果算法有三层遍历数组的嵌套循环，它的时间复杂度很可能就是O(n3)。**


### 时间复杂度比较
#### 1.数据结构
<table align='center'>
  <thead>
    <tr>
      <th rowspan='2' align='left'>数据结构</th>
      <th colspan='3'>一般情况</th>
      <th colspan='3'>最差情况</th>
    </tr>
    <tr>
      <th>插入</th>
      <th>删除</th>
      <th>搜索</th>
      <th>插入</th>
      <th>删除</th>
      <th>搜索</th>
    </tr>
  </thead>
  <tbody align='center'>
    <tr>
      <td align='left'>数组/栈/队列</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(n)</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(n)</td>
    </tr>
    <tr>
      <td align='left'>链表</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(n)</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(n)</td>
    </tr>
    <tr>
      <td align='left'>双向链表</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(n)</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(n)</td>
    </tr>
    <tr>
      <td align='left'>散列表</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(1)</td>
      <td><i>O</i>(n)</td>
      <td><i>O</i>(n)</td>
      <td><i>O</i>(n)</td>
    </tr>
    <tr>
      <td align='left'>二分搜索树</td>
      <td><i>O</i>(log(n))</td>
      <td><i>O</i>(log(n))</td>
      <td><i>O</i>(log(n))</td>
      <td><i>O</i>(n)</td>
      <td><i>O</i>(n)</td>
      <td><i>O</i>(n)</td>
    </tr>
    <tr>
      <td align='left'>AVL树</td>
      <td><i>O</i>(log(n))</td>
      <td><i>O</i>(log(n))</td>
      <td><i>O</i>(log(n))</td>
      <td><i>O</i>(log(n))</td>
      <td><i>O</i>(log(n))</td>
      <td><i>O</i>(log(n))</td>
    </tr>
  </tbody>
</table>

#### 2.图的时间复杂度比较
|节点/边的管理方式|存储空间|增加顶点|增加边|删除顶点|删除边|轮询|
|:----|:----:|:----:|:----:|:----:|:----:|:----:|
|邻接表| *O*(\|V\|+\|E\|)|*O*(1)|<i>O</i>(1)| <i>O</i>(\|V\|+\|E\|) |<i>O</i>(\|E\|)|<i>O</i>(\|V\|)|
|邻接矩阵| <i>O</i>(\|V\|<sup>2</sup>) | <i>O</i>(\|V\|<sup>2</sup>) |<i>O</i>(1)|   <i>O</i>(\|V\|<sup>2</sup>) |<i>O</i>(1)|<i>O</i>(1)|


#### 3.排序算法
<table>
  <thead>
    <tr>
      <th rowspan='2' align='left'>算法(用于数组)</th>
      <th colspan='3'>时间复杂度</th>
    </tr>
    <tr>
      <th>最好情况</th>
      <th>一般情况</th>
      <th>最差情况</th>
    </tr>
  </thead>
  <tbody align='center'>
    <tr>
      <td align='left'>冒泡排序</td>
      <td><i>O</i>(n)</td>
      <td><i>O</i>(n<sup>2</sup>)</td>
      <td><i>O</i>(n<sup>2</sup>)</td>
    </tr>
    <tr>
      <td align='left'>选择排序</td>
      <td><i>O</i>(n<sup>2</sup>)</td>
      <td><i>O</i>(n<sup>2</sup>)</td>
      <td><i>O</i>(n<sup>2</sup>)</td>
    </tr>
    <tr>
      <td align='left'>插入排序</td>
      <td><i>O</i>(n)</td>
      <td><i>O</i>(n<sup>2</sup>)</td>
      <td><i>O</i>(n<sup>2</sup>)</td>
    </tr>
    <tr>
      <td align='left'>归并排序</td>
      <td><i>O</i>(nlog(n))</td>
      <td><i>O</i>(nlog(n))</td>
      <td><i>O</i>(nlog(n))</td>
    </tr>
    <tr>
      <td align='left'>快速排序</td>
      <td><i>O</i>(nlog(n))</td>
      <td><i>O</i>(nlog(n))</td>
      <td><i>O</i>(n<sup>2</sup>)</td>
    </tr>
    <tr>
      <td align='left'>堆排序</td>
      <td><i>O</i>(nlog(n))</td>
      <td><i>O</i>(nlog(n))</td>
      <td><i>O</i>(nlog(n))</td>
    </tr>
    <tr>
      <td align='left'>桶排序</td>
      <td><i>O</i>(n + k)</td>
      <td><i>O</i>(n + k)</td>
      <td><i>O</i>(n<sup>2</sup>)</td>
    </tr>
    <tr>
      <td align='left'>基数排序</td>
      <td><i>O</i>(nk)</td>
      <td><i>O</i>(nk)</td>
      <td><i>O</i>(nk)</td>
    </tr>
  </tbody>
</table>

### NP完全理论概述
一般来说，如果一个算法的复杂度为O(nk)，其中k是常数，我们就认为这个算法是高效的，
这就是多项式算法。<br />
对于给定的问题，如果存在多项式算法，则计为P（polynomial，多项式）。<br />

还有一类NP（nondeterministic polynomial，非确定性多项式）算法。如果一个问题可以在多
项式时间内验证解是否正确，则计为NP。<br />

如果一个问题存在多项式算法，自然可以在多项式时间内验证其解。因此，所有的P都是NP。
然而，P = NP是否成立，仍然不得而知。<br />

NP问题中最难的是NP完全问题，它满足以下两个条件：<br />
+ (1) 是NP问题，也就是说，可以在多项式时间内验证解，但还没有找到多项式算法；
+ (2) 所有的NP问题都能在多项式时间内归约为它。
  
为了理解问题的归约，考虑两个决策问题L和M。假设算法A可以解决问题L，算法B可以验
证输入y是否为M的解。目标是找到一个把L转化为M的方法，使得算法B可以用于构造算法A。<br />
还有一类问题，只需满足NP完全问题的第二个条件，称为NP困难问题。因此，NP完全问题
也是NP困难问题的子集。<br />

> P = NP是否成立，是计算机科学中最重要的难题之一。如果能找到答案，
> 对密码学、算法研究、人工智能等诸多领域都会产生重大影响。

下面是满足P < > NP时，P、NP、NP完全和NP困难问题的欧拉图：
>
![images][complex_np_hard]

[complex_np_hard]: http://dsjs.docs.junfengshow.com/docs/calculation/complex_np_hard.png 'url'
>

非NP完全的NP困难问题的例子有停机问题和布尔可满足性问题（SAT）。
NP完全问题的例子有子集和问题、旅行商问题、顶点覆盖问题，等等。
