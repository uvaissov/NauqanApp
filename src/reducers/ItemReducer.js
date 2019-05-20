import {
  ITEM_FETCHED, ITEM_FAILED, ITEM_PLACES_FETCHED, ITEM_PLACES_FAILED
} from '../types'

const INITIAL_STATE = {
  item: {},
  items: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ITEM_FETCHED: {
    return {
      ...state,
      item: action.payload
    }
  }
  case ITEM_FAILED: {    
    return {
      ...state
    }
  }
  case ITEM_PLACES_FETCHED: {
    return {
      ...state,
      items: action.payload
    }
  }
  case ITEM_PLACES_FAILED: {
    return {
      ...state
    }
  }
  default: return state
  }
}
