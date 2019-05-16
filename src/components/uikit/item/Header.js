import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { w } from '../../../constants/global'

const Header = ({
  leftIcon,
  leftColor,
  headerColor,
  onPress,
  style,
  iconFunnel,
  iconSearch
}) => {
  const { viewStyle, leftButtonStyle } = styles
  return (
    <View style={[viewStyle, style, {backgroundColor: headerColor }]}>
      {leftIcon &&
        <TouchableOpacity onPress={onPress}>
          <Ionicons name={leftIcon} style={[leftButtonStyle, { paddingLeft: 15 }]} color={leftColor} />
        </TouchableOpacity>
      }
      <View style={{ flex: 1}} />
      {
        iconFunnel &&
        <Ionicons
          name='md-funnel'
          size={24}
          color='white'
          style={[leftButtonStyle, {marginRight: 10 }]}
        />
      }
      {
        iconSearch &&
        <Ionicons
          name='md-search'
          size={24}
          color='white'
          style={[leftButtonStyle, {marginRight: 10 }]}
        />
      }        
     
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingBottom: 15,
    position: 'relative',
    ...ifIphoneX({
      height: 90
    }, {
      height: 70
    })
  },
  textStyle: {
    width: w - 60
  },
  leftButtonStyle: {
    fontSize: 25
  }
})

export { Header }
