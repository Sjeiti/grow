import {useContext, useEffect} from 'react'
import {Context} from '../store'

export function Storage(){

  const [state, dispatch] = useContext(Context)
  console.log('Storage: state, dispatch',state, dispatch) // todo: remove log

  useEffect(()=>{
    const stored = localStorage.getItem('grow')
    console.log('stored',stored) // todo: remove log
    //
    // dispatch({type: 'ADD_POST', payload: {foo:23}})
    //
  }, [])

  return null // <span>{state.posts.length}</span>
}
