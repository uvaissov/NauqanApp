import {
  ADD_CHANGE,
  EDIT_CHANGE,
  DEL_CHANGE,
  TIME_CHANGE
} from '../types'

const INITIAL_STATE = {
  categories: [
    { code: 'all', name: 'Все', mainColor: '#45A460', secondColor: '#A9D334'},
    { code: 'eat', name: 'Поесть', mainColor: '#FF662E', secondColor: '#FFA470'},
    { code: 'carservice', name: 'Автосервис', mainColor: '#AF634A', secondColor: '#DC927A'},
    { code: 'beautyhealth', name: 'Красота и здоровье', mainColor: '#E04381', secondColor: '#FF89F3'},
    { code: 'entertainment', name: 'Развлечения', mainColor: '#D22F2F', secondColor: '#FBE058'},
    { code: 'medicine', name: 'Медицина', mainColor: '#66D878', secondColor: '#4786FF'},
    { code: 'autogoods', name: 'Автотовары', mainColor: '#66D8D8', secondColor: '#439BCD'},
    { code: 'tourism', name: 'Туризм', mainColor: '#7E43E0', secondColor: '#E789FF'},
    { code: 'furniture', name: 'Мебель', mainColor: '#9B43E0', secondColor: '#FF89F3'},
    { code: 'product', name: 'Продукты', mainColor: '#8366D8', secondColor: '#4786FF'},
    { code: 'sport', name: 'Спорт', mainColor: '#BD9329', secondColor: '#27FFCB'},
    { code: 'education', name: 'Образование', mainColor: '#45A47C', secondColor: '#D33480'},
    { code: 'repair', name: 'Ремонт, стройка', mainColor: '#A44557', secondColor: '#6D28FF'},
    { code: 'b2b', name: 'B2B-услуги', mainColor: '#29BD41', secondColor: '#35CAEA'},
    { code: 'charity', name: 'Благотво рительность', mainColor: '#2976BD', secondColor: '#35B4EA'},
    { code: 'flowersgifts', name: 'Цветы и подарки', mainColor: '#FF2E86', secondColor: '#70D4FF'}
  ],
  mainCategory: ['eat', 'product', 'beautyhealth', 'charity', 'all']
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
