import React, { useEffect } from 'react'
import { fabric } from 'fabric'
// import './components/LinkedListSingle' 
// import './components/LinkedListDouble' 
// import './components/Queue' 
// import './components/Stack' 
// import './components/SetDemo'
// import SetUnion from '../components/SetUnion' 
// import '../demos/tree'
// import '../demos/sort'
// import '../demos/search'
import '../demos/graph'
import { AvlTree, AvlNodeItf } from '../demos/treeAvl'


function createRect ({ left = 100, top = 100 }: any = {}) {
  return new fabric.Rect({
    left, 
    top, 
    fill: '#eee', 
    width: 60, 
    height: 100, 
    angle: 0,
    borderColor: '#333',
    hasControls: false,
    stroke: '#333',
    rx: 4,
  })
}

function createCircle ({ left, top }: any) {
  return new fabric.Circle({
    left, top, radius: 20, fill: '#ccc', 
    originX: 'center', originY: 'center'
  })
}
function createGroup ({ left, top, text }: any) {
  let circle = new fabric.Circle({
    radius: 20, 
    fill: '#ccc', 
    originX: 'center', 
    originY: 'center',
    
  })
  let _text = new fabric.Text(text, {
    fontSize: 14,
    textAlign: 'center',
    originX: 'center', 
    originY: 'center'
  })
  return new fabric.Group([circle, _text], {
    left, top
  })
}

let levelWidths = [0, 300, 180, 80, 40]

const Home = () => {

  useEffect(() => {
    let canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'red'
    })
    canvas.setWidth(600);
    canvas.setHeight(300);

    let line = new fabric.Line([160, 150, 200, 150], {
      stroke: 'black',
      strokeWidth: 4
    })
    let triangle = new fabric.Triangle({
      left: 203,
      top: 143,
      width: 16,
      height: 16,
      fill: 'black',
      angle: 90
    })
    canvas.add(createRect(), createRect({ left: 200 }))
    canvas.add(line)
    canvas.add(triangle)
    
  }, [])

  useEffect(() => {
    const tree = new AvlTree<number>()
    ;[
      11, 7, 15, 5, 9, 3, 6, 8, 10, 13, 20, 12, 14, 18, 25, 
      27, 30, 46, 70
    ].forEach((item) => {
      tree.insert(item)
    })
    let canvas = new fabric.Canvas('canvas2', {
      backgroundColor: 'green'
    })


    canvas.setWidth(1200);
    canvas.setHeight(400);
    const midLeft = 600

    let groups: Array<any> = [], lines: Array<any> = []
    function loopTree<T> (
      node: null|AvlNodeItf<T>,
      parentNode?: AvlNodeItf<T>,
      position?: string,
      level: number = 0
    ) {
      if (!node) {
        return
      }
      if (!parentNode) {
        node.pLeft = midLeft
        node.pTop = 20
      } else {
        let dis = position === 'left' ? -1 : 1
        let _pLeft = parentNode.pLeft ? parentNode.pLeft : 0
        let _pTop = parentNode.pTop ? parentNode.pTop : 0
        node.pLeft = _pLeft + dis * (levelWidths[level])
        node.pTop = _pTop +  60 + level * 4
      }
      const group = createGroup({
        left: node.pLeft,
        top: node.pTop,
        text: node.key + ''
      })
      
      if (parentNode) {
        let _startLeft = (parentNode.pLeft ? parentNode.pLeft : 0) + 20
        let _startTop = (parentNode.pTop ? parentNode.pTop : 0) + 20
        let line = new fabric.Line([_startLeft, _startTop, node.pLeft + 20, node.pTop + 20], {
          stroke: 'black',
          strokeWidth: 1
        })
        lines.push(line)
        // canvas.add(line)
      }
      groups.push(group)
      // canvas.add(group)
      level += 1
      loopTree(node.left, node, 'left', level)
      loopTree(node.right, node, 'right', level)
    }
    loopTree(tree.root)
    canvas.add(...lines)
    canvas.add(...groups)
    // console.log(tree.root)
  }, [])
  return (
    <div>
      
      <div>
        一个task(宏任务) -- 队列中全部job(微任务) -- requestAnimationFrame 
        -- 浏览器重排/重绘 -- requestIdleCallback
      </div>
      <canvas id='canvas' />
      <canvas id='canvas2' />
    </div>
  )
}
export default Home