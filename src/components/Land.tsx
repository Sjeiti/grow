import styled from 'styled-components'
import {ScheduledPlant} from '../model/ScheduledPlant'
import {Area} from '../model/Area'
import {PlantArea} from './PlantArea'
import {px} from '../utils/utils'

export const StyledLand = styled.div`
  position: relative;
`
const StyledBed = styled.div`
  position: absolute;
  font-family: var(--font-condensed);
  color: black;
  box-shadow: 0 0 0 1px gray;
`

export function Land(attr:{bed:Area,schedule:ScheduledPlant[]}) {

  const {bed, schedule} = attr
  const contents = schedule.filter(plan=>plan.bed===bed)

  const bedStyle = {
    left: px(bed.x),
    top: px(bed.y),
    width: px(bed.w),
    height: px(bed.h)
  }

  return <StyledLand>
    <StyledBed style={bedStyle}>
      {contents.map((plan, key) => <PlantArea plan={plan} key={key} />)}
    </StyledBed>
  </StyledLand>
}
