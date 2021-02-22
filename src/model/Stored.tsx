import {Plant} from './Plant'
import {Area} from './Area'
import {DateRange} from './DateRange'
import {ScheduledPlantStored} from './ScheduledPlantStored'

export interface Stored {
  plants: { [key:string]: Plant }
  beds: { [key:string]: Area }
  schedule: ScheduledPlantStored[]
}
