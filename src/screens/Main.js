import React, {Component} from 'react'
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-community/async-storage'
import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
//import LinearGradient from 'react-native-linear-gradient'
import { Button } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import CustomStatusBar from '../components/uikit/CustomStatusBar'
import { getCategories, getSubCategories, getPlacesTop } from '../actions/CatalogActions'
import { initCity, getCities } from '../actions/CityActions'
import { initFavorites } from '../actions/FavoriteActions'
import { getPromoDataFirst, getPromoDataSecond } from '../actions/SwiperActions'
import { HeaderMain, SwiperApp, ButtonGrad} from '../components/uikit'
import CardPlaceDynamic from '../components/uikit/CardPlaceDynamic'
import { w, h, BG_COLOR, TRASPARENT, statusBarHeight } from '../constants/global'
import NotifyService from '../services/NotifyService'

//const PushNotificationIOS = require('react-native-push-notification')
//const PushNotification = require('react-native-push-notification')

class Main extends Component {  
  state = {
    cityId: this.props.cityId
  }
  async componentDidMount() {
    this.props.initCity()
    this.props.getCategories() 
    this.props.getCities()
    this.props.initFavorites()
    this.checkPermission()
    this.notify = new NotifyService(this.onOpen1, this.onOpen2)
    this.notify.start() // Инициализация уведомлении
    firebase.messaging().subscribeToTopic('all')
    this.refresherContent = setInterval(() => {
      this._initData() //обновляем информацию на главной странице каждые 3 мин
    }, 1000 * (3 * 60))
  }
  componentDidUpdate(prevState) {
    if (prevState.cityId !== this.props.cityId) {      
      firebase.messaging().unsubscribeFromTopic(`cityId_${prevState.cityId}`)
      firebase.messaging().subscribeToTopic(`cityId_${this.props.cityId}`)      
      this._initData()
      setTimeout(() => SplashScreen.hide(), 1000)      
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    this.notify.notificationDisplayedListener()
    this.notify.notificationListener()
    this.notify.notificationOpenedListener()
    clearInterval(this.refresherContent)
  }  

  onOpen1 = (value) => {
    this.redirectMessage(value)
  }
  onOpen2 = (value) => {
    this.redirectMessage(value)
  }
  getCurrentCityId = () => {
    return this.props.cityId
  }
  
  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    }
    console.log('fcmToken', fcmToken)
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      this.getToken()
    } else {
      this.requestPermission()
    }
  }

  redirectMessage = (value) => {
    const { id, type } = value
    if (type && id) {
      this.props.navigation.push('Item', {id: 26})
    }
  }
  
  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission()
      // User has authorised
      this.getToken()
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected')
    }
  }

  //Этот метож вызываеться из-за зависимости при параметре город
  _initData = () => {   
    this.props.getPromoDataFirst()
    this.props.getPromoDataSecond()
    this.props.getPlacesTop()
  }

  render() {
    const { navigation, mainCategory, categories, topPlaces, loading, error, cityId, promo1, promo2 } = this.props   
    
    if (cityId !== this.state.cityId) {
      //this.setState({cityId})
    }

    /**when first loading show this splash screen */
    if (loading) {
      //const size = w * 0.27
      return (<View style={StyleSheet.absoluteFill}>
        <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />           
        <ImageBackground 
          style={{ flex: 1, width: '100%', justifyContent: 'center'}}
          source={require('../../resources/images/launch_screen.png')}
          resizeMode="cover"
        >
          {error &&
          <View>
            <Text>{error.message}</Text>
            <Text>{error.stack}</Text>
          </View>
          }
          {error &&
            <Button title="ПОВТОРИТЬ" onPress={() => this._initData()} />            
          } 
        </ImageBackground>
      </View>)
    }

    return (
      <View style={styles.container}>        
        <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
        {/* Start scroll component */}
        <HeaderMain style={{position: 'absolute', width: w, top: (statusBarHeight), zIndex: 1}} leftIcon="ios-menu" title="Главная" onPress={() => navigation.openDrawer()} />                    
          
        <ScrollView overScrollMode="never" bounces={false} style={[{ flex: 1}]}>
          <SwiperApp navigation={navigation} data={promo1} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 15 }}> 
            {
              mainCategory.map((itemName) => {
                const category = categories.filter(cat => cat.id === itemName)[0]                
                return (
                  <ButtonGrad icon={category.promoIcon} key={itemName} code={category.id} mainColor={category.mainColor || '#FFF'} secondColor={category.secondaryColor || '#000'} text={category.name} onPress={() => navigation.push('Catalog', { catalog: itemName, scrollTo: category.id })} />
                )
              }
              )
            }           
          </View>
          <SwiperApp navigation={navigation} data={promo2} radius={6} />
          <View style={{ flexDirection: 'row', margin: 15}}>
            <View style={{ flex: 1, justifyContent: 'center'}}><Text style={{ fontWeight: 'bold', 
              fontFamily: 'Roboto-Regular',
              fontStyle: 'normal', 
              fontSize: 14, 
              lineHeight: 19}} 
            >Топ заведений</Text></View>
            <View style={{ flex: 1, alignItems: 'center'}}><Image style={{width: 31, height: 31}} source={require('../../resources/icons/png/topPlaces.png')} /></View>
            <View style={{ flex: 1}} />
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <ScrollView 
              horizontal
              decelerationRate={0}
              snapToInterval={(152/*itemWidth*/ * 2) + 20/*el-Margin*/}
              overScrollMode="never" 
              showsVerticalScrollIndicator={false} 
              showsHorizontalScrollIndicator={false}
              pagingEnabled 
              bounces={false}
            > 
              <FlatList 
                alwaysBounceVertical={false}
                columnWrapperStyle={{ justifyContent: 'flex-start'}}
                data={topPlaces}
                numColumns={9} 
                renderItem={(row) => <CardPlaceDynamic favorite width={152} navigation={navigation} item={row.item} onPress={() => navigation.push('Item', { id: row.item.id })} />}
                keyExtractor={(item) => item.id}
              />
            </ScrollView>                       
          </View>
          <View style={{ padding: 15 }}>
            <Button
              buttonStyle={{ 
                backgroundColor: '#FF5621',
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.35,
                shadowRadius: 1.22,
                
                elevation: 4
              }}
              onPress={() => navigation.push('Catalog', { catalog: 'all' })} 
              titleStyle={{ fontSize: 14, lineHeight: 16, fontWeight: '500', color: '#fff', fontFamily: 'Roboto-Regular'}} title="ВЕСЬ КАТАЛОГ"
            />
          </View>       
        </ScrollView>
        {/* footer static and get 10% from display */}
        <View style={[styles.shadowBox, { backgroundColor: TRASPARENT, height: h * 0.07}]} >          
          <View style={[{flex: 1, backgroundColor: BG_COLOR, flexDirection: 'row', justifyContent: 'space-between'}, styles.scrollView]}>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Main')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="home" size={24} style={{ color: '#FF6E36', textAlign: 'center' }} /><Text style={{ color: '#FF6E36' }} >Главная</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('MapPlaces')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="room" size={24} /><Text numberOfLines={1} style={{textAlign: 'center'}}>На карте</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Favorite')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="favorite" size={24} /><Text style={{textAlign: 'center'}}>Избранные</Text></View>
            </TouchableOpacity>
          </View>
        </View>        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    position: 'relative'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  shadowGradient: {
    height: 4
  }
})

const mapStateToProps = state => {
  return {
    categories: state.catalog.categories,
    loading: state.catalog.loading,
    mainCategory: state.catalog.mainCategory,
    topPlaces: state.catalog.topPlaces,
    error: state.catalog.error,
    cityId: state.city.selected,
    promo1: state.swiper.promo1,
    promo2: state.swiper.promo2
  }
}
export default connect(mapStateToProps, 
  { 
    getCategories, 
    getSubCategories, 
    getPlacesTop, 
    getCities, 
    initFavorites, 
    initCity,
    getPromoDataFirst, 
    getPromoDataSecond
  })(Main)
