import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '../../svgkit/Icon'
//import { w, h } from '../../../constants/global'

const ButtonGrad = ({
  onPress,
  text,
  code,
  mainColor,
  secondColor
}) => {
  const { container, touch, button } = styles
  return (
    <TouchableOpacity  
      style={container}   
      onPress={onPress}
    > 
      <View style={touch}>
        <LinearGradient style={[button]} colors={[mainColor.trim(), secondColor.trim()]} useAngle angle={135}>
          <Icon name={code === 'all' ? 'all' : 'eat'} height="18" width="18" fill="#fff" />
        </LinearGradient>
        <Text style={{ marginTop: 6, width: 70, textAlign: 'center', fontSize: 10, lineHeight: 12, color: '#170701', opacity: 0.87, fontFamily: 'Roboto-Regular' }}>{text}</Text>
      </View>
    </TouchableOpacity>    
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  button: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA470',
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,    
    elevation: 4
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export { ButtonGrad }
