import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { BG_COLOR } from '../../constants/global'
import { CardPlace } from './CardPlace'

const SubCategory = ({ 
  style,
  item,
  navigation,
  mainColor
}) => {
  const { view } = styles
  return (
    <View style={[view, style]} >
      <View style={{paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{ fontWeight: '500', fontFamily: 'Roboto-Regular', lineHeight: 16}}>Категория: {item.categoryName}</Text>
        <Text style={{ fontWeight: '500', fontFamily: 'Roboto-Regular', color: mainColor, lineHeight: 16, textTransform: 'uppercase'}}>Все</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        <View style={{ flexDirection: 'row', padding: 15 }}>
          <CardPlace navigation={navigation} item={{ title: 'Adidas', count: 15, source: require('../../../resources/demo/adidas.png')}} />
          <CardPlace navigation={navigation} item={{ title: 'Acceserize', count: 3, source: require('../../../resources/demo/access.png')}} />
          <CardPlace navigation={navigation} item={{ title: 'Magnum', count: 67, source: require('../../../resources/demo/magnum.png')}} />
          <CardPlace navigation={navigation} item={{ title: 'Foxtot', count: 2, source: require('../../../resources/demo/foxtrot.png')}} />
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
