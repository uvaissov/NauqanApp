
import { SALE_FETCHED, SALE_FAILED } from '../types'

import { hostName } from '../constants/global'

export const getSale = (id) => async (dispatch) => {
  function onSuccess([value]) {
    dispatch({ type: SALE_FETCHED, payload: value })
    return value
  }
  function onError(error) {
    dispatch({ type: SALE_FAILED, error })
    return error
  }
  
  try {
    dispatch({ type: SALE_FETCHED, payload: {} })
    const URL = `${hostName}/product?id=${id}`
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()
    return onSuccess(success)
  } catch (error) {
    return onError(error)
  }  
}

