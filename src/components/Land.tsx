import styled from 'styled-components'
import {ScheduledPlant} from '../model/ScheduledPlant'
import {Area} from '../model/Area'
import {PlantArea} from './PlantArea'

const StyledLand = styled.div`
  position: relative;
`
const StyledBed = styled.div`
  position: absolute;
  font-family: var(--font-condensed);
  color: black;
  box-shadow: 0 0 0 1px gray;
`

function relativeSize(n:number):string {
	return `${0.2*n}rem`
}

export function Land(attr:{bed:Area,schedule:ScheduledPlant[]}) {

  const {bed, schedule} = attr
  const contents = schedule.filter(plan=>plan.bed===bed)

  const bedStyle = {
    left: relativeSize(bed.x),
    top: relativeSize(bed.y),
    width: relativeSize(bed.w),
    height: relativeSize(bed.h)
  }

  return <StyledLand>
    <StyledBed style={bedStyle}>
      {contents.map((plan, key) => <PlantArea plan={plan} key={key} />)}
    </StyledBed>
  </StyledLand>
}
