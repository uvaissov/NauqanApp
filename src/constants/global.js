import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

export const hostName = 'http://nauqan.ibeacon.kz'
export const FAVORITE_STORE = '@MyLocalStore:favoriteList'
export const CITY_STORE = '@MyLocalStore:city'
export const WHITE = '#fff'
export const BLACK = '#000'

export const statusBarHeight = Platform.OS === 'ios' ? isIphoneX() ? 30 : 20 : StatusBar.currentHeight

export const BORDER_COLOR = '#ddd'
export const BG_COLOR = '#FAFAFA'
export const TRASPARENT = 'transparent'

export const MAIN_COLOR = '#4388D6'

export const ITEM = 'ITEM'
export const SALE = 'SALE'

export const win = Dimensions.get('window')
export const w = win.width
export const h = win.height
export const responsive = {
  mobile5: w > 315 && w < 341,
  mobile8: w > 342 && w < 375,
  mobile8plus: w > 375 && w < 415,
  tablet: w < 990 && w > 415
}

const scale = w / 320

export function genImageUri(path) {
  return `${hostName}/storage/${path}`
}

export function normalize(size) {
  const newSize = size * scale
  let result
  if (Platform.OS === 'ios') {
    result = Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    result = Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
  return result
}
