import {Area} from './Area'
import {DateRange} from './DateRange'

export interface ScheduledPlant {
  plantKey: string
  bedKey?: string
  area?: Area
  dateRange: DateRange
  presprout?: DateRange
  sow?: DateRange
  harvest?: DateRange
  color: string
}
