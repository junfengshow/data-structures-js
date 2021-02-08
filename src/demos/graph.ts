/**
 * 
 * 图
 */
import { Queue } from './queue'

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
}

function printNode<T> (value: T) {
  console.log(`Visited vertex: ${value}`)
}

;(function () {
  const graph = new Graph<string>()
  ;['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach((item) => {
    graph.addVertex(item)
  })
  graph.addEdge('A', 'B')
  graph.addEdge('A', 'C')
  graph.addEdge('A', 'D')
  graph.addEdge('C', 'D')
  graph.addEdge('C', 'G')
  graph.addEdge('D', 'G')
  graph.addEdge('D', 'H')
  graph.addEdge('B', 'E')
  graph.addEdge('B', 'F')
  graph.addEdge('E', 'I')

  // console.log(graph.toString())
  // graph.bfs('A', printNode)
  console.log(graph.BFS('A'))
})();
