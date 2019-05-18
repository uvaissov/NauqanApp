import AsyncStorage from 'react-native'
import { FAVORITE_STORE } from '../constants/global'

class FavoriteService {
  places=[]
  items=[]
  constructor() {
    console.log('FavService init')
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(FAVORITE_STORE)
      if (value !== null) {
        console.log(value)
      } else {
        console.log('data is nil')
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  _storeData = async (strData) => {
    try {
      await AsyncStorage.setItem(FAVORITE_STORE, strData)
    } catch (error) {
      // Error saving data
    }
  };
}

export default FavoriteService
