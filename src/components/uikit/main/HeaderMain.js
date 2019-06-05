import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native'
//import Autocomplete from 'react-native-autocomplete-input'
//import { ifIphoneX } from 'react-native-iphone-x-helper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '../../svgkit/Icon'

import { w, statusBarHeight } from '../../../constants/global'

class HeaderMain extends Component {
  state = {
    data: ['Test', 'Test1', 'Test2'],
    value: ''
  }
  
  render() {
    const { leftIcon, headerColor, onPress, style } = this.props
    const { viewStyle, containerStyle, textStyle, leftButtonStyle, rightButtonStyle } = styles
    //const { value, data } = this.state
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
        <View style={{ height: 150, width: w - 150, position: 'absolute', zIndex: 5, top: statusBarHeight + 45, left: 85, backgroundColor: 'white'}}>
          <Text>BLOCK</Text>
        </View>
      </View>
    )
  }
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

export default HeaderMain
