import React, {createContext, FunctionComponent, useReducer} from 'react'
import {Reducer} from './reducer'
import {Model} from '../model/Model'
import {stringToModel} from '../utils/utils'
import def from './default.json'
import {NAME} from '../config'

const storedString = localStorage.getItem(NAME)||JSON.stringify(def)
const initialState:Model = stringToModel(storedString)

export const Context = createContext<any>(initialState)

export const Store: FunctionComponent = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
}
