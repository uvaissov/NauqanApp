import React from 'react'
import { ScrollView, View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationEvents } from 'react-navigation'
import Icon from '../../svgkit/Icon'
import { ModalSort } from './ModalSort'
//import { w } from '../../../constants/global'
import { ButtonGrad } from '../catalog/ButtonGrad'

const Header = ({
  leftIcon,
  mainColor,
  secondColor,
  onPress,
  style,
  title,
  navigation,
  categories,
  category,
  scrollTo,
  sortPress,
  searchPress,
  visibleSort,
  showSearchResult,
  searchByCatalog,
  dir,
  onSelectDir
}) => {
  const { headerGradView, viewStyle, textStyle, inputStyle, leftButtonStyle, rightButtonStyle } = styles  
  this.changeCatalog = (name) => {
    navigation(name)
  } 
  
  if (scrollTo) {
    let idx
    categories.map((cat, index) => {  
      if (cat.id === category.id) {
        idx = index        
      }
      return null
    })
    setTimeout(() => {
      if (this._scrollView) {
        this._scrollView.scrollTo({x: idx * 110}) 
      }
    }, 100)
  }
  this.show = (value) => {
    sortPress(value)
  }
  this.search = (text) => {
    searchByCatalog(text)    
  }
  this.onSelectDir = (value) => {
    onSelectDir(value)
  }

  this.viewHeader = () => {
    if (showSearchResult === true) {
      if (isIphoneX()) {
        return 90
      }
      return 70
    }
    if (isIphoneX()) {
      return 210
    }
    return 180
  }
  return (
    <View style={[viewStyle, {height: this.viewHeader()}]}>
      <NavigationEvents onWillBlur={() => searchPress(false)} />
      <LinearGradient style={[headerGradView, style]} colors={[mainColor, secondColor]} useAngle angle={135}>
        {leftIcon &&
          <TouchableOpacity onPress={onPress}>
            <Ionicons name={leftIcon} style={[leftButtonStyle, { paddingHorizontal: 20 }]} color={'white'} />
          </TouchableOpacity>
        }
        {
          showSearchResult === false &&
          <Text numberOfLines={1} ellipsizeMode="tail" style={[textStyle, { paddingLeft: leftIcon ? 15 : 0 }]}>{title}</Text>
        }
        {
          showSearchResult === true &&
          <TextInput autoFocus style={[inputStyle, { paddingBottom: 0, paddingLeft: leftIcon ? 15 : 0 }]} onChangeText={(text) => this.search(text)} />
        }        
        {
          sortPress && showSearchResult === false &&
          <TouchableOpacity onPress={() => this.show(true)} style={[rightButtonStyle]}>
            <Icon name="sort" height="24" width="24" fill="#fff" />
            <ModalSort visible={visibleSort} hideSort={() => this.show(false)} dir={dir} onSelectDir={onSelectDir} />           
          </TouchableOpacity>
        }
        {
          searchPress && showSearchResult === false &&
          <TouchableOpacity onPress={() => searchPress(true)}>
            <Ionicons name={'ios-search'} style={[rightButtonStyle]} color={'white'} />
          </TouchableOpacity>
        }     
        {
          searchPress && showSearchResult === true &&
          <TouchableOpacity onPress={() => searchPress(false)}>
            <Ionicons name={'ios-close'} style={[rightButtonStyle, {fontSize: 24 }]} color={'white'} />
          </TouchableOpacity>
        }
      </LinearGradient>
      {
        showSearchResult === false && 
        <ScrollView showsHorizontalScrollIndicator={false} ref={(view) => { this._scrollView = view }} horizontal style={{ flexDirection: 'row', padding: 15 }}>
          {
            categories.map((cat) => {  
              const selected = cat.id === category.id         
              return (
                <ButtonGrad selected={selected} cat={cat} key={cat.id} code={cat.id} color={!selected ? 'rgba(0, 0, 0, 0.54)' : cat.mainColor} text={cat.name} onPress={() => this.changeCatalog(cat.id)} />
              )
            }
            )
          }        
        </ScrollView> 
      }
           
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
      height: 90
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
    backgroundColor: 'white'
  },
  inputStyle: {
    fontSize: 20,    
    fontFamily: 'Roboto-Regular',    
    flex: 1,
    color: 'white'
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
  }
})

export { Header }
