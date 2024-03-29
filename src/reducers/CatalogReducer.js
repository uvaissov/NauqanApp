import {
  VISIBLE_SORT,
  VISIBLE_SUB_CATEGORY,
  CATEGORIES_FETCHED,
  CATEGORIES_FAILED,
  SUB_CATEGORIES_FETCHED,
  SUB_CATEGORIES_FAILED,
  PLACES_FETCHED,
  PLACES_FAILED
} from '../types'

const INITIAL_STATE = {
  categories: [],
  sub_categories: [],
  places: [],
  mainCategory: ['1', '2', '3', '4', 'all'],
  visibleSort: false,
  visibleSubCategory: false,
  loading: true,
  error: undefined
}

export default (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {  
  case VISIBLE_SORT: {    
    return {
      ...state,
      visibleSort: action.payload
    }
  }
  case VISIBLE_SUB_CATEGORY: {    
    return {
      ...state,
      visibleSubCategory: action.payload
    }
  }
  case CATEGORIES_FETCHED: {    
    return {
      ...state,
      categories: [
        { id: 'all', mainColor: '#45A460', secondaryColor: '#A9D334', name: 'Все' }, //добавим еще категорию все
        ...action.payload        
      ],
      loading: false
    }
  }
  case CATEGORIES_FAILED: {    
    return {
      ...state,
      error: action.error
    }
  }
  case SUB_CATEGORIES_FETCHED: {    
    return {
      ...state,
      sub_categories: action.payload
    }
  }
  case SUB_CATEGORIES_FAILED: {    
    return {
      ...state
    }
  } 
  case PLACES_FETCHED: {    
    return {
      ...state,
      places: action.payload
    }
  }
  case PLACES_FAILED: {    
    return {
      ...state
    }
  }  
  default: return state
  }
}
