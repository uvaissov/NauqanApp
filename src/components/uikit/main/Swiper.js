import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { w } from '../../../constants/global'

const Swiper = ({
  data,
  radius
}) => {
  const { child } = styles
  this._renderItem = ({item}) => {
    return (<View style={[child, { backgroundColor: 'skyblue', width: w }]}>      
      <Image 
        style={{flex: 1, height: undefined, width: undefined }} 
        source={item.source} 
        resizeMode="stretch"
      />
    </View>)
  }
  this._renderItemRaduis = ({item}) => {
    return (
      <View style={{ width: w, paddingHorizontal: 15, height: 200 }}>
        <View style={[child, { flex: 1, borderRadius: radius, overflow: 'hidden'}]}>
          <Image 
            style={{flex: 1, height: undefined, width: undefined }} 
            source={item.source} 
            resizeMode="stretch"
          />
        </View>      
      </View>
    )
  }
  return (
    <View style={{paddingHorizontal: 0}}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={0}
        data={data}
        showPagination 
        renderItem={radius ? this._renderItemRaduis : this._renderItem}
      />
    </View> 
  )
}

const styles = StyleSheet.create({
  child: {
    height: 265,
    justifyContent: 'center'
  },
  text: {
    fontSize: w * 0.5,
    textAlign: 'center'
  }
})

export { Swiper }
