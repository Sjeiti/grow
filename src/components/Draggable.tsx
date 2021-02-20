import React, {useCallback, useEffect, useState, CSSProperties} from 'react'
import {px} from '../utils/utils'

export function Draggable(props:{
  x:number
  ,y:number
  ,lockX?:boolean
  ,lockY?:boolean
  ,callback?:(x:number,y:number)=>void
  ,children?:any
}) {
  const {x, y, lockX=false, lockY=false, callback} = props

  const [position, setPosition] = useState({x, y})
  const [move, setMove] = useState({x:0, y:0})

  const [lastpos, setLastpos] = useState({x:0, y:0})
  const [pos, setPos] = useState({x:0, y:0})

  const [dragging, setDragging] = useState(false)

  const getPos = useCallback(e=>{
    const {clientX:x, clientY:y} = e?.touches?.[0]||e
    return {x,y}
  }, [])

  const startDragging = useCallback(e=>{
    e.preventDefault()
    e.stopPropagation()
    setLastpos(getPos(e))
    setDragging(true)
  }, [])
  const stopDragging = useCallback(setDragging.bind(null, false), [])

  const a:'absolute' = 'absolute'
  const [style, setStyle] = useState({
    position: a,
    left: x+'px',
    top: y+'px'
  })

  const windowMove = useCallback(e=>setPos(getPos(e)),[])

  useEffect(()=>setPosition({x,y}),[x,y])

  useEffect(()=>{
    const {x:ox,y:oy} = lastpos
    const {x,y} = pos
    const dx = x - ox
    const dy = y - oy
    setMove({x:dx, y:dy})
    setLastpos({x,y})
  },[pos])

  useEffect(()=>{
    const {x:ox, y:oy} = position
    const {x:mx, y:my} = move
    const x = ox + (lockX?0:mx)
    const y = oy + (lockY?0:my)
    setPosition({x,y})
    callback?.(x,y)
  },[move])

  useEffect(()=>{
    const {x,y} = position
    const newStyle = {left:px(x),top:px(y)}
    setStyle({...style, ...newStyle})
  },[position])

  useEffect(()=>{
    window.addEventListener('mouseup', stopDragging)
    window.addEventListener('touchend', stopDragging)
    return ()=>{
      window.removeEventListener('mouseup', stopDragging)
      window.removeEventListener('touchend', stopDragging)
      window.removeEventListener('mousemove', windowMove)
      window.removeEventListener('touchmove', windowMove)
    }
  }, [])

  useEffect(()=>{
    if (dragging) {
      window.addEventListener('mousemove', windowMove)
      document.addEventListener('touchmove', windowMove)
    } else {
      window.removeEventListener('mousemove', windowMove)
      document.removeEventListener('touchmove', windowMove)
    }
  }, [dragging])

  return <div
      style={style}
      onTouchStart = {startDragging}
      onMouseDown = {startDragging}
  >{props.children}</div>
}
