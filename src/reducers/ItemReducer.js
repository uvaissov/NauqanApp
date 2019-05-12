import {
  ADD_CHANGE,
  EDIT_CHANGE,
  DEL_CHANGE,
  TIME_CHANGE
} from '../types'

const INITIAL_STATE = {
  items: [
    { key: 'a', title: 'Суп с фрикадельками', date: '22.03.2019', price: { before: 150, after: 142 }, source: require('../../resources/demo/soup.png')},
    { key: 'b', title: 'Суп с фрикадельками', date: '22.03.2019', price: { before: 150, after: 142 }, source: require('../../resources/demo/magnum.png')},
    { key: 'c', title: 'Суп с фрикадельками', date: '22.03.2019', price: { before: 150, after: 142 }, source: require('../../resources/demo/foxtrot.png')},
    { key: 'd', title: 'Суп с фрикадельками', date: '22.03.2019', price: { before: 150, after: 142 }, source: require('../../resources/demo/soup.png')},
    { key: 'f', title: 'Суп с фрикадельками', date: '22.03.2019', price: { before: 150, after: 142 }, source: require('../../resources/demo/soup.png')}   
  ]
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
