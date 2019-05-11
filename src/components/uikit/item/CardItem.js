import React from 'react'
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native'
import { BG_COLOR } from '../../../constants/global'

const CardItem = ({ item, navigation }) => {
  const { view, row } = styles
  return (

    <TouchableHighlight style={[view, { height: 203, width: 152, marginHorizontal: 10 }]} onPress={() => navigation.push('Sale')} >
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
            <Text style={{ color: '#170701', fontSize: 16, lineHeight: 19, opacity: 0.87, fontFamily: 'Roboto-Regular' }}>{item.title}</Text>
            <Text style={{ color: '#563DD0', fontSize: 12, lineHeight: 19, fontFamily: 'Roboto-Regular' }}>{item.count} предложений</Text>
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
    height: 51,
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
    
    elevation: 4
  }
})

export { CardItem }
