
import { ITEM_FETCHED, ITEM_FAILED, ITEM_PLACES_FETCHED, ITEM_PLACES_FAILED, SEARCH_PLACE_CHANGE, SELECT_DIR_ITEM, SELECT_HORIZONTAL_ITEM } from '../types'

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

export const selectDirItem = (dir) => {
  return {
    type: SELECT_DIR_ITEM,
    payload: dir
  }
}

export const selectHorizontalItem = (value) => {
  return {
    type: SELECT_HORIZONTAL_ITEM,
    payload: value
  }
}

export const getPlacesByZav = (id, text, dir) => async (dispatch) => {
  function onSuccess(value) {
    dispatch({ type: ITEM_PLACES_FETCHED, payload: value })
    return value
  }
  function onError(error) {
    dispatch({ type: ITEM_PLACES_FAILED, error })
    return error
  }
    
  try {
    dispatch({ type: SEARCH_PLACE_CHANGE, payload: text })

    const textSearch = !text ? '' : `&text=${text}`
    const dirSearch = !dir ? '' : `&filt_type=price&filt=${dir}`
    const URL = `${hostName}/product?zav_id=${id}${textSearch}${dirSearch}`
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()
    return onSuccess(success)
  } catch (error) {
    return onError(error)
  }  
}
