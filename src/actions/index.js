import {
  VISIBLE_SORT,
  VISIBLE_SUB_CATEGORY,
  CATEGORIES_FETCHED,
  CATEGORIES_FAILED,
  SUB_CATEGORIES_FETCHED,
  SUB_CATEGORIES_FAILED,
  PLACES_FETCHED,
  PLACES_FAILED
} from '../types'

import { hostName } from '../constants/global'

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
    const URL = `${hostName}/api/get_data.php?tb=cat`    
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

export const getSubCategories = (id) => async (dispatch) => {
  function onSuccess(success) {    
    dispatch({ type: SUB_CATEGORIES_FETCHED, payload: success })    
    return success
  }
  function onError(error) {
    dispatch({ type: SUB_CATEGORIES_FAILED, error })
    return error
  }
  try {
    dispatch({ type: SUB_CATEGORIES_FETCHED, payload: [] })
    const URL = `${hostName}/api/get_data.php?tb=sub_cat${id === 'all' ? '' : `&cat_id=${id}`}` 
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()      
    return onSuccess(success)
  } catch (error) {
    return onError(error)
  }
}

export const cleanSubCategories = () => {
  return {
    type: SUB_CATEGORIES_FETCHED,
    payload: []
  }
}

export const getPlacesByCatalog = (id) => async (dispatch) => {
  function onSuccess(success) {
    dispatch({ type: PLACES_FETCHED, payload: success })
    return success
  }
  function onError(error) {
    dispatch({ type: PLACES_FAILED, error })
    return error
  }
  try {
    dispatch({ type: PLACES_FETCHED, payload: [] })
    const URL = `${hostName}/api/get_data.php?tb=zav${id === 'all' ? '' : `&cat_id=${id}`}` 
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()      
    return onSuccess(success)
  } catch (error) {
    return onError(error)
  }
}

export const cleanPlaces = () => {
  return {
    type: PLACES_FETCHED,
    payload: []
  }
}
