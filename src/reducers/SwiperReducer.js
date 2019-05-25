import {
  PROMO_1_FETCHED, PROMO_2_FETCHED, PROMO_FAILED
} from '../types'

const INITIAL_STATE = {
  promo1: [],
  promo2: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PROMO_1_FETCHED: {
    return {
      ...state,
      promo1: action.payload
    }
  }
  case PROMO_2_FETCHED: {
    return {
      ...state,
      promo2: action.payload
    }
  }
  case PROMO_FAILED: {
    return {
      ...state
    }
  }
  default: return state
  }
}
