import React from 'react'
import { View, StyleSheet, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native'
//import SwiperFlatList from 'react-native-swiper-flatlist'
import Swiper from 'react-native-swiper'
import LinearGradient from 'react-native-linear-gradient'
import { w, genImageUri } from '../../../constants/global'

const getComponentHeight = (weight) => {
  return weight * 0.732
}

const getComponentHeightSM = (weight, padding) => {
  return (weight - padding) * 0.619
}

const SwiperApp = ({
  data,
  radius,
  navigation
}) => {
  const { child, shadow } = styles
  
  this._renderSwiper = () => (
    <View style={{paddingHorizontal: 0}}>
      <Swiper height={getComponentHeight(w, 30)} autoplay autoplayTimeout={3.5} activeDotColor="#FFFFFF" dotColor="rgba(255, 255, 255, 0.38)" >
        {
          data.map((item) => {
            console.log('item', item)            
            return (
              <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate('Item', {id: item.id })}>
                <View key={item.id} style={[child, { width: w }]}>      
                  <ImageBackground  
                    style={{flex: 1, height: undefined, width: undefined }} 
                    source={{uri: genImageUri(item.img)}}
                    resizeMode="cover"
                  >
                    <LinearGradient
                      colors={['transparent', 'transparent', 'transparent', 'transparent', 'rgba(0, 0, 0, 0.25)', 'rgba(0, 0, 0, 0.50)']}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 1 }}
                      useAngle
                      angle={180}
                      style={{flex: 1}}
                    />        
                  </ImageBackground>
                </View>
              </TouchableWithoutFeedback>
            )
          }
          )
        }
      </Swiper>
    </View>
  )

  this._renderSwiperRadius = () => (
    <View style={{paddingHorizontal: 0}}>
      <Swiper height={getComponentHeightSM(w, 30)} autoplay autoplayTimeout={4.7} activeDotColor="#FFFFFF" dotColor="rgba(255, 255, 255, 0.38)" >
        {
          data.map((item) => {
            return (
              <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate('Sale', {id: item.id })}>
                <View key={item.id} style={[{ width: w }]}>
                  <View style={[child, { marginHorizontal: 15, height: getComponentHeightSM(w, 30) }, shadow]}>
                    <Image 
                      style={{flex: 1, height: undefined, width: undefined, borderRadius: radius }} 
                      source={{uri: genImageUri(item.img)}}
                      resizeMode="cover"
                    />
                  </View>      
                </View>
              </TouchableWithoutFeedback>
            )
          }
          )
        }
      </Swiper>
    </View>
  )
  if (radius) {
    return this._renderSwiperRadius()
  }
  
  return this._renderSwiper()
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
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.22,

    elevation: 4
  }
})

export { SwiperApp }
