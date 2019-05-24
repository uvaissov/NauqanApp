import AsyncStorage from 'react-native'
import { CITY_FETCHED, CITY_FAILED, CITY_SELECT } from '../types'

import { hostName, CITY_STORE } from '../constants/global'

export const getCityies = () => async (dispatch) => {
  function onSuccess([value]) {
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
    const value = await AsyncStorage.getItem(CITY_STORE)
    if (value !== null) {
      return onSuccess(JSON.parse(value))      
    }
    return value
  } catch (error) {
    return onError(error)
  }  
}

