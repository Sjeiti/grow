import './styles.css'
import {Calendar} from './components/Calendar'
import styled from 'styled-components'
import {Land } from './components/Land'
import {ScheduledPlant} from './model/ScheduledPlant'



const schedule:ScheduledPlant[] = [
  {
    plant: { name: 'Carrot' },
    area: {x:0,y:0,w:100,h:100},
    dateRange: {from:new Date('0000-01-01'),to:new Date('0000-03-01')},
    color: '#ff8a18'
  },
  {
    plant: { name: 'Blueberry' },
    area: {x:0,y:0,w:100,h:100},
    dateRange: {from:new Date('0000-05-01'),to:new Date('0000-06-01')},
    color: '#256b8e'
  }
]



const StyledApp = styled.div`
  box-shadow: 0 0 32px;
`

export function App() {
  return <StyledApp>
    <Calendar schedule={schedule}></Calendar>
    <Land></Land>
  </StyledApp>
}
