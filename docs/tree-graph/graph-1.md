---
title: 图(创建、搜索)
group:
  path: /graph
footer: false
---
图
===

## 创建Graph类
```typescript
// typescript
interface GraphInterface<T> {
  // 顶点
  vertices: Array<T>;
  // 边
  adjList: Map<T, Array<T>>;
  // 向图中添加顶点
  addVertex (v: T): void;
  // 向图中添加边
  addEdge (v: T, w: T): void;
  // 打印图
  toString (): string;
}
```
实现方法
```typescript
// typescript
export class Graph<T> implements GraphInterface<T> {
  vertices: Array<T> = [];
  adjList: Map<T, Array<T>> = new Map();

  // 向图中添加顶点
  addVertex (v: T) {
    this.vertices.push(v)
    this.adjList.set(v, [])
  }
  // 添加边
  addEdge (v: T, w: T) {
    let vArray = this.adjList.get(v)
    let wArray = this.adjList.get(w)
    if (vArray) {
      vArray.push(w)
    }
    if (wArray) {
      wArray.push(v)
    }
  }
  toString (): string {
    let str = ''
    for (let i = 0; i < this.vertices.length; i++) {
      str += this.vertices[i] + ' --> '
      let neighbors = this.adjList.get(this.vertices[i])
      if (neighbors) {
        for (let j = 0; j < neighbors.length; j++) {
          str += neighbors[j] + ' '
        }
      }
      str += '\n'
    }
    return str
  }

  // ...
}
```

## 图的遍历
和树数据结构类似，我们可以访问图的所有节点。有两种算法可以对图进行遍历:广度优先 搜索
(Breadth-First Search，BFS)和深度优先搜索(Depth-First Search，DFS)。
图遍历可以用来 寻找特定的顶点或寻找两个顶点之间的路径，检查图是否连通，检查图是否含有环等。

在实现算法之前，让我们来更好地理解一下图遍历的思想方法。

图遍历算法的思想是必须追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索。
对于两种图遍历算法，都需要明确指出第一个被访问的顶点。

完全探索一个顶点要求我们查看该顶点的每一条边。对于每一条边所连接的没有被访问过的顶点，
将其标注为被发现的，并将其加进待访问顶点列表中。

为了保证算法的效率，务必访问每个顶点至多两次。连通图中每条边和顶点都会被访问到。

广度优先搜索算法和深度优先搜索算法基本上是相同的，只有一点不同，那就是待访问顶点 列表的数据结构。

|算法|数据结构|描述|
|:----|:----:|:----|
|深度优先算法|栈|通过将顶点存入栈中，顶点是沿着路径被探索的，存在新的相 邻顶点就去访问|
|广度优先搜索|队列|通过将顶点存入队列中(在第4章中学习过)，最先入队列的顶点先被探索|

当要标注已经访问过的顶点时，我们用三种颜色来反映它们的状态。
+ 白色:表示该顶点还没有被访问。
+ 灰色:表示该顶点被访问过，但并未被探索过。 
+ 黑色:表示该顶点被访问过且被完全探索过。

### 广度优先搜索
广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的相邻点，就像一次访
问图的一层。换句话说，就是先宽后深地访问顶点，如下图所示:
>
<a href='https://upload.junfengshow.com/docs/foundation/graph-7.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/foundation/graph-7.png'
    width='300'
  />
</a>

广度优先搜索算法所遵循的步骤
+ 1.创建一个队列Q。
+ 2.将v标注为被发现的(灰色)，并将v入队列Q.
+ 3.如果Q非空，则运行以下步骤:
  + 3-1.将u从Q中出队列;
  + 3-2.将标注u为被发现的(灰色);
  + 3-3.将u所有未被访问过的邻点(白色)入队列;
  + 3-4.将u标注为已被探索的(黑色)。

