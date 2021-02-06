import {Plant} from './Plant'
import {Area} from './Area'
import {DateRange} from './DateRange'

export interface ScheduledPlant {
  plant: Plant
  area: Area
  dateRange: DateRange
  color: string
}
