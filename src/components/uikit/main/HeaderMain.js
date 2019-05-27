import React from 'react'
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
//import { ifIphoneX } from 'react-native-iphone-x-helper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '../../svgkit/Icon'

//import { w } from '../../../constants/global'

const HeaderMain = ({
  leftIcon,
  headerColor,
  onPress,
  style
}) => {
  const { viewStyle, containerStyle, textStyle, leftButtonStyle, rightButtonStyle } = styles
  return (
    <View style={[viewStyle, style, {backgroundColor: headerColor }]}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.8]}
        useAngle
        angle={180}
        style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', paddingHorizontal: 20, paddingBottom: 30}}
      >
        {leftIcon &&
        <TouchableOpacity onPress={onPress}>          
          <Icon name="menu" height="20" width="20" fill="#fff" style={leftButtonStyle} />
        </TouchableOpacity>
        }
        <View style={containerStyle} >
          <TextInput
            placeholder='Поиск'
            style={textStyle}
            placeholderTextColor="white"
          />
          <Ionicons name="md-search" style={[rightButtonStyle]} color="white" />        
        </View>
      </LinearGradient>  
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'flex-start',    
    position: 'relative',
    height: 100,
    alignItems: 'flex-end'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    marginLeft: 25,
    color: '#fff'
  },
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 40,
    alignItems: 'center',
    borderRadius: 33,
    marginLeft: 15
  },
  leftButtonStyle: {
    marginBottom: 10
  },
  rightButtonStyle: {
    fontSize: 30,
    marginRight: 15
  }
})

export { HeaderMain }
