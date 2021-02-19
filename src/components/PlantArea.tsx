import styled from 'styled-components'
import {ScheduledPlant} from '../model/ScheduledPlant'
import {rgba} from '../utils/utils'
import React, {useCallback, useEffect, useState, useMemo} from 'react'


const defaultArea = {x:0,y:0,w:1,h:1}

const StyledPlantArea = styled.div<{plantSize:string}>`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  line-height: 0.1px;
  background: radial-gradient(circle at center, ${props=>props.color} 62%, transparent 66%);
  background-size: ${(props:any)=>props.plantSize} ${(props:any)=>props.plantSize};
`

const zoom = 2

function relativeSize(n:number):string {
	return `${zoom*n}px`
}

export function PlantArea(attr:{plan:ScheduledPlant}) {
  const {plant: {name, size = 5}, area = defaultArea, color} = attr.plan
  const {x, y, w, h} = area

  const [position, setPosition] = useState({x: x/zoom, y: y/zoom})
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
    setLastpos(getPos(e))
    setDragging(true)
  }, [])
  const stopDragging = useCallback(setDragging.bind(null, false), [])

  const [style, setStyle] = useState({
    left: relativeSize(x),
    top: relativeSize(y),
    width: relativeSize(w),
    height: relativeSize(h),
    boxShadow: `0 0 0 11px ${rgba(color, 0.3)} inset`
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
    const x = ox + mx
    const y = oy + my
    setPosition({x,y})
    setStyle({...style, ...{
      left: x + 'px',
      top: y + 'px'
    }})
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

  const plantSize = useMemo(()=>relativeSize(size-1), [])

  return <StyledPlantArea
      style={style}
      title={name}
      onTouchStart = {startDragging}
      onMouseDown = {startDragging}
      plantSize = {plantSize}
      color = {color}
  >
  </StyledPlantArea>
}
