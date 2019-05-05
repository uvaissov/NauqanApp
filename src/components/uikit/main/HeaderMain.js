import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import { w } from '../../../constants/global'

const HeaderMain = ({
  leftIcon,
  leftColor,
  headerColor,
  onPress,
  style
}) => {
  const { viewStyle, textStyle, leftButtonStyle } = styles
  return (
    <View style={[viewStyle, style, {backgroundColor: headerColor }]}>
      {leftIcon &&
        <TouchableOpacity onPress={onPress}>
          <Ionicons name={leftIcon} style={[leftButtonStyle, { paddingLeft: 10 }]} color={leftColor} />
        </TouchableOpacity>
      }
      <Input
        placeholder='Поиск'
        containerStyle={textStyle}
        rightIcon={
          <Icon
            name='search'
            size={24}
            color='grey'
          />
        }
      />
     
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
    fontSize: 35
  },
  rightButtonStyle: {
    paddingTop: 55,
    fontSize: 30
  }
})

export { HeaderMain }
