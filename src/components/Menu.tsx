import {useContext, useEffect, useCallback} from 'react'
import {Context} from '../store'

export function Menu(){

  const [state, dispatch] = useContext(Context)

  const onClick = useCallback(()=>{
    dispatch({type: 'SAVE'})
    // dispatch({type: 'ADD_POST', payload: {foo:23}})
  }, [])

  return <menu><button {...{onClick}}>save</button></menu>
}
