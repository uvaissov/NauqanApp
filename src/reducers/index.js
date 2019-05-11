import { combineReducers } from 'redux'
import CatalogReducer from './CatalogReducer'
import ItemReducer from './ItemReducer'

export default combineReducers({
  catalog: CatalogReducer,
  item: ItemReducer
})
