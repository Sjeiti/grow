import {DateRange} from './DateRange'

export interface Plant {
  name: string
  size?: number
  sow?: DateRange
  harvest?: DateRange
}
