import './styles.css'
import {Calendar} from './components/Calendar'
import styled from 'styled-components'
import {Land, StyledLand} from './components/Land'
import {ScheduledPlant} from './model/ScheduledPlant'
import {Area} from './model/Area'
import {Store} from './store'
import {Storage} from './service/Storage'

const bed:Area = {
  x: 10,
  y: 0,
  w: 330,
  h: 480
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

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  ${StyledLand} {
    flex: 1 1 auto;
    box-shadow: 0 0 0 2px lime inset;
  }
`

export function App() {
  return <Store><Storage /><StyledApp>
    <Calendar schedule={schedule} />
    <Land bed={bed} schedule={schedule} />
  </StyledApp></Store>
}
