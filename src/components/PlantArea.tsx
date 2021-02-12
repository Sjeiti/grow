import styled from 'styled-components'
import Draggable, {DraggableCore} from 'react-draggable'
import {ScheduledPlant} from '../model/ScheduledPlant'
import {rgba} from '../utils/utils'
import {useCallback, useEffect, useState} from 'react'

const {body} = document

const defaultArea = {x:0,y:0,w:1,h:1}

const StyledPlantArea = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  line-height: 0.1px;
`
const StyledPlant = styled.div`
  border-radius: 50%;
  min-width: 2px;
  min-height: 2px;
  margin: 0 1px 1px 0;
  box-shadow: 4px 4px 8px rgba(0,0,0,0.3) inset;
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

  const [dragging, setDragging] = useState(false)

  const startDragging = useCallback(setDragging.bind(null, true), [])
  const stopDragging = useCallback(setDragging.bind(null, false), [])

  const [style, setStyle] = useState({
    left: relativeSize(x),
    top: relativeSize(y),
    width: relativeSize(w),
    height: relativeSize(h),
    boxShadow: `0 0 0 11px ${rgba(color, 0.3)} inset`
  })

  const windowMove = useCallback(e=>{
    const {movementX, movementY} = e
    setMove({x:movementX, y:movementY})
  },[])

  useEffect(()=>{
    const {x:oldx, y:oldy} = position
    const {x:movex, y:movey} = move
    const x = oldx + movex
    const y = oldy + movey
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
      window.addEventListener('touchmove', windowMove)
    } else {
      window.removeEventListener('mousemove', windowMove)
      window.removeEventListener('touchmove', windowMove)
    }
  }, [dragging])

  return <StyledPlantArea
      style={style}
      title={name}
      onTouchStart = {startDragging}
      onMouseDown = {startDragging}
  >
    {(()=>{
      const num = Math.floor(w/size)*Math.floor(h/size)
      const plantSize = relativeSize(size-1)
      const plantStyle = {
        width: plantSize,
        height: plantSize,
        backgroundColor: color
      }
      return Array.from(new Array(num)).map((n,key)=>
        <StyledPlant style={plantStyle} key={key}></StyledPlant>
      )
    })()}
  </StyledPlantArea>
}
