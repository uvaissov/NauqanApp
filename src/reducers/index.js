import { combineReducers } from 'redux'
import CatalogReducer from './CatalogReducer'
import ItemReducer from './ItemReducer'
import FavoriteReducer from './FavoriteReducer'

export default combineReducers({
  catalog: CatalogReducer,
  item: ItemReducer,
  favorite: FavoriteReducer
})
