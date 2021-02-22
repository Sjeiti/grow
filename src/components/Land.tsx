import styled from 'styled-components'
import {Area} from '../model/Area'
import {PlantArea} from './PlantArea'
import {px} from '../utils/utils'
import {useContext} from 'react'
import {Context} from '../store'
import {Model} from '../model/Model'

export const StyledLand = styled.div`
  position: relative;
`
const StyledBed = styled.div`
  position: absolute;
  font-family: var(--font-condensed);
  color: black;
  box-shadow: 0 0 0 1px gray;
`

export function Land() {

  const [state, dispatch]:[Model, any] = useContext(Context)

  const {beds, schedule} = state
  const bedKey = Object.keys(beds)[0]
  const bed:Area = beds[bedKey]

  const contents = schedule.filter(plan=>plan.bedKey===bedKey)

  const bedStyle = {
    left: px(bed.x),
    top: px(bed.y),
    width: px(bed.w),
    height: px(bed.h)
  }

  return <StyledLand>
    <StyledBed style={bedStyle}>
      {contents.map((plan, key) => <PlantArea plan={plan} index={key} key={key} />)}
    </StyledBed>
  </StyledLand>
}
