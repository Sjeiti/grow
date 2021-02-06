import {Plant} from './Plant'
import {Area} from './Area'
import {DateRange} from './DateRange'

export interface ScheduledPlant {
  plant: Plant
  area: Area
  dateRange: DateRange
  presprout: DateRange
  sow: DateRange
  harvest: DateRange
  color: string
}
