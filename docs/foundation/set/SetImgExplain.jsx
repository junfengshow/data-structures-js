/**
 * hideActions: ['CSB', 'EXTERNAL']
 * 用canvas绘制示例图示
 */
import React, { useEffect, useRef } from 'react'
import { fabric } from 'fabric'

const SetUnion = () => {
  const canvasWrapRef = useRef(null)
  const canvasRef = useRef(null)
  useEffect(() => {
    console.log('useEffect')
    const oWidth = canvasWrapRef.current.offsetWidth
    const oHeight = 300

    // 中间点
    const midWidth = Math.floor(oWidth / 2)
    const midHeight = Math.floor(oHeight / 2)

    const canvas = new fabric.Canvas(canvasRef.current)
    canvas.setWidth(oWidth)
    canvas.setHeight(oHeight)

    const c1 = new fabric.Circle({
      left: midWidth - 100,
      top: midHeight - 120,
      radius: 120,
      // borderColor: '',
      stroke: '#333333',
      fill: 'none',
      opacity: 0.5
    })
    const c2 = new fabric.Circle({
      left: midWidth + 100,
      top: midHeight - 120,
      radius: 120,
      // borderColor: '',
      stroke: '#ccc',
      fill: 'none',
      opacity: 0.5
    })

    canvas.add(c1)
    canvas.add(c2)
    
    // canvas.setBackgroundColor('#cccccc', () => {})
  }, [])
  return (
    <div ref={canvasWrapRef}>
      <canvas ref={canvasRef}/>
    </div>
  )
}
export {
  SetUnion
}
export default SetUnion