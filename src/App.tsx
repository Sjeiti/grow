import './styles.css'
import {Calendar} from './components/Calendar'
import styled from 'styled-components'
import {Land, StyledLand} from './components/Land'
import {Store} from './store'
import {Menu} from './components/Menu'

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
  return <Store><StyledApp>
    <Calendar />
    <Menu />
    <Land />
  </StyledApp></Store>
}
