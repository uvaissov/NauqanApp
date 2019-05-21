import React from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
//import SwiperFlatList from 'react-native-swiper-flatlist'
import Swiper from 'react-native-swiper'
import LinearGradient from 'react-native-linear-gradient'
import { w } from '../../../constants/global'

const getComponentHeight = (weight) => {
  return weight * 0.732
}

const getComponentHeightSM = (weight, padding) => {
  return (weight - padding) * 0.619
}

const SwiperApp = ({
  data,
  radius
}) => {
  const { child } = styles
  
  this._renderSwiper = () => (
    <View style={{paddingHorizontal: 0}}>
      <Swiper height={getComponentHeight(w, 30)} autoplay activeDotColor="#FFFFFF" dotColor="rgba(255, 255, 255, 0.38)" >
        {
          data.map((item) => {
            return (
              <View key={item.id} style={[child, { backgroundColor: 'skyblue', width: w }]}>      
                <ImageBackground  
                  style={{flex: 1, height: undefined, width: undefined }} 
                  source={item.source} 
                  resizeMode="cover"
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
              </View>
            )
          }
          )
        }
      </Swiper>
    </View>
  )

  this._renderSwiperRadius = () => (
    <View style={{paddingHorizontal: 0}}>
      <Swiper height={getComponentHeightSM(w, 30)} autoplay activeDotColor="#FFFFFF" dotColor="rgba(255, 255, 255, 0.38)" >
        {
          data.map((item) => {
            return (
              <View key={item.id} style={{ width: w, paddingHorizontal: 15, height: getComponentHeightSM(w, 30) }}>
                <View style={[child, { flex: 1, borderRadius: radius, overflow: 'hidden'}]}>
                  <Image 
                    style={{flex: 1, height: undefined, width: undefined }} 
                    source={item.source} 
                    resizeMode="cover"
                  />
                </View>      
              </View>
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
  }
})

export { SwiperApp }
