import React from 'react'
import { ScrollView, View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Ionicons from 'react-native-vector-icons/Ionicons'
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
  visibleSort
}) => {
  const { headerGradView, viewStyle, textStyle, leftButtonStyle, rightButtonStyle } = styles  
  this.changeCatalog = (name) => {
    navigation.navigate('Catalog', {catalog: name, scrollTo: undefined})
  } 
  
  if (scrollTo) {
    let idx
    categories.map((cat, index) => {  
      if (cat.code === category.code) {
        idx = index        
      }
      return null
    })
    setTimeout(() => {
      this._scrollView.scrollTo({x: idx * 110}) 
    }, 100)
  }
  this.show = (value) => {
    sortPress(value)
  }
  return (
    <View style={viewStyle}>
      
      <LinearGradient style={[headerGradView, style]} colors={[mainColor, secondColor]} useAngle angle={135}>
        {leftIcon &&
          <TouchableOpacity onPress={onPress}>
            <Ionicons name={leftIcon} style={[leftButtonStyle, { paddingLeft: 10 }]} color={'white'} />
          </TouchableOpacity>
        }
        <Text numberOfLines={1} ellipsizeMode="tail" style={[textStyle, { paddingLeft: leftIcon ? 35 : 0 }]}>{title}</Text>
        {
          sortPress &&
          <TouchableOpacity onPress={() => this.show(true)} style={[rightButtonStyle]}>
            <Icon name="sort" height="24" width="24" fill="#fff" />
            <ModalSort visible={visibleSort} hideSort={() => this.show(false)} />           
          </TouchableOpacity>
        }        
        {
          searchPress && 
          <TouchableOpacity onPress={searchPress}>
            <Ionicons name={'ios-search'} style={[rightButtonStyle]} color={'white'} />
          </TouchableOpacity>
        }
        
      </LinearGradient>
      <ScrollView showsHorizontalScrollIndicator={false} ref={(view) => { this._scrollView = view }} horizontal style={{ flexDirection: 'row', padding: 15 }}>
        {
          categories.map((cat) => {            
            return (
              <ButtonGrad key={cat.code} code={cat.code} color={cat.code !== category.code ? 'rgba(0, 0, 0, 0.54)' : cat.mainColor} text={cat.name} onPress={() => this.changeCatalog(cat.code)} />
            )
          }
          )
        }        
      </ScrollView>      
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
      height: 60
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
      height: 200
    }, {
      height: 180
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
    //paddingTop: 45,
    fontSize: 24
  },
  rightButtonStyle: {
    //paddingTop: 45,
    fontSize: 24,
    marginRight: 15
  }
})

export { Header }
