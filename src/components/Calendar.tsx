import styled from 'styled-components'
import {months} from '../config'
import {datePart, partToPercentage} from '../utils/utils'
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
    &:not(las-child) {
      box-shadow: -1px 0 0 var(--color-fg) inset;
    }
   }
  }
  div {
    position: relative;
    min-height: 2rem;
    div {
      color: black;
      position: relative;
      height: 2rem;
      padding-left: 0.5rem;
      background-color: orange;
      font-family: var(--font-condensed);
      line-height: 2rem;
    }
  }
`

export function Calendar(attr:{schedule:ScheduledPlant[]}) {
  const {schedule} = attr

  return <StyledCalendar>
    <header>
      {months.map(month=><div key={month}>{month}</div>)}
    </header>
    <div>
      {schedule.map((plan,key)=>{
        const {from, to} = plan.dateRange
        const fromPart = datePart(from)
        const toPart = datePart(to)
        const widthPart = toPart - fromPart
        const style = {
          left: partToPercentage(fromPart),
          width: partToPercentage(widthPart),
          backgroundColor: plan.color
        }
        return <div style={style} key={key}>{plan.plant.name}</div>
      })}
    </div>
  </StyledCalendar>
}
