import {
  VISIBLE_SORT,
  VISIBLE_SUB_CATEGORY,
  VISIBLE_SEARCH_RESULT,
  CATEGORIES_FETCHED,
  CATEGORIES_FAILED,
  SUB_CATEGORIES_FETCHED,
  SUB_CATEGORIES_FAILED,
  PLACES_FETCHED,
  PLACES_FAILED,  
  TOP_PLACES_FETCHED,
  TOP_PLACES_FAILED,
  SEARCH_FETCHED,
  SEARCH_FAILED,
  SELECT_DIR_CATALOG,
  SELECT_SUB_CATALOG,
  SEARCH_TEXT_CHANGE
} from '../types'

const INITIAL_STATE = {
  categories: [],
  sub_categories: [],
  places: [],
  mainCategory: [],
  topPlaces: [],
  searchResults: [],
  visibleSort: false,
  visibleSubCategory: false,
  visibleSearchResult: false,
  text: '',
  loading: true,
  error: undefined,
  dir: 'asc',
  selectedSubCat: undefined
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
  case SEARCH_TEXT_CHANGE: {    
    return {
      ...state,
      text: action.payload
    }
  }
  case VISIBLE_SUB_CATEGORY: {    
    return {
      ...state,
      visibleSubCategory: action.payload
    }
  }
  case VISIBLE_SEARCH_RESULT: {    
    return {
      ...state,
      visibleSearchResult: action.payload,
      searchResults: []
    }
  }
  case CATEGORIES_FETCHED: { 
    let glav = [...action.payload.filter((row) => row.glav === 1).map(({id}) => id), 'all']
    if (glav.length > 5) {
      glav = [...glav.slice(0, 3), 'all']
    }
    return {
      ...state,
      categories: [
        { id: 'all', mainColor: '#45A460', secondaryColor: '#A9D334', name: 'Все' }, //добавим еще категорию все
        ...action.payload        
      ],
      mainCategory: glav,
      loading: false
    }
  }
  case CATEGORIES_FAILED: {    
    return {
      ...state,
      error: action.error
    }
  }
  case TOP_PLACES_FETCHED: {    
    return {
      ...state,
      topPlaces: action.payload
    }
  }
  case TOP_PLACES_FAILED: {    
    return {
      ...state
    }
  }
  case SEARCH_FETCHED: {    
    return {
      ...state,
      searchResults: action.payload
    }
  }
  case SEARCH_FAILED: {    
    return {
      ...state
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
      ...state,
      places: []
    }
  }
  case SELECT_DIR_CATALOG: {    
    return {
      ...state,
      dir: action.payload
    }
  }
  case SELECT_SUB_CATALOG: {    
    return {
      ...state,
      selectedSubCat: action.payload
    }
  }
  
  default: return state
  }
}
