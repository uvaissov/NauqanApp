import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from '../../svgkit/Icon'
import { ModalSort } from '../catalog/ModalSort'

const Header = ({
  leftIcon,
  mainColor,
  secondColor,
  onPress,
  style,
  title,
  sortPress,
  searchPress,
  visibleSort,
  searchText,
  showSearch,
  searchByText
}) => {
  const { headerGradView, viewStyle, textStyle, leftButtonStyle, rightButtonStyle, inputStyle } = styles  
  /*
  searchText={this.state.searchText}
          showSearch={this.state.showSearch}
          searchPress={(value) => this.setState({showSearch: value})} 
  */
  this.show = (value) => {
    sortPress(value)
  }
  this.search = (value) => {
    searchByText(value)  
  }
  return (
    <View style={viewStyle}>
      
      <LinearGradient style={[headerGradView, style]} colors={[mainColor, secondColor]} useAngle angle={135}>
        {leftIcon &&
          <TouchableOpacity onPress={onPress}>
            <Ionicons name={leftIcon} style={[leftButtonStyle, { paddingLeft: 15 }]} color={'white'} />
          </TouchableOpacity>
        }
        { showSearch === false &&
          <Text numberOfLines={1} ellipsizeMode="tail" style={[textStyle, { paddingLeft: leftIcon ? 35 : 0 }]}>{title}</Text>
        }
        {
          showSearch === true &&
          <TextInput value={searchText} autoFocus style={[inputStyle, { paddingBottom: 0, paddingLeft: leftIcon ? 15 : 0 }]} onChangeText={(value) => this.search(value)} />
        }
        {
          sortPress &&
          <TouchableOpacity onPress={() => this.show(true)} style={[rightButtonStyle]}>
            <Icon name="sort" height="24" width="24" fill="#fff" />
            <ModalSort visible={visibleSort} hideSort={() => this.show(false)} />           
          </TouchableOpacity>
        }        
        {
          searchPress && showSearch === false &&
          <TouchableOpacity onPress={() => searchPress(true)}>
            <Ionicons name={'ios-search'} style={[rightButtonStyle]} color={'white'} />
          </TouchableOpacity>
        }     
        {
          searchPress && showSearch === true &&
          <TouchableOpacity onPress={() => searchPress(false)}>
            <Ionicons name={'ios-close'} style={[rightButtonStyle, {fontSize: 24 }]} color={'white'} />
          </TouchableOpacity>
        }
        
      </LinearGradient>      
    </View>
  )
}

const styles = StyleSheet.create({
  headerGradView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 15,
    alignItems: 'flex-end',
    ...ifIphoneX({
      height: 70
    }, {
      height: 70
    })
  },
  viewStyle: {
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 3,
    position: 'relative',
    ...ifIphoneX({
      height: 90
    }, {
      height: 70
    }),
    backgroundColor: 'white'
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',    
    flex: 1,
    color: 'white'
  },
  leftButtonStyle: {
    fontSize: 24
  },
  rightButtonStyle: {
    fontSize: 24,
    marginRight: 15
  },
  inputStyle: {
    fontSize: 20,    
    fontFamily: 'Roboto-Regular',    
    flex: 1,
    color: 'white'
  }
})

export { Header }
