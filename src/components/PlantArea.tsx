import styled from 'styled-components'
import {ScheduledPlant} from '../model/ScheduledPlant'
import {rgba} from '../utils/utils'
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
  background-size: ${(props:any)=>props.plantSize} ${(props:any)=>props.plantSize};
`

// const StyledHandle = styled(Draggable)<{x:number,y:number,w:number,h:number,color:string}>`
const StyledHandle = styled.div<{color:string}>`
  width: 1rem;
  height: 1rem;
  background-color: red;
`

const zoom = 2

function relativeSize(n:number):string {
	return `${zoom*n}px`
}

export function PlantArea(attr:{plan:ScheduledPlant}) {
  const {plant: {name, size = 5}, area = defaultArea, color} = attr.plan
  const {x, y, w, h} = area

  const [style, setStyle] = useState({
    // left: relativeSize(x),
    // top: relativeSize(y),
    width: relativeSize(w),
    height: relativeSize(h),
    boxShadow: `0 0 0 11px ${rgba(color, 0.6)} inset`
  })

  const plantSize = useMemo(()=>relativeSize(size-1), [])


  return <Draggable {...{x,y,w,h}}><StyledPlantArea
      style={style}
      title={name}
      plantSize = {plantSize}
      color = {color}
  >
  </StyledPlantArea>
  <StyledHandle {...{x,y,w,h,color}} />
  <Draggable {...{x,y}}><StyledHandle {...{color}} /></Draggable>
  </Draggable>
}
