import styled from 'styled-components'
import {months} from '../config'
import {datePart, partToPercentage, rem} from '../utils/utils'
import {Model} from '../model/Model'
import {useContext, useMemo} from 'react'
import {Context} from '../store'
import {ScheduledPlant} from '../model/ScheduledPlant'

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

export function Calendar() {

  const [state, dispatch]:[Model, any] = useContext(Context)

  const {schedule, plants} = state

  const rows = useMemo(()=>calculateRows(schedule), [])

  let row = 0
  let lastTo = new Date('01-01-0000T00:00:00')
  const sortedSchedule = schedule
      .sort(({dateRange: {from: a}}, {dateRange: {from: b}}) => a === b ? 0 : a > b ? 1 : -1)
      .map(plan => {
        const {dateRange: {from, to}} = plan
        // console.log('from',from) // todo: remove log
        if (from<lastTo) row++
        lastTo = to
        return {...plan, row}
      })

  return <StyledCalendar>
    <header>
      {months.map(month=><div key={month}>{month}</div>)}
    </header>
    <div>
      {rows.map((row,j)=>{
        return row.map((plan,index)=>{
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
          return <div style={style} key={index}>{plant.name}</div>
        })
      })}
    </div>
  </StyledCalendar>
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
