import {
  FAV_PLACE_FETCHED,
  FAV_PLACE_FAILED,
  SELECT_HORIZONTAL_FAVORITE
} from '../types'
  
const INITIAL_STATE = {
  places: [], 
  items: [],
  horizontal: false
}
  
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FAV_PLACE_FETCHED: {
    return {
      ...state,
      places: action.payload
    }
  }
  case FAV_PLACE_FAILED: {
    return {
      ...state      
    }
  }
  case SELECT_HORIZONTAL_FAVORITE: {
    return {
      ...state,
      horizontal: action.payload
    } 
  }
  default: return state
  }
}
