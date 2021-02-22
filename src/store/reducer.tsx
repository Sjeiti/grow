// export const action = {
//     SET_POSTS: Symbol('SET_POSTS')
//     ,ADD_POST: Symbol('ADD_POST')
//     ,REMOVE_POST: Symbol('REMOVE_POST')
//     ,SET_ERROR: Symbol('SET_ERROR')
// }

import {NAME} from '../config'
import {modelToString} from '../utils/utils'
import {Model} from '../model/Model'

export const Reducer = (state: Model, action: { payload: any, type: string }) => {
  switch (action.type) {

    case 'SAVE':
      localStorage.setItem(NAME, modelToString(state))
      return state

    case 'UPDATE_AREA':
      const {index, area} = action.payload
      // Object.assign(action.payload.plan.area, action.payload.area)
      const {plants,beds,schedule} = state
      return {
        plants
        ,beds
        ,schedule: schedule.map((plan,i)=>{
          if (i===index) {
            return {...plan, area}
          } else {
            return plan
          }
        })
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
