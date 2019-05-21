import { combineReducers } from 'redux'
import CatalogReducer from './CatalogReducer'
import ItemReducer from './ItemReducer'
import FavoriteReducer from './FavoriteReducer'
import SaleReducer from './SaleReducer'

export default combineReducers({
  catalog: CatalogReducer,
  item: ItemReducer,
  favorite: FavoriteReducer,
  sale: SaleReducer
})
