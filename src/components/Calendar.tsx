import styled from 'styled-components'
import {months} from '../config'
import {datePart, partToPercentage, px, rem} from '../utils/utils'
import {Model} from '../model/Model'
import React, {Fragment, useCallback, useContext, useMemo} from 'react'
import {Context} from '../store'
import {ScheduledPlant} from '../model/ScheduledPlant'
import {Draggable} from './Draggable'
import {action} from '../store/reducer'
import {DateRange} from '../model/DateRange'

const StyledCalendar = styled.div`
  margin-bottom: 3rem;
  box-shadow: 0 0 0 1px gray;
  header {
   display: flex;
   box-shadow: 0 -1px 0 gray inset;
   div {
    flex: 0 0 ${1/12*100}%;
    text-align: center;
    line-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    &:not(las-child) {
      box-shadow: -1px 0 0 var(--color-fg) inset;
    }
   }
  }
  div {
    position: relative;
    min-height: 2rem;
    div {
      position: absolute;
      color: black;
      height: 2rem;
      padding-left: 0.5rem;
      background-color: orange;
      font-family: var(--font-condensed);
      line-height: 2rem;
    }
  }
`

const StyledDraggable = styled(Draggable)<{color:string,size:number}>`
  width: ${props=>props.size}px;
  height: ${props=>props.size}px;
  transform: translateX(-50%);
  box-shadow: 0 0 0.5rem ${props=>props.color} inset;
  z-index: 999;
`

export function Calendar() {

  const [state, dispatch]:[Model, any] = useContext(Context)

  const {schedule, plants} = state

  const w = useMemo(()=>document.body.clientWidth, [])
  const rows = useMemo(()=>calculateRows(schedule), [schedule])
  // const rows = useMemo(()=>schedule.map(s=>[s]), [schedule])

  const setRange = useCallback((x:number,w:number,plan:ScheduledPlant,isFrom:boolean)=>{
    const date = dateFromX(x, w)
    if (!isNaN(date.getTime())) {
      const dateRange: DateRange = {...plan.dateRange, ...(isFrom? {from: date} : {to: date})}
      dispatch({type: action.UPDATE_PLAN, payload: {plan, dateRange}})
    }
  }, [])

  return <StyledCalendar>
    <header>
      {months.map(month=><div key={month}>{month}</div>)}
    </header>
    <div>
      {rows.map((row,j)=>{
        return row.map((plan,index)=>{
          const key = j+'-'+index
          const {dateRange:{from, to}} = plan
          const fromPart = datePart(from)
          const toPart = datePart(to)
          const widthPart = toPart - fromPart
          const style = {
            top: rem(j*2),
            left: partToPercentage(fromPart),
            width: partToPercentage(widthPart),
            backgroundColor: plan.color
          }
          const plant = plants[plan.plantKey]

          const max = 10
          const x1 = fromPart*w
          const x2 = fromPart*w + (toPart-fromPart)*w

          return <Fragment {...{key}}>

            <StyledDraggable {...{
              x:x1
              ,y:j*32
              ,xmin: 0
              ,xmax: x2-max
              ,lockY: true
              ,color: plan.color
              ,size: 16
              ,callback: xx=>setRange(xx,w,plan,true)
            }} />

            <StyledDraggable {...{
              x:x2
              ,y:j*32
              ,xmin: x1+max
              ,xmax: w
              ,lockY: true
              ,color: plan.color
              ,size: 16
              ,callback: xx=>setRange(xx,w,plan,false)
            }} />

            <div {...{style, key}}>{plant.name}</div>
          </Fragment>
        })
      })}
    </div>
  </StyledCalendar>
}

function dateFromX(x:number,w:number):Date{
  const m = x/w*12
  const mnum = Math.floor(m)
  const dnum = Math.ceil(30*(m-mnum))
  const day = dnum.toString().padStart(2,'0')
  const month = (mnum+1).toString().padStart(2,'0')
  return new Date(`0000-${month}-${day}`)
}

function calculateRows(schedule:ScheduledPlant[]):ScheduledPlant[][]{
	const ss = schedule
      .sort(({dateRange: {from: a}}, {dateRange: {from: b}}) => a === b ? 0 : a > b ? 1 : -1)
      .slice(0)
  const first = ss.shift()
  const rows:ScheduledPlant[][] = []
  if (first) {
    rows.push([first])
    while (ss.length) {
      const plan = ss.shift()
      if (plan) {
        const {dateRange: {from}} = plan
        for (let i=0,l=rows.length;i<l;i++) {
          const row:ScheduledPlant[] = rows[i]
          const {dateRange: {to}} = row[row.length-1]
          if (from>to) {
            row.push(plan)
            break
          } else if (i===rows.length-1) {
            rows.push([plan])
          }
        }
      }
    }
  }
  return rows
}
