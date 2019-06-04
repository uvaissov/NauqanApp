import AsyncStorage from '@react-native-community/async-storage'
import { CITY_FETCHED, CITY_FAILED, CITY_SELECT, NOTIFY_SELECT } from '../types'

import { hostName, CITY_STORE, NOTIFY_USE_STORE } from '../constants/global'

export const getCities = () => async (dispatch) => {
  function onSuccess(value) {
    dispatch({ type: CITY_FETCHED, payload: value })
    return value
  }
  function onError(error) {
    dispatch({ type: CITY_FAILED, error })
    return error
  }
  
  try {
    const URL = `${hostName}/city`
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()
    return onSuccess(success)
  } catch (error) {
    return onError(error)
  }  
}

export const initCity = () => async (dispatch) => {
  function onSuccess(value) {
    dispatch({ type: CITY_SELECT, payload: value })
    return value
  }
  function onError(error) {
    dispatch({ type: CITY_FAILED, error })
    return error
  }
  
  try {
    const value = await AsyncStorage.getItem(CITY_STORE) || '2'
    //notify
    const notifyUse = await AsyncStorage.getItem(NOTIFY_USE_STORE) || 'true'
    dispatch({ type: NOTIFY_SELECT, payload: JSON.parse(notifyUse) })
    if (value !== null) {
      return onSuccess(parseInt(value, 10))
    }
    return value
  } catch (error) {
    return onError(error)
  }  
}

export const selectCity = (value) => {
  AsyncStorage.setItem(CITY_STORE, value.toString())
  return {
    type: CITY_SELECT,
    payload: value
  }
}

export const notifySelect = (value) => {
  AsyncStorage.setItem(NOTIFY_USE_STORE, value.toString())
  return {
    type: NOTIFY_SELECT,
    payload: value
  }
}

