import React, { useEffect, useState } from 'react';
import { Queue } from '../demos/queue';
import { Stack } from './components/Stack';

class Graph {
  verticals: any = [];
  adjust: any = new Map<string, string[]>();
  addVerticals (v: string) {
    this.verticals.push(v);
    this.adjust.set(v, []);
  }
  addEdge (v: string, w: string) {
    const listv = this.adjust.get(v);
    listv.push(w);
    const listw = this.adjust.get(w);
    listw.push(v);
  }
  toString () {
    const verticals = this.verticals;
    let str = '';
    for (const v of verticals) {
      str += `${v} ---> `;
      const neighbors = this.adjust.get(v);
      neighbors.forEach((n: string) => {
        str += `${n} `;
      });
      str += '\n'
    }
    console.log(str)
    return str;
  }
  initialColors () {
    const colors: any = {};
    this.verticals.forEach((v: string) => {
      colors[v] = 'white';
    });
    return colors;
  }
  // bfs
  bfs () {
    const verticals = this.verticals;
    const colors: any = this.initialColors();
    const queue = new Queue<string>();
    queue.enqueue(verticals[0]);
    while (!queue.isEmpty()) {
      const v = queue.dequeue();
      const neighbors = this.adjust.get(v);
      colors[v as string] = 'gray';
      for (let i = 0; i < neighbors.length; i++) {
        if (colors[neighbors[i]] === 'white') {
          queue.enqueue(neighbors[i]);
          colors[neighbors[i] as string] = 'gray';
        }
      }
      colors[v as string] = 'black';
      // callback(v)
    }
  }
  bfsDistance (vertices: string[]) {
    const colors = this.initialColors();
    const queue = new Queue();
    queue.enqueue(vertices[0]);
    const distance: any = {};
    while (!queue.isEmpty()) {
      const vertice = queue.dequeue();
      const neighbors = this.adjust.get(vertice);
      colors[vertice as string] = 'gray';
      for (const n of neighbors) {
        if (colors[n] === 'white') {
          distance[n] = {
            distance: (
              distance[vertice as string] && distance[vertice as string].distance || 0) + 1,
            pre: vertice,
          };
          queue.enqueue(n);
          colors[n as string] = 'gray';
        }
      }
      
      colors[vertice as string] = 'black';
    }
    return {
      distance
    }
  }
  showPath (fromVertice: string) {
    const { distance } = this.bfsDistance(this.verticals);
    for (const toVertice of this.verticals) {
      if (toVertice === fromVertice) {
        continue;
      }
      const path = new Stack();
      for (let v = toVertice; v !== fromVertice; v = distance[v].pre) {
        path.push(v);
      }

      path.push(fromVertice);
      let s = path.pop();
      while (!path.isEmpty()) {
        s += ` - ${path.pop()}`;
      }
      console.log(s);
    }
  }
}

const GraphDemo = () => {
  const [str, setStr] = useState('');

  useEffect(() => {
    const graph = new Graph();
    ;['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach((v) => {
      graph.addVerticals(v);
    });
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
    // graph.toString();
    // graph.bfsDistance(graph.verticals);
    graph.showPath('A', 'G');
  }, []);

  useEffect(() => {
    function f () {}
    const a = f.prototype;
    const b = Object.getPrototypeOf(f);
    // console.log(a === b);
  }, []);

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
