import {
  SALE_FETCHED, SALE_FAILED
} from '../types'

const INITIAL_STATE = {
  item: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SALE_FETCHED: {
    return {
      ...state,
      item: action.payload
    }
  }
  case SALE_FAILED: {    
    return {
      ...state
    }
  }
  default: return state
  }
}
