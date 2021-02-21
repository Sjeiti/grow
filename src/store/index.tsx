import React, {createContext, FunctionComponent, useReducer} from 'react'
import {Reducer} from './reducer'

const initialState:any = {
    beds: [{
      x: 10,
      y: 0,
      w: 330,
      h: 480
    },{
      x: 300,
      y: 0,
      w: 220,
      h: 320
    }],
    plants: [
        { name: 'Carrot', size: 11 },
        { name: 'Blueberry', size: 33 },
        { name: 'Cannabis' },
        { name: 'Graan' }
    ],
    schedule: [
        {
            plantIndex: 0,
            bedIndex: 0,
            // plant: { name: 'Carrot', size: 11 },
            // bed,
            area: {x:0,y:0,w:100,h:100},
            dateRange: {from:new Date('0000-01-01'),to:new Date('0000-03-01')},
            color: '#c61'
        }
    ],
    posts: []
}

export const Context = createContext(initialState)

export const Store: FunctionComponent = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    console.log('{state, dispatch}', {state, dispatch}) // todo: remove log
    return <Context.Provider value={[state, dispatch]}>
        {children}
    </Context.Provider>
}
