import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
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
          <Ionicons name={leftIcon} style={[leftButtonStyle, { paddingLeft: 10 }]} color={leftColor} />
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
    position: 'relative',
    height: 90
  },
  textStyle: {
    paddingTop: 50,
    width: w - 60
  },
  leftButtonStyle: {
    paddingTop: 50,
    fontSize: 25
  }
})

export { Header }
