export const action = {
    SAVE: Symbol('SAVE')
    ,UPDATE_AREA: Symbol('UPDATE_AREA')
    ,UPDATE_PLAN: Symbol('UPDATE_PLAN')
    // ,REMOVE_POST: Symbol('REMOVE_POST')
    // ,SET_ERROR: SUPDATE_AREAymbol('SET_ERROR')
}
const {SAVE, UPDATE_AREA, UPDATE_PLAN} = action

import {NAME} from '../config'
import {modelToString} from '../utils/utils'
import {Model} from '../model/Model'
import {ScheduledPlant} from '../model/ScheduledPlant'

export const Reducer = (state: Model, action: { payload: any, type: symbol, plan: ScheduledPlant }) => {

  switch (action.type) {

    case SAVE:{
      localStorage.setItem(NAME, modelToString(state))
      return state
    }
    case UPDATE_AREA: {
      const {area, plan} = action.payload
      const {plants,beds,schedule} = state
      return {
        plants
        ,beds
        ,schedule: schedule.map(schedulePlan=>schedulePlan===plan?{...schedulePlan, area}:schedulePlan)
      }
    }
    case UPDATE_PLAN: {
      const {dateRange, plan} = action.payload
      const {plants,beds,schedule} = state
      return {
        plants
        ,beds
        ,schedule: schedule.map(schedulePlan=>schedulePlan===plan?{...schedulePlan, dateRange}:schedulePlan)
      }
    }
    // case 'SET_POSTS': // action.SET_POSTS:
    //   return {
    //     ...state,
    //     posts: action.payload
    //   }
    // case 'ADD_POST': // action.ADD_POST:
    //   return {
    //     ...state,
    //     posts: state.posts.concat(action.payload)
    //   }
    // case 'REMOVE_POST': // action.REMOVE_POST:
    //   return {
    //     ...state,
    //     posts: state.posts.filter((post: any) => post.id !== action.payload)
    //   }
    // case 'SET_ERROR': // action.SET_ERROR:
    //   return {
    //     ...state,
    //     error: action.payload
    //   }
    default:
      return state
  }
}
