import React from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'
import LinearGradient from 'react-native-linear-gradient'
import { w } from '../../../constants/global'

const getComponentHeight = (weight) => {
  return weight * 0.732
}

const getComponentHeightSM = (weight, padding) => {
  return (weight - padding) * 0.619
}

const Swiper = ({
  data,
  radius
}) => {
  const { child } = styles
  this._renderItem = ({item}) => {
    return (<View style={[child, { backgroundColor: 'skyblue', width: w }]}>      
      <ImageBackground  
        style={{flex: 1, height: undefined, width: undefined }} 
        source={item.source} 
        resizeMode="stretch"
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.50)', 'rgba(0, 0, 0, 0.25)', 'transparent', 'transparent', 'rgba(0, 0, 0, 0.25)', 'rgba(0, 0, 0, 0.50)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          useAngle
          angle={180}
          style={{flex: 1}}
        />        
      </ImageBackground>
    </View>)
  }
  this._renderItemRaduis = ({item}) => {
    return (
      <View style={{ width: w, paddingHorizontal: 15, height: getComponentHeightSM(w, 30) }}>
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
    height: getComponentHeight(w),
    justifyContent: 'center'
  },
  text: {
    fontSize: w * 0.5,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch', //TODO: Importate para que la imagen abarque toda la pantalla
    backgroundColor: 'transparent'
  }
})

export { Swiper }
