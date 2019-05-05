import {
  ADD_CHANGE,
  EDIT_CHANGE,
  DEL_CHANGE,
  TIME_CHANGE
} from '../types'

const INITIAL_STATE = {
  select_index: 0,
  init_id: 2,
  roundTime: 60,
  commands: [{ id: '0', name: 'Команда 1'}, {id: '1', name: 'Команда 2'}]
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CHANGE: {
    return {
      ...state,
      commands: [
        ...state.commands,
        action.payload
      ],
      init_id: state.init_id + 1
    }
  }
  case EDIT_CHANGE: {
    const index = state.commands.findIndex(({id}) => id === action.id)
    const item = state.commands[index]
    const newItem = {
      ...item,
      name: action.payload.name
    }
    return {
      ...state,
      commands: [
        ...state.commands.slice(0, index),
        newItem,
        ...state.commands.slice(index + 1)
      ]
    }
  }
  case DEL_CHANGE: {
    const index = state.commands.findIndex(({id}) => id === action.payload)
    return {
      ...state,
      commands: [
        ...state.commands.slice(0, index),
        ...state.commands.slice(index + 1)
      ],
      select_index: 0
    }
  }
  case TIME_CHANGE: {
    return {
      ...state,
      roundTime: action.payload
    }
  }
  default: return state
  }
}
