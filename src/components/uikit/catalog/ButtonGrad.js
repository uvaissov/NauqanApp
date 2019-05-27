import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from '../../svgkit/Icon'
import { normalize, genImageUri } from '../../../constants/global'

const ButtonGrad = ({
  onPress,
  text,
  code,
  color,
  selected,
  cat
}) => {
  const { container, touch, button } = styles
  return (
    <View style={container}>
      <TouchableOpacity
        style={touch}
        onPress={onPress}
      > 
        
        <View style={[button]}>
          {
            !cat.disableIcon && 
            <Icon name={code === 'all' ? 'all' : 'eat'} height="24" width="24" fill={color} />
          }
          {
            cat.disableIcon && 
            <Image style={{height: 24, width: 24}} source={{uri: genImageUri(selected ? cat.enableIcon : cat.disableIcon)}} resizeMode="contain" />
          }
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
