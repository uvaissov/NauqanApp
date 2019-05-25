import { PROMO_1_FETCHED, PROMO_2_FETCHED, PROMO_FAILED } from '../types'

import { hostName } from '../constants/global'

export const getPromoDataFirst = () => async (dispatch) => {
  function onSuccess(value) {
    dispatch({ type: PROMO_1_FETCHED, payload: value })
    return value
  }
  function onError(error) {
    dispatch({ type: PROMO_FAILED, error })
    return error
  }
  
  try {
    const URL = `${hostName}/sl_zav`
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()
    return onSuccess(success)
  } catch (error) {
    return onError(error)
  }  
}

export const getPromoDataSecond = () => async (dispatch) => {
  function onSuccess(value) {
    dispatch({ type: PROMO_2_FETCHED, payload: value })
    return value
  }
  function onError(error) {
    dispatch({ type: PROMO_FAILED, error })
    return error
  }
  
  try {
    const URL = `${hostName}/sl_prod`
    const res = await fetch(URL, {
      method: 'GET'
    })
    const success = await res.json()
    return onSuccess(success)
  } catch (error) {
    return onError(error)
  }  
}

