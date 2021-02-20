import './styles.css'
import {Calendar} from './components/Calendar'
import styled from 'styled-components'
import {Land } from './components/Land'
import {ScheduledPlant} from './model/ScheduledPlant'
import {Area} from './model/Area'

const bed:Area = {
  x: 10,
  y: 0,
  w: 330,
  h: 520
}
const differentBed:Area = {
  x: 300,
  y: 0,
  w: 220,
  h: 320
}

const schedule:ScheduledPlant[] = [
  {
    plant: { name: 'Carrot', size: 11 },
    bed,
    area: {x:0,y:0,w:100,h:100},
    dateRange: {from:new Date('0000-01-01'),to:new Date('0000-03-01')},
    color: '#c61'
  },
  {
    plant: { name: 'Blueberry', size: 33 },
    bed,
    area: {x:20,y:20,w:100,h:100},
    dateRange: {from:new Date('0000-05-01'),to:new Date('0000-06-01')},
    color: '#256b8e'
  },
  {
    plant: { name: 'Cannabis' },
    bed: differentBed,
    area: {x:20,y:20,w:100,h:100},
    dateRange: {from:new Date('0000-04-01'),to:new Date('0000-08-01')},
    color: '#547e30'
  },
  {
    plant: { name: 'Graan' },
    dateRange: {from:new Date('0000-06-15'),to:new Date('0000-08-22')},
    color: '#78641b'
  }
]

const StyledApp = styled.div``

export function App() {
  return <StyledApp>
    <Calendar schedule={schedule}></Calendar>
    <Land bed={bed} schedule={schedule}></Land>
  </StyledApp>
}
