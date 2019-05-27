import React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { BG_COLOR } from '../../constants/global'
import CardPlaceDynamic from './CardPlaceDynamic'

const SubCategory = ({ 
  style,
  item,
  navigation,
  mainColor,
  places,
  onSelectSubCat
}) => {
  const { view } = styles
  return (
    <View style={[view, style]} >
      <View style={{paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{ fontWeight: '500', fontFamily: 'Roboto-Regular', lineHeight: 16}}>Категория: {item.categoryName}</Text>
        <TouchableOpacity onPress={() => onSelectSubCat(item.id)}>
          <Text style={{ fontWeight: '500', fontFamily: 'Roboto-Regular', color: mainColor, lineHeight: 16, textTransform: 'uppercase'}}>Все</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        <View style={{ flexDirection: 'row', padding: 15 }}>
          {
            places.map((place) => { 
              return (<CardPlaceDynamic width={152} favorite key={place.id} item={place} onPress={() => navigation.push('Item', { id: place.id })} />)
            })
          }          
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: BG_COLOR
  }
})

export { SubCategory }
