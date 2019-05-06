import React from 'react'
import { SafeAreaView, ScrollView, View, Text} from 'react-native'
import { createDrawerNavigator, createAppContainer, DrawerItems, createStackNavigator } from 'react-navigation'
import { fromRight } from 'react-navigation-transitions'
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

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
      <Text>Test</Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
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
    transitionConfig: () => fromRight(300)
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
        <MaterialIcons name="pets" size={24} style={{ color: tintColor }} />
      )
    }
  },
  B2B: {
    screen: B2B,
    navigationOptions: {
      drawerLabel: 'Вы владелец заведения?',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="pets" size={24} style={{ color: tintColor }} />
      )
    }
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      drawerLabel: 'Связаться с нами',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="pets" size={24} style={{ color: tintColor }} />
      )
    }
  },
  AboutApp: {
    screen: AboutApp,
    navigationOptions: {
      drawerLabel: 'О приложении',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="pets" size={24} style={{ color: tintColor }} />
      )
    }
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      drawerLabel: 'Настройки',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="pets" size={24} style={{ color: tintColor }} />
      )
    }
  }
},
{
  initialRouteName: 'Main',
  contentOptions: {
    activeTintColor: 'grey',
    itemsContainerStyle: {
      marginVertical: 75
    }
  },
  contentComponent: CustomDrawerComponent
})

export default createAppContainer(Screens)
