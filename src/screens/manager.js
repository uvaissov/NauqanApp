import React from 'react'
import { ScrollView, View, Image, ImageBackground, Text, Platform, Animated, Easing} from 'react-native'
import { createDrawerNavigator, createAppContainer, DrawerItems, createStackNavigator } from 'react-navigation'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import LinearGradient from 'react-native-linear-gradient'
//import { fromRight } from 'react-navigation-transitions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Main from './Main'
import Favorite from './Favorite'
import MapPlaces from './MapPlaces'
import B2B from './B2B'
import Contact from './Contact'
import AboutApp from './AboutApp'
import Setting from './Setting'
import Catalog from './inner/Catalog'
import Item from './inner/Item'
import Sale from './inner/Sale'
import { w } from '../constants/global'

const CustomDrawerComponent = (props) => (
  <View style={{ flex: 1 }}>
    <View style={{ ...ifIphoneX({
      height: 240
    }, {
      height: 210
    }),
    backgroundColor: '#FAFAFA', 
    alignItems: 'center', 
    justifyContent: 'center'}} 
    >
      <ImageBackground  
        style={{width: '100%', flex: 2, transform: [{perspective: 850}], justifyContent: 'center'}}
        source={require('../../resources/images/background.png')} 
        resizeMode="cover"        
      >
        <LinearGradient
          colors={['rgba(250, 250, 250, 0)', '#FAFAFA']}
          start={{x: 0.0, y: 0.25}} 
          end={{x: 0.5, y: 1.0}}
          locations={[0, 0.6]}
          useAngle
          angle={180}
          style={{flex: 1}}
        />
        <Image 
          style={{ position: 'absolute', height: 60, width: 60, top: 60, left: (((w * 0.8) / 2) - 30) }} 
          source={require('../../resources/images/logo.png')}
          resizeMode="stretch"
        />        
      </ImageBackground>
      <View style={{ flex: 1}}>
        <Text> СПИСОК ГОРОДОВ </Text>
      </View>
    </View>
    <ScrollView style={{ backgroundColor: '#FAFAFA'}}>
      <DrawerItems {...props} />
    </ScrollView>
  </View>
)

// const FadeTransation = (index, position) => {
//   const sceneRange = [index - 1, index]
//   const outputOpacity = [0, 1]
//   const transtition = position.interpolate({
//     inputRange: sceneRange,
//     outputRange: outputOpacity
//   })
//   return {
//     opacity: transtition
//   }
// }

// const NavigationConfig = () => {
//   return {
//     screenInterpolator: (sceneOptions) => {
//       const position = sceneOptions.position
//       const scene = sceneOptions.scene
//       const index = scene.index
//       return FadeTransation(index, position)
//     }
//   }
// }
const CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1]
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1]
  })

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1])
  })

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  }
}

const SlideFromRight = (index, position, width) => {
  //const inputRange = [index - 1, index, index + 1]
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
}

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps
      const width = layout.initWidth
      const { index, route } = scene
      const params = route.params || {} // <- That's new
      const transition = params.transition || 'default' // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: SlideFromRight(index, position, width)
      }[transition]
    }
  }
}

const MainStack = createStackNavigator(
  {
    Main,
    Catalog,
    Item: { 
      screen: Item
    },
    Sale
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    //transitionConfig: () => fromRight(300)
    transitionConfig: TransitionConfiguration
  }
)

const Screens = createDrawerNavigator({
  Main: {
    screen: MainStack,
    navigationOptions: {
      drawerLabel: 'Главная',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="home" size={24} style={{ color: tintColor }} />
      )
    }
  },
  Favorite: {
    screen: Favorite,
    navigationOptions: {
      drawerLabel: 'Избранное',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="favorite" size={24} style={{ color: tintColor }} />
      )
    }
  },
  MapPlaces: {
    screen: MapPlaces,
    navigationOptions: {
      drawerLabel: 'Карта заведений',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="room" size={24} style={{ color: tintColor }} />
      )
    }
  },
  B2B: {
    screen: B2B,
    navigationOptions: {
      drawerLabel: 'Вы владелец заведения?',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="work" size={24} style={{ color: tintColor }} />
      )
    }
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      drawerLabel: 'Связаться с нами',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="message" size={24} style={{ color: tintColor }} />
      )
    }
  },
  AboutApp: {
    screen: AboutApp,
    navigationOptions: {
      drawerLabel: 'О приложении',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="label" size={24} style={{ color: tintColor, transform: [{ rotate: '-90deg'}] }} />
      )
    }
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      drawerLabel: 'Настройки',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="settings" size={24} style={{ color: tintColor }} />
      )
    }
  }
},
{
  initialRouteName: 'Main',
  drawerWidth: w * 0.8,
  contentOptions: {
    activeTintColor: '#FF6E36',
    inactiveTintColor: 'rgba(0, 0, 0, 0.54)',
    activeBackgroundColor: '#FFFFFF',
    itemsContainerStyle: {
      backgroundColor: '#FAFAFA'
    },
    labelStyle: { fontSize: 14, fontFamily: 'Roboto-Regular', fontWeight: 'normal', fontStyle: 'normal', color: 'rgba(23, 7, 1, 0.87)' }
  },
  contentComponent: CustomDrawerComponent
})

export default createAppContainer(Screens)
