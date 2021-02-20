import styled from 'styled-components'
import {ScheduledPlant} from '../model/ScheduledPlant'
import {px, rgba, square} from '../utils/utils'
import React, {useState, useMemo, useEffect} from 'react'
import {Draggable} from './Draggable'


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

// const StyledHandle = styled(Draggable)<{x:number,y:number,w:number,h:number,color:string}>`
const StyledHandle = styled.div<{color:string,size:number}>`
  width: ${props=>props.size}px;
  height: ${props=>props.size}px;
  transform: translate(-50%,-50%);
  box-shadow: 0 0 0.5rem white inset;
  z-index: 1;
`

export function PlantArea(attr:{plan:ScheduledPlant}) {
  const {plant: {name, size = 5}, area = defaultArea, color} = attr.plan

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

  return <>
    <Draggable {...{x,y,callback:(x,y)=>{
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
    <Draggable {...{
      x
      ,y
      ,callback: (xx,yy)=>{
        setX(xx)
        setY(yy)
        setW(w-xx+x)
        setH(h-yy+y)
      }
    }}><StyledHandle {...handleProps} /></Draggable>

    {/*## BR ##*/}
    <Draggable {...{
      x:x+w
      ,y:y+h
      ,callback: (xx,yy)=>{
        setW(xx-x)
        setH(yy-y)
      }
    }}><StyledHandle {...handleProps} /></Draggable>

    {/*## BL ##*/}
    <Draggable {...{
      x
      ,y:y+h
      ,callback: (xx,yy)=>{
        setX(xx)
        setW(w-xx+x)
        setH(yy-y)
      }
    }}><StyledHandle {...handleProps} /></Draggable>

    {/*## TR ##*/}
    <Draggable {...{
      x:x+w
      ,y
      ,callback: (xx,yy)=>{
        setY(yy)
        setW(xx-x)
        setH(h-yy+y)
      }
    }}><StyledHandle {...handleProps} /></Draggable>

    {/*## B ##*/}
    <Draggable {...{
      x:x+(w)/2
      ,y:y+h
      ,lockX: true
      ,callback: (xx,yy)=>setH(yy-y)
    }}><StyledHandle {...handleProps} /></Draggable>

    {/*## R ##*/}
    <Draggable {...{
      x:x+w
      ,y:y+h/2
      ,lockY: true
      ,callback: xx=>setW(xx-x)
    }}><StyledHandle {...handleProps} /></Draggable>

    {/*## T ##*/}
    <Draggable {...{
      x:x+w/2
      ,y
      ,lockX: true
      ,callback: (xx,yy)=>{
        setY(yy)
        setH(h-yy+y)
      }
    }}><StyledHandle {...handleProps} /></Draggable>

    {/*## L ##*/}
    <Draggable {...{
      x
      ,y:y+h/2
      ,lockY: true
      ,callback: xx=>{
        setX(xx)
        setW(w-xx+x)
      }
    }}><StyledHandle {...handleProps} /></Draggable>

  </>
}
