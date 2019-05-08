import { combineReducers } from 'redux'
import CatalogReducer from './CatalogReducer'

export default combineReducers({
  catalog: CatalogReducer
})
