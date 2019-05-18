import AsyncStorage from '@react-native-community/async-storage'
import { FAV_PLACE_FETCHED, FAV_PLACE_FAILED } from '../types'

import { FAVORITE_STORE } from '../constants/global'

export const initFavorites = () => async (dispatch) => {
  function onSuccess(value) {
    let data = []
    value.map((row) => {
      data = [...data, row.item]
      return row
    })
    dispatch({ type: FAV_PLACE_FETCHED, payload: data })
    return value
  }
  function onError(error) {
    dispatch({ type: FAV_PLACE_FAILED, error })
    return error
  }
  
  try {
    //AsyncStorage.clear()
    const value = await AsyncStorage.getItem(FAVORITE_STORE)
    if (value !== null) {
      return onSuccess(JSON.parse(value))
    }
    return value
  } catch (error) {
    return onError(error)
  }  
}

export const addFavoritePlace = (id) => async (dispatch, getState) => {
  function onSuccess(data) {
    dispatch({ type: FAV_PLACE_FETCHED, payload: data })
    return data
  }
  function onError(error) {
    dispatch({ type: FAV_PLACE_FAILED, error })
    return error
  }      
  try {
    const data = [...getState().favorite.places, id]
    await AsyncStorage.setItem(FAVORITE_STORE, JSON.stringify(data))
    return onSuccess(data)
  } catch (error) {
    return onError(error)
  }
}

export const delFavoritePlace = (idParam) => async (dispatch, getState) => {
  function onSuccess(data) {
    dispatch({ type: FAV_PLACE_FETCHED, payload: data })
    return data
  }
  function onError(error) {
    dispatch({ type: FAV_PLACE_FAILED, error })
    return error
  }      
  try {
    const index = getState().favorite.places.findIndex((id) => id === idParam)
    const data = [...getState().favorite.places.slice(0, index),
      ...getState().favorite.places.slice(index + 1)]
    await AsyncStorage.setItem(FAVORITE_STORE, JSON.stringify(data))
    return onSuccess(data)
  } catch (error) {
    return onError(error)
  }  
}
