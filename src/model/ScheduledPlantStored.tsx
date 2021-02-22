import {Area} from './Area'
import {DateRangeStored} from './DateRangeStored'

export interface ScheduledPlantStored {
  plantKey: string
  bedKey?: string
  area?: Area
  dateRange: DateRangeStored
  presprout?: DateRangeStored
  sow?: DateRangeStored
  harvest?: DateRangeStored
  color: string
}
