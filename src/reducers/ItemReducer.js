import {
  ITEM_FETCHED, ITEM_FAILED, ITEM_PLACES_FETCHED, ITEM_PLACES_FAILED, SEARCH_PLACE_CHANGE, SELECT_DIR_ITEM
} from '../types'

const INITIAL_STATE = {
  item: {},
  items: [],
  text: '',
  dir: 'asc'
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
      ...state,
      items: []
    }
  }
  case SEARCH_PLACE_CHANGE: {
    return {
      ...state,
      text: action.payload
    }
  }  
  case SELECT_DIR_ITEM: {
    return {
      ...state,
      dir: action.payload
    }
  }  
  
  default: return state
  }
}
