import {
  VISIBLE_SORT,
  VISIBLE_SUB_CATEGORY,
  CATEGORIES_FETCHED,
  CATEGORIES_FAILED
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

export const getCategories = () => async (dispatch) => {
  function onSuccess(success) {
    dispatch({ type: CATEGORIES_FETCHED, payload: success })
    return success
  }
  function onError(error) {
    dispatch({ type: CATEGORIES_FAILED, error })
    return error
  }
  try {
    const URL = 'http://nauqan.ibeacon.kz/api/get_data.php?tb=cat'
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()
    console.log(success)    
    return onSuccess(success)
  } catch (error) {
    return onError(error)
  }
}
