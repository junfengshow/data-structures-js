import React, { useEffect, useState } from 'react';
import { Queue } from '../demos/queue';
import { Stack } from './components/Stack';

class Graph {
  vertices: any[] = [];
  adjList = new Map();
  constructor () {}
  addVertex (v: any) {
    this.vertices.push(v);
    this.adjList.set(v, []);
  }

  addEdge (v: any, w: any) {
    const vArray = this.adjList.get(v);
    if (vArray) {
      vArray.push(w);
    }
    const wArray = this.adjList.get(w);
    if (wArray){
      wArray.push(v);
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
      str += '<br />'
    }
    return str
  }

  initialColor () {
    const color: any = {};
    this.vertices.forEach((v) => {
      color[v] = 'white';
    });
    return color;
  }
  // 广度搜索
  bfs (vertice: any) {
    const color = this.initialColor();
    const queue = new Queue<any>();
    queue.enqueue(vertice);
    while (!queue.isEmpty()) {
      const v = queue.dequeue();
      const na = this.adjList.get(v);
      const naLength = na.length;
      color[v] = 'grey';
      for (let i = 0; i < naLength; i++) {
        if (color[na[i]] === 'white') {
          queue.enqueue(na[i]);
          color[na[i]] = 'grey';
        } 
      }
      color[v] = 'black';
    }
  }

  // 最短距离
  bfsDistance (vertice: any) {
    const color = this.initialColor();
    const queue = new Queue<any>();
    queue.enqueue(vertice);

    const distance: any = {};
    const distancePre: any = {};
    this.vertices.forEach((v) => {
      distance[v] = 0;
      distancePre[v] = null;
    });
    while (!queue.isEmpty()) {
      const v = queue.dequeue();
      const neighbors = this.adjList.get(v);
      color[v] = 'grey';
      neighbors && neighbors.forEach((n: any) => {
        if (color[n] === 'white') {
          color[n] = 'grey';
          distance[n] = distance[v] + 1;
          distancePre[n] = v;
          queue.enqueue(n);
        } 
      });
      color[v] = 'black';
    }
    return {
      distance, distancePre,
    }
  }
  showPath (fromVertex: any) {
    const shortestPathA = this.bfsDistance(this.vertices[0]);
    const map: any = {};
    for (var i = 1; i < this.vertices.length; i++) {
      const toVertext = this.vertices[i];
      const path = new Stack<any>();

      for (var v = toVertext; v !== fromVertex; v = shortestPathA.distancePre[v]) {
        path.push(v);
      }
      path.push(fromVertex);
      var s = path.pop(); 
      while (!path.isEmpty()){
        s += ' - ' + path.pop(); 
      }
      map[toVertext] = s;
      // console.log(s); //{19}
    }
    return map;
  }

  // 深度优先
  dfs () {
    const color = this.initialColor();
    const vertices = this.vertices;

    const dfsVisit = (v: any, color: any) => {
      const neighbors = this.adjList.get(v);
      color[v] = 'grey'
      neighbors.forEach((n: any) => {
        if (color[n] === 'white') {
          dfsVisit(n, color);
        }
      });
      color[v] = 'black';
    }

    vertices.forEach((v) => {
      if (color[v] === 'white') {
        dfsVisit(v, color)
      }
    });
  }
}



const GraphDemo = () => {
  const [str, setStr] = useState('');

  useEffect(() => {
    const graph = new Graph();

    ;['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach((item) => {
      graph.addVertex(item);
    })
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');
    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');
    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');
    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');
    graph.addEdge('E', 'I');

    setStr(graph.toString());
    // console.log(graph.toString());
    // graph.bfs(graph.vertices[0]);
    // console.log(graph.bfsDistance(graph.vertices[0]))
    // 最短路径
    console.log(graph.showPath(graph.vertices[0]));
    // 广度优先搜索
    // graph.dfs();
  }, [])

  return (
    <div>
      <h3>广度优先搜索</h3>
      <div>
        <img src="https://upload.junfengshow.com/docs/foundation/graph-7.png" alt="" />
      </div>
      <div dangerouslySetInnerHTML={{__html: str}}></div>
      <h3>深度优先搜索</h3>
    </div>
  )
}
export default GraphDemo;
