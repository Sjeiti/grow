import React, {useCallback, useEffect, useState, CSSProperties} from 'react'
import {px} from '../utils/utils'

export function Draggable(props:{
  x:number
  ,y:number
  ,w?:number
  ,h?:number
  ,lockX?:boolean
  ,lockY?:boolean
  ,callback?:(x:number,y:number)=>void
  ,children?:any
}) {
  const {x, y, w, h, lockX=false, lockY=false, callback} = props

  // console.log('Draggable',{x, y, w, h}) // todo: remove log

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

  const [style, setStyle] = useState({
    position: 'absolute',
    left: x+'px',
    top: y+'px'
    // width: relativeSize(w),
    // height: relativeSize(h),
  })

  const windowMove = useCallback(e=>setPos(getPos(e)),[])

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

    const newStyle = lockX&&{top:px(y)}||lockY&&{left:px(x)}||{left:px(x),top:px(y)}
    setStyle({...style, ...newStyle})
  },[move])

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
