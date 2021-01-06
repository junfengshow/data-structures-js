import React, { useEffect, useRef } from 'react'
import { fabric } from 'fabric'

const SetUnion = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    console.log('useEffect')
    const canvas = new fabric.Canvas(canvasRef.current)
    canvas.setWidth(400)
    canvas.setHeight(300)
    canvas.setBackgroundColor('#cccccc', () => {})
    
    // const borderLine = new fabric.Path({

    // })
  }, [])
  return (
    <canvas ref={canvasRef}/>
  )
}
export default SetUnion
