import {
  VISIBLE_SORT,
  VISIBLE_SUB_CATEGORY
} from '../types'

//change timeout for round
export const _visibleSort = (value) => {
  return {
    type: VISIBLE_SORT,
    payload: value
  }
}

export const _visibleSubCategory = (value) => {
  return {
    type: VISIBLE_SUB_CATEGORY,
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
