import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from '../../svgkit/Icon'
import { normalize } from '../../../constants/global'

const ButtonGrad = ({
  onPress,
  text,
  code,
  color
}) => {
  const { container, touch, button } = styles
  return (
    <View style={container}>
      <TouchableOpacity
        style={touch}
        onPress={onPress}
      > 
        <View style={[button]}>

          <Icon name={code === 'all' ? 'all' : 'eat'} height="24" width="24" fill={color} />
        </View>
        <Text style={{ marginTop: 6, width: 100, textAlign: 'center', fontSize: normalize(14), lineHeight: normalize(16), color: `${color}`, opacity: 0.87, fontFamily: 'Roboto-Regular' }}>{text}</Text>
      </TouchableOpacity>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touch: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 100
  }
})

export { ButtonGrad }
