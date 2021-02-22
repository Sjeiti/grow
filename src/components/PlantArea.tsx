import styled from 'styled-components'
import {ScheduledPlant} from '../model/ScheduledPlant'
import {px, rgba, square} from '../utils/utils'
import React, {useState, useMemo, useEffect, useContext} from 'react'
import {Draggable} from './Draggable'
import {Model} from '../model/Model'
import {Context} from '../store'

const defaultBed = {x:0,y:0,w:100,h:100}
const defaultArea = {x:0,y:0,w:1,h:1}

const StyledPlantArea = styled.div<{plantSize:string}>`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  line-height: 0.1px;
  background: radial-gradient(circle at center, ${props=>props.color} 62%, transparent 66%);
  background-size: ${(props:any)=>props.plantSize};
`

const StyledDraggable = styled(Draggable)<{color:string,size:number}>`
  width: ${props=>props.size}px;
  height: ${props=>props.size}px;
  transform: translate(-50%,-50%);
  box-shadow: 0 0 0.5rem ${props=>props.color} inset;
  z-index: 999;
`

export function PlantArea(attr:{plan:ScheduledPlant,index:number}) {

  const [state, dispatch]:[Model, any] = useContext(Context)
  const {plants, beds} = state

  const {index, plan: {plantKey, bedKey, area = defaultArea, color}} = attr
  const {name, size = 5} = plants[plantKey]
  const bed = bedKey&&beds[bedKey]||defaultBed

  const [x, setX] = useState(area.x)
  const [y, setY] = useState(area.y)
  const [w, setW] = useState(area.w)
  const [h, setH] = useState(area.h)

  const [style, setStyle] = useState({})

  const plantSize = useMemo(()=>square(px(size)), [])

  const handleSize = useMemo(()=>32, [])
  const handleProps = useMemo(()=>({color,size:handleSize}), [])

  useEffect(()=>{
    setStyle({
      width: px(w),
      height: px(h),
      boxShadow: `0 0 0 11px ${rgba(color, 0.6)} inset`
    })
  },[w,h])

  useEffect(()=>{
    dispatch({type: 'UPDATE_AREA', payload: {index, area: {x,y,w,h}}})
  },[x,y,w,h])

  return <>
    <Draggable {...{
      x
      ,y
      ,xmin: 0
      ,ymax: bed.h-h
      ,ymin: 0
      ,xmax: bed.w-w
      ,callback:(x,y)=>{
        setX(x)
        setY(y)
      }}}>
      <StyledPlantArea
        style={style}
        title={name}
        plantSize = {plantSize}
        color = {color}
      />
    </Draggable>

    {/*## TL ##*/}
    <StyledDraggable {...{
      ...handleProps
      ,x
      ,y
      ,xmin: 0
      ,xmax: x+w-size
      ,ymin: 0
      ,ymax: y+h-size
      ,callback: (xx,yy)=>{
        setX(xx)
        setY(yy)
        setW(w-xx+x)
        setH(h-yy+y)
      }
    }} />

    {/*## BR ##*/}
    <StyledDraggable {...{
      ...handleProps
      ,x:x+w
      ,y:y+h
      ,xmin: x+size
      ,xmax: bed.w
      ,ymin: y+size
      ,ymax: bed.h
      ,callback: (xx,yy)=>{
        setW(xx-x)
        setH(yy-y)
      }
    }} />

    {/*## BL ##*/}
    <StyledDraggable {...{
      ...handleProps
      ,x
      ,y:y+h
      ,xmin: 0
      ,xmax: x+w-size
      ,ymin: y+size
      ,ymax: bed.h
      ,callback: (xx,yy)=>{
        setX(xx)
        setW(w-xx+x)
        setH(yy-y)
      }
    }} />

    {/*## TR ##*/}
    <StyledDraggable {...{
      ...handleProps
      ,x:x+w
      ,y
      ,xmin: x+size
      ,xmax: bed.w
      ,ymin: 0
      ,ymax: y+h-size
      ,callback: (xx,yy)=>{
        setY(yy)
        setW(xx-x)
        setH(h-yy+y)
      }
    }} />

    {/*## B ##*/}
    <StyledDraggable {...{
      ...handleProps
      ,x:x+(w)/2
      ,y:y+h
      ,ymin: y+size
      ,ymax: bed.h
      ,lockX: true
      ,callback: (xx,yy)=>setH(yy-y)
    }} />

    {/*## R ##*/}
    <StyledDraggable {...{
      ...handleProps
      ,x:x+w
      ,y:y+h/2
      ,xmin: x+size
      ,xmax: bed.w
      ,lockY: true
      ,callback: xx=>setW(xx-x)
    }} />

    {/*## T ##*/}
    <StyledDraggable {...{
      ...handleProps
      ,x:x+w/2
      ,y
      ,ymin: 0
      ,ymax: y+h-size
      ,lockX: true
      ,callback: (xx,yy)=>{
        setY(yy)
        setH(h-yy+y)
      }
    }} />

    {/*## L ##*/}
    <StyledDraggable {...{
      ...handleProps
      ,x
      ,y:y+h/2
      ,xmin: 0
      ,xmax: x+w-size
      ,lockY: true
      ,callback: xx=>{
        setX(xx)
        setW(w-xx+x)
      }
    }} />

  </>
}
