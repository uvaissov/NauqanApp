import AsyncStorage from '@react-native-community/async-storage'
import { FAV_PLACE_FETCHED, FAV_PLACE_FAILED, SELECT_HORIZONTAL_FAVORITE } from '../types'

import { FAVORITE_STORE } from '../constants/global'

export const initFavorites = () => async (dispatch) => {
  function onSuccess(value) {
    dispatch({ type: FAV_PLACE_FETCHED, payload: value })
    return value
  }
  function onError(error) {
    dispatch({ type: FAV_PLACE_FAILED, error })
    return error
  }
  
  try {    
    const value = await AsyncStorage.getItem(FAVORITE_STORE)
    if (value !== null) {
      //AsyncStorage.clear()
      return onSuccess(JSON.parse(value))      
    }
    return value
  } catch (error) {
    return onError(error)
  }  
}

export const addFavoritePlace = (id, type, name) => async (dispatch, getState) => {
  function onSuccess(data) {
    dispatch({ type: FAV_PLACE_FETCHED, payload: data })
    return data
  }
  function onError(error) {
    dispatch({ type: FAV_PLACE_FAILED, error })
    return error
  }      
  try {
    const data = [...getState().favorite.places, { id, type, name }]
    await AsyncStorage.setItem(FAVORITE_STORE, JSON.stringify(data))
    return onSuccess(data)
  } catch (error) {
    return onError(error)
  }
}

export const delFavoritePlace = (idParam, typeParam) => async (dispatch, getState) => {
  function onSuccess(data) {
    dispatch({ type: FAV_PLACE_FETCHED, payload: data })
    return data
  }
  function onError(error) {
    dispatch({ type: FAV_PLACE_FAILED, error })
    return error
  }      
  try {
    const index = getState().favorite.places.findIndex(({ id, type }) => id === idParam && type === typeParam)
    const data = [...getState().favorite.places.slice(0, index),
      ...getState().favorite.places.slice(index + 1)]
    await AsyncStorage.setItem(FAVORITE_STORE, JSON.stringify(data))
    return onSuccess(data)
  } catch (error) {
    return onError(error)
  }  
}

export const selectHorizontalItem = (value) => {
  return {
    type: SELECT_HORIZONTAL_FAVORITE,
    payload: value
  }
}
