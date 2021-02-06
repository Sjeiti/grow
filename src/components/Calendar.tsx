import styled from 'styled-components'
import {months} from '../config'
import {datePart, partToPercentage} from '../utils/utils'
import {ScheduledPlant} from '../model/ScheduledPlant'

const StyledCalendar = styled.div`
  margin-bottom: 3rem;
  box-shadow: 0 0 32px;
  header {
   display: flex;
   div {
    flex: 0 0 ${1/12*100}%;
    text-align: center;
    &:not(las-child) {
      box-shadow: -1px 0 0 var(--color-fg) inset;
    }
   }
  }
  div {
    position: relative;
    div {
      color: black;
      position: absolute;
      height: 2rem;
      background-color: orange;
      font-family: var(--font-condensed);
    }
  }
`

export function Calendar(attr:{schedule:ScheduledPlant[]}) {
  const {schedule} = attr

  return <StyledCalendar>
    <header>
      {months.map(month=><div>{month}</div>)}
    </header>
    <div>
      {schedule.map(plan=>{
        const {from, to} = plan.dateRange
        const fromPart = datePart(from)
        const toPart = datePart(to)
        const widthPart = toPart - fromPart
        const style = {
          left: partToPercentage(fromPart),
          width: partToPercentage(widthPart),
          backgroundColor: plan.color
        }
        return <div style={style}>{plan.plant.name}</div>
      })}
    </div>
  </StyledCalendar>
}
