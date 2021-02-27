import {useContext, useCallback} from 'react'
import {Context} from '../store'
import {action} from '../store/reducer'

export function Menu(){

  const [,dispatch] = useContext(Context)

  const onClick = useCallback(()=>{
    dispatch({type: action.SAVE})
  }, [])

  return <menu><button {...{onClick}}>save</button></menu>
}
