// export const action = {
//     SET_POSTS: Symbol('SET_POSTS')
//     ,ADD_POST: Symbol('ADD_POST')
//     ,REMOVE_POST: Symbol('REMOVE_POST')
//     ,SET_ERROR: Symbol('SET_ERROR')
// }

export const Reducer = (state:any, action:{payload:any,type:string}) => {
  switch (action.type) {
      case 'SET_POSTS': // action.SET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
      case 'ADD_POST': // action.ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.payload)
      }
      case 'REMOVE_POST': // action.REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((post:any) => post.id !== action.payload)
      }
      case 'SET_ERROR': // action.SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
