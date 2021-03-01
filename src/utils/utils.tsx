import {DateRangeStored} from '../model/DateRangeStored'
import {DateRange} from '../model/DateRange'
import {Model} from '../model/Model'
import {Stored} from '../model/Stored'
import {ScheduledPlant} from '../model/ScheduledPlant'
import {ScheduledPlantStored} from '../model/ScheduledPlantStored'

export function datePart(date: Date): number {
  return (date.getMonth() + date.getDate() / 31) / 12
}

export function partToPercentage(part:number):string {
  return `${100*part}%`
}

export function rgba(color:string, alpha:number):string {
  const hexes = color.substr(1)
  const isThree = hexes.length===3
  const rgb = isThree?(hexes.match(/./g)||[]).map(s=>s+s):(hexes.match(/.{2}/g)||[])
  return `rgba(${rgb.map(s=>parseInt(s,16)).join(',')},${alpha})`
}


export function px(n:number):string {
	return `${n}px`
}
export function rem(n:number):string {
	return `${n}rem`
}

export function square(s:string):string {
	return `${s} ${s}`
}

export function clamp(v:number,min:number,max:number){
  return Math.min(Math.max(v,min),max)
}

function parseDateRange(stored:DateRangeStored):DateRange{
	return {
	  from: new Date(stored.from)
    ,to: new Date(stored.to)
  }
}

function parseDateRangeStored(stored:DateRange):DateRangeStored{
	return {
	  from: toYYYYMMDD(stored.from)
    ,to: toYYYYMMDD(stored.to)
  }
}

function toYYYYMMDD(date:Date) {
  return date.toISOString().split('T')[0]
}

export function stringToModel(str:string):Model{
  const fromStorage:Stored = JSON.parse(str)
  const {beds, plants, schedule} = fromStorage
  const model:Model = {
    beds
    ,plants
    ,schedule: schedule.map(scheduled=>{
      const {plantKey,bedKey,area,dateRange,presprout,sow,harvest,color} = scheduled
      // const plant = plants[plantKey]
      const scheduledPlant:ScheduledPlant = {
        plantKey,bedKey
        ,area
        ,dateRange: parseDateRange(dateRange)
        ,color
      }
      // bedKey&&(scheduledPlant.bed = beds[bedKey])
      presprout&&(scheduledPlant.presprout = parseDateRange(presprout))
      sow&&(scheduledPlant.sow = parseDateRange(sow))
      harvest&&(scheduledPlant.harvest = parseDateRange(harvest))
      return scheduledPlant
    })
  }
	return model
}

export function modelToString(model:Model):string {
  const {beds, plants, schedule} = model
  return JSON.stringify({
    beds
    ,plants
    ,schedule: schedule.map(scheduled=>{
      // const {plantKey,bedKey,area,dateRange,presprout,sow,harvest,color} = scheduled
      const {plantKey,bedKey,area,dateRange,presprout,sow,harvest,color} = scheduled
      // const plantKey = Object.entries(plants).filter(([,value])=>plant===value).pop()?.[0]||'-1'
      const scheduledPlant:ScheduledPlantStored = {
        plantKey,bedKey
        ,area
        ,dateRange: parseDateRangeStored(dateRange)
        ,color
      }
      // bed&&(scheduledPlant.bedKey = beds[bedKey])
      // bed&&(scheduledPlant.bedKey = Object.entries(beds).filter(([,value])=>bed===value).pop()?.[0]||'-1')
      presprout&&(scheduledPlant.presprout = parseDateRangeStored(presprout))
      sow&&(scheduledPlant.sow = parseDateRangeStored(sow))
      harvest&&(scheduledPlant.harvest = parseDateRangeStored(harvest))
      return scheduledPlant
    })
  })
}

export function bitwisenate(...args: string[]):{[key:string]:number} {
  return args.reduce((acc:{[key:string]:number},key:string,index:number)=>(acc[key] = 2**index, acc), {})
}
