import {
  VISIBLE_SORT,
  VISIBLE_SUB_CATEGORY,
  VISIBLE_SEARCH_RESULT,
  CATEGORIES_FETCHED,
  CATEGORIES_FAILED,
  SUB_CATEGORIES_FETCHED,
  SUB_CATEGORIES_FAILED,
  PLACES_FETCHED,
  PLACES_FAILED,
  TOP_PLACES_FETCHED,
  TOP_PLACES_FAILED,
  SEARCH_FETCHED,
  SEARCH_FAILED,
  SELECT_DIR_CATALOG,
  SELECT_SUB_CATALOG,
  SEARCH_TEXT_CHANGE
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

export const _visibleSearchResult = (value) => {
  return {
    type: VISIBLE_SEARCH_RESULT,
    payload: value
  }
}

export const _onSelectDir = (value) => {
  return {
    type: SELECT_DIR_CATALOG,
    payload: value
  }
}

export const onSelectSubCat = (value) => {
  return {
    type: SELECT_SUB_CATALOG,
    payload: value
  }
}

export const searchByCatalog = (text, cat_id) => async (dispatch) => {
  function onSuccess(success) {
    dispatch({ type: SEARCH_FETCHED, payload: success })
    return success
  }
  function onError(error) {
    dispatch({ type: SEARCH_FAILED, error })
    return error
  }
  try {    
    const URL = `${hostName}/search?text=${text}&cat_id=${cat_id}`    
    const res = await fetch(URL, {
      method: 'GET'
    })
    console.log(res)
    const success = await res.json()
    return onSuccess(success)
  } catch (error) {
    return onError(error)
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
    const URL = `${hostName}/category`    
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()
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
    const URL = `${hostName}/sub_category${id === 'all' ? '' : `?cat_id=${id}`}` 
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
export const searchTextChange = (text) => {
  return { type: SEARCH_TEXT_CHANGE, payload: text }
}

export const getPlacesByCatalog = (id, dir, sub_id, text) => async (dispatch, getState) => {
  function onSuccess(success) {
    dispatch({ type: PLACES_FETCHED, payload: success })
    return success
  }
  function onError(error) {
    dispatch({ type: PLACES_FAILED, error })
    return error
  }
  try {
    //dispatch({ type: SEARCH_TEXT_CHANGE, payload: text }) 
    if (!sub_id) {
      dispatch({ type: SELECT_SUB_CATALOG, payload: undefined }) 
    }
    const cat_id = id === 'all' ? '' : `&cat_id=${id}`
    const sub_cat_id = !sub_id ? '' : `&sub_cat_id=${sub_id}`
    const textSearch = !text ? '' : `&text=${text}`
    const cityId = getState().city.selected ? `&city_id=${getState().city.selected}` : ''

    const URL = `${hostName}/zavedeniya?filt=${dir}${cityId}${cat_id}${sub_cat_id}${textSearch}`
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

export const getPlacesTop = () => async (dispatch, getState) => {
  function onSuccess(success) {
    dispatch({ type: TOP_PLACES_FETCHED, payload: success })
    return success
  }
  function onError(error) {
    dispatch({ type: TOP_PLACES_FAILED, error })
    return error
  }
  try {
    const cityId = getState().city.selected ? `&city_id=${getState().city.selected}` : ''
    const URL = `${hostName}/zavedeniya?v_tope=1${cityId}`
    console.log(URL)
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()      
    return onSuccess(success)
  } catch (error) {
    return onError(error)
  }
}