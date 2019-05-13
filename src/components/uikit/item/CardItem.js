import React from 'react'
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native'
import { BG_COLOR, normalize } from '../../../constants/global'

const CardItem = ({ item, navigation, style }) => {
  const { view, row } = styles
  const heightCalc = style.width * 1.72
  return (

    <TouchableHighlight style={[style, view, { height: heightCalc }]} onPress={() => navigation.push('Sale')} >
      <View style={{flex: 1, overflow: 'hidden', borderRadius: 6}}>
        <View style={{ flex: 1 }}>
          <Image 
            style={{flex: 1, height: undefined, width: undefined }} 
            source={item.source} 
            resizeMode="stretch"
          />
        </View>
        <View style={row}>
          <View style={{ flex: 1}}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(16), lineHeight: 19, color: 'rgba(0, 0, 0, 0.87)' }}>{item.title}</Text>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(12), color: 'rgba(0, 0, 0, 0.4)', lineHeight: 14, margin: 10}}>Действует до {item.date}</Text>
            <View style={{ flexDirection: 'row'}}>
              <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(14), color: '#979797', textDecorationLine: 'line-through' }} >{item.price.before}</Text>
              <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(14), color: '#FF6E36', marginLeft: 5}}>{item.price.after}</Text>
            </View>
          </View>          
        </View>
      </View>
    </TouchableHighlight>

  )
}

const styles = StyleSheet.create({
  row: {
    paddingLeft: 10,
    paddingTop: 8,
    height: 121,
    flexDirection: 'row',
    backgroundColor: BG_COLOR
  },
  view: {
    borderRadius: 6,
    backgroundColor: BG_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.22,
    margin: 4,
    elevation: 4
  }
})

export { CardItem }
