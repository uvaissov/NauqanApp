import {
  LEVEL_CHANGE
} from '../types'

//change timeout for round
export const changeLevel = (value) => {
  return {
    type: LEVEL_CHANGE,
    payload: value
  }
}

// export const getMovies = (text) => async (dispatch) => {
//   function onSuccess(success) {
//     dispatch({ type: MOVIES_FETCHED, payload: success })
//     return success
//   }
//   function onError(error) {
//     dispatch({ type: MOVIES_FAILED, error })
//     return error
//   }
//   try {
//     const URL = `https://api.tvmaze.com/search/shows?q=${text}`
//     const res = await fetch(URL, {
//       method: 'GET'
//     })
//     const success = await res.json()
//     return onSuccess(success)
//   } catch (error) {
//     return onError(error)
//   }
// }
