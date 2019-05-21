
import { ITEM_FETCHED, ITEM_FAILED, ITEM_PLACES_FETCHED, ITEM_PLACES_FAILED } from '../types'

import { hostName } from '../constants/global'

export const getZav = (id) => async (dispatch) => {
  function onSuccess([value]) {
    dispatch({ type: ITEM_FETCHED, payload: value })
    return value
  }
  function onError(error) {
    dispatch({ type: ITEM_FAILED, error })
    return error
  }
  
  try {
    dispatch({ type: ITEM_FETCHED, payload: {} })
    const URL = `${hostName}/zavedeniya?id=${id}`
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()
    return onSuccess(success)
  } catch (error) {
    return onError(error)
  }  
}

export const cleanZav = () => {
  return {
    type: ITEM_FETCHED,
    payload: {}
  }
}

export const getPlacesByZav = (id) => async (dispatch) => {
  function onSuccess(value) {
    dispatch({ type: ITEM_PLACES_FETCHED, payload: value })
    return value
  }
  function onError(error) {
    dispatch({ type: ITEM_PLACES_FAILED, error })
    return error
  }
    
  try {
    dispatch({ type: ITEM_PLACES_FETCHED, payload: [] })
    const URL = `${hostName}//product?zav_id=${id}`
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()
    return onSuccess(success)
  } catch (error) {
    return onError(error)
  }  
}
