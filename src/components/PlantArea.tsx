import styled from 'styled-components'
import {ScheduledPlant} from '../model/ScheduledPlant'
import {px, rgba, square} from '../utils/utils'
import React, {useState, useMemo} from 'react'
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
  background-color: red;
`

export function PlantArea(attr:{plan:ScheduledPlant}) {
  const {plant: {name, size = 5}, area = defaultArea, color} = attr.plan
  // const {x, y, w, h} = area

  const {x, y} = area
  const [w, setW] = useState(area.w)
  const [h, setH] = useState(area.h)

  const [style, setStyle] = useState({
    // left: relativeSize(x),
    // top: relativeSize(y),
    width: px(w),
    height: px(h),
    boxShadow: `0 0 0 11px ${rgba(color, 0.6)} inset`
  })

  const plantSize = useMemo(()=>square(px(size)), [])

  const handleSize = useMemo(()=>32, [])
  const handleProps = useMemo(()=>({color,size:handleSize}), [])

  return <Draggable {...{x,y,w,h}}>
    <StyledPlantArea
      style={style}
      title={name}
      plantSize = {plantSize}
      color = {color}
    />
    <Draggable {...{x:0,y:0}}><StyledHandle {...handleProps} /></Draggable>
    <Draggable {...{
      x:(w-handleSize)/2
      ,y:h-handleSize
      ,lockX: true
      ,callback: (x,y)=>{setH(y);setStyle({...style,height:px(y+handleSize)})}
    }}><StyledHandle {...handleProps} /></Draggable>
    <Draggable {...{
      x:w-handleSize
      ,y:(h-handleSize)/2
      ,lockY: true
      ,callback: x=>{setW(x);setStyle({...style,width:px(x+handleSize)})}
    }}><StyledHandle {...handleProps} /></Draggable>
  </Draggable>
}
