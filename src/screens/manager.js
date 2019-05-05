import React from 'react'
import { SafeAreaView, ScrollView, View, Text} from 'react-native'
import { createDrawerNavigator, createAppContainer, DrawerItems, createStackNavigator } from 'react-navigation'
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

const MainStack = createStackNavigator(
  {
    Main,
    Catalog,
    Item,
    Sale
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none'
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