```typescript
// typescript
export class Graph<T> implements GraphInterface<T> {
  // ...
  initializeColor () {
    let colorMap: Map<T, string> = new Map()
    let vertices = this.vertices
    for (let i = 0; i < vertices.length; i++) {
      colorMap.set(vertices[i], 'white')
    }
    return colorMap
  }
  // 广度优先搜索
  bfs (v: T, callback?: (u: T) => void) {
    let color = this.initializeColor(),
      queue = new Queue<T>();
    queue.enqueue(v);
    while (!queue.isEmpty()) {
      let u = queue.dequeue()
      if (!u) {
        continue
      }
      let neighbors = this.adjList.get(u)
      color.set(u, 'grey')
      neighbors && neighbors.forEach((w) => {
        if (color.get(w) === 'white') {
          color.set(w, 'grey')
          queue.enqueue(w)
        }
      })
      color.set(u, 'black')
      callback && callback(u)
    }
  }
  // ...
}
```

### 使用BFS寻找最短路径
给定一个图G和源顶点v，找出对每个顶点u，u和v之间最短路径的距离(以边的数量计)。

对于给定顶点v，广度优先算法会访问所有与其距离为1的顶点，接着是距离为2的顶点， 以此类推。所以，可以用广度优先算法来解这个问题。我们可以修改bfs方法以返回给我们一 些信息:
+ 从v到u的距离d[u];
+ 前溯点pred[u]，用来推导出从v到其他每个顶点u的最短路径。

```typescript
// typescript
export class Graph<T> implements GraphInterface<T> {
  // ...
   BFS (v: T) {
    let color = this.initializeColor(),
    queue = new Queue<T>(),
    d: any = [],  
    pred: any = []; 
    queue.enqueue(v);
    let vertices = this.vertices
    for (let i = 0; i < vertices.length; i++){ 
      d[vertices[i]] = 0;
      pred[vertices[i]] = null;
    }
    while (!queue.isEmpty()) {
      let u = queue.dequeue();
      if (!u) {
        continue
      }
      let neighbors = this.adjList.get(u); 
      color.set(u, 'grey');
      if (!neighbors || !neighbors.length) {
        continue
      }
      for (let i = 0; i < neighbors.length; i++){ 
        let w = neighbors[i];
        if (color.get(w) === 'white'){
          color.set(w, 'grey')
          d[w] = d[u] + 1; 
          pred[w] = u; queue.enqueue(w);
        } 
      }
      color.set(u, 'black');
    }
    return { 
      distances: d,
      predecessors: pred
    }
  }
  // ...
}
```
遍历顶点
```javascript
var fromVertex = myVertices[0];
for (var i = 1; i < myVertices.length; i++){ 
  var toVertex = myVertices[i], 
    path = new Stack(); 
  for (var v = toVertex; v!== fromVertex; v = shortestPathA.predecessors[v]) { 
    path.push(v);
  }
  path.push(fromVertex); 
  var s = path.pop(); 
  while (!path.isEmpty()){
    s += ' - ' + path.pop(); 
  }
  console.log(s); 
}
/**
  A-B
  A-C
  A-D
  A-B-E
  A-B-F 
  A-C-G
  A-D-H 
  A-B-E-I
 */
```
详见最短路径算法部分
### 深度优先搜索
深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶 点被访问了，接着原路回退并探索下一条路径。换句话说，它是先深度后广度地访问顶点，如下 图所示:
>
<a href='https://upload.junfengshow.com/docs/foundation/graph-8.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/foundation/graph-8.png'
    width='300'
  />
</a>

深度优先搜索算法不需要一个源顶点。在深度优先搜索算法中，若图中顶点v未访问，则访 问该顶点v。

要访问顶点v，照如下步骤做。   
+ 1.标注v为被发现的(灰色)。
+ 2.对于v的所有未访问的邻点w，访问顶点w，标注v为已被探索的(黑色)。  
如你所见，深度优先搜索的步骤是递归的，这意味着深度优先搜索算法使用栈来存储函数调
用(由递归调用所创建的栈)。

> todo

## 最短路径算法
+ bfs的应用
+ Dijkstra算法
+ Bellman-Ford算法
+ A*搜索算法
+ ...

[**详见最短路径算法**](/tree-graph/graph/graph-2)
## 最小生成树
> todo
