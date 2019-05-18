import {
  FAV_PLACE_FETCHED,
  FAV_PLACE_FAILED
} from '../types'
  
const INITIAL_STATE = {
  places: [], 
  items: []
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
  default: return state
  }
}
