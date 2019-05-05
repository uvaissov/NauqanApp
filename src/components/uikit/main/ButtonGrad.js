import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
//import { w, h } from '../../../constants/global'

const ButtonGrad = ({
  onPress,
  text,
  iconName,
  mainColor,
  secondColor
}) => {
  const { container, touch, button, icon } = styles
  return (
    <View style={container}>
      <TouchableOpacity
        style={touch}
        onPress={onPress}
      > 
        <LinearGradient style={[button]} colors={[mainColor, secondColor]} useAngle angle={135}>
          <Ionicons name={iconName} style={[icon]} size={24} color={'#fff'} />
        </LinearGradient>
        <Text style={{ marginTop: 6, width: 70, textAlign: 'center', fontSize: 10, lineHeight: 12, color: '#170701', opacity: 0.87, fontFamily: 'Roboto-Regular' }}>{text}</Text>
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
    alignItems: 'center',
    backgroundColor: '#FFA470',
    borderRadius: 20,
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
