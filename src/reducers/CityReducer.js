import {
  CITY_FETCHED, CITY_FAILED, CITY_SELECT
} from '../types'

const INITIAL_STATE = {
  items: [],
  selected: null,
  name: 'Выберите город'
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
  default: return state
  }
}
