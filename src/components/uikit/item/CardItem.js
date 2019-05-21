import React from 'react'
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Moment from 'moment'
import { BG_COLOR, normalize, genImageUri } from '../../../constants/global'

const CardItem = ({ item, navigation, style }) => {
  const { view, row } = styles
  const heightCalc = style.width
  return (

    <TouchableHighlight style={[style, view]} onPress={() => navigation.push('Sale', { id: item.id})} >
      <View style={{flex: 1, overflow: 'hidden', borderRadius: 6}}>
        <View style={{ flex: 1 }}>
          <Image 
            style={{flex: 1, height: heightCalc, width: undefined }} 
            source={{uri: genImageUri(item.img)}}
            resizeMode="cover"
          />
        </View>
        {/*skidka*/
          item.skidka &&
          <View style={styles.skidkaView}>
            <Text style={styles.skidkaText}>Скидка {item.skidka}%</Text>
          </View>
        }
        <View style={row}>
          <View style={{ flex: 1}}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(16), lineHeight: 19, color: 'rgba(0, 0, 0, 0.87)' }}>{item.name}</Text>
            <View style={{ height: 14, marginVertical: 10}}>
              { item.date_en && 
                <View style={{flexDirection: 'row', justifyContent: 'center', marginLeft: -5}}>
                  <MaterialIcons name="access-time" size={14} style={{ color: '#FF6E36' }} />
                  <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(11), color: 'rgba(0, 0, 0, 0.4)', lineHeight: 14, marginLeft: 5}}>
                    Действует до {Moment(item.date_en).format('DD.MM.YYYY')}
                  </Text>
                </View>
              }
            </View>
            {
              item.skidka_price &&
                <View style={{ flexDirection: 'row'}}>
                  <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(14), color: '#979797', textDecorationLine: 'line-through' }} >{item.price}</Text>
                  <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(14), color: '#FF6E36', marginLeft: 5}}>{item.skidka_price} тенге</Text>
                </View>
            }
            {
              !item.skidka_price &&
                <View style={{ flexDirection: 'row'}}>                  
                  <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(14), color: '#FF6E36', marginLeft: 5}}>{item.price} тенге</Text>
                </View>
            }
              
          </View>          
        </View>
      </View>
    </TouchableHighlight>

  )
}

const styles = StyleSheet.create({
  row: {
    paddingLeft: 10,
    paddingVertical: 10,
    //height: 121,
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
  },
  skidkaView: {
    position: 'absolute',
    backgroundColor: '#FF6E36',
    right: 0,
    top: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  skidkaText: {
    fontFamily: 'Roboto-Regular', fontSize: normalize(12), color: 'white', lineHeight: 19
  }
})

export { CardItem }
