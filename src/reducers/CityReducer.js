import {
  CITY_FETCHED, CITY_FAILED, CITY_SELECT, NOTIFY_SELECT
} from '../types'

const INITIAL_STATE = {
  items: [],
  selected: null,
  name: 'Выберите город',
  notifyUse: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CITY_FETCHED: {
    return {
      ...state,
      items: action.payload
    }
  }
  case CITY_FAILED: {
    return {
      ...state
    }
  }
  case CITY_SELECT: {
    return {
      ...state,
      selected: action.payload
    }
  }
  case NOTIFY_SELECT: {
    return {
      ...state,
      notifyUse: action.payload
    }
  }  
  default: return state
  }
}
