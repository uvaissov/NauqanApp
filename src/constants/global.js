import { Dimensions, Platform, PixelRatio } from 'react-native'

export const WHITE = '#fff'
export const BLACK = '#000'

export const BORDER_COLOR = '#ddd'
export const BG_COLOR = '#FAFAFA'
export const TRASPARENT = 'transparent'

export const MAIN_COLOR = '#4388D6'

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
