import {Plant} from './Plant'
import {Area} from './Area'
import {ScheduledPlant} from './ScheduledPlant'

export interface Model {
  plants: { [key:string]: Plant }
  beds: { [key:string]: Area }
  schedule: ScheduledPlant[]
}
