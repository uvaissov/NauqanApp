import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, InteractionManager } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomStatusBar from '../components/uikit/CustomStatusBar'
import { Header } from '../components/uikit/map/Header'
import { w, h, TRASPARENT, BG_COLOR } from '../constants/global'

class MapPlaces extends Component {
  state = {
    didFinishInitialAnimation: false,
    latitude: null,
    longitude: null,
    error: null,
    coordinate1: {
      latitude: 43.2214459,
      longitude: 76.8471801,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    coordinate2: {
      latitude: 43.2218459,
      longitude: 76.8521801,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    coordinate3: {
      latitude: 43.2221459,
      longitude: 76.8501801,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('wokeeey')
        console.log(position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    )
    // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
      // 2: Component is done animating
      // 3: Start fetching the team
      //this.props.dispatchTeamFetchStart()
     
      // 4: set didFinishInitialAnimation to false
      // This will render the navigation bar and a list of players
      setTimeout(() => {
        this.setState({
          didFinishInitialAnimation: true
        })
      }, 250)
    })
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={{flex: 1}} >          
          {
            this.state.didFinishInitialAnimation === true &&
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={{width: w, flex: 1}}
              region={{
                latitude: 43.2214459,
                longitude: 76.8501801,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
              }}
            > 
              <Marker title="Тут был Вася!" coordinate={this.state.coordinate1}>
                <Image 
                  style={{height: 38, width: 29 }} 
                  source={require('../../resources/icons/png/topPlaces.png')} 
                  resizeMode="stretch"
                />
              </Marker>
              <Marker coordinate={this.state.coordinate2} >
                <Image 
                  style={{height: 38, width: 29 }} 
                  source={require('../../resources/icons/png/topPlaces.png')} 
                  resizeMode="stretch"
                />
              </Marker>
              <Marker coordinate={this.state.coordinate3} >
                <Image 
                  style={{height: 38, width: 29 }} 
                  source={require('../../resources/icons/png/topPlaces.png')} 
                  resizeMode="stretch"
                />
              </Marker>
              {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude}}
                title={'Your Location'}
              />}
            </MapView>
          }
          
        </View>
        <CustomStatusBar backgroundColor="grey" barStyle="default" absolute={{position: 'absolute', width: w, top: 0, zIndex: 10}} />
        <Header style={{position: 'absolute', width: w, top: 18, zIndex: 10}} leftIcon="md-menu" title="Главная" onPress={() => navigation.openDrawer()} />
        {/* footer static and get 10% from display */}
        <View style={[styles.shadowBox, { backgroundColor: TRASPARENT, height: h * 0.1}]} >          
          <View style={[{flex: 1, backgroundColor: BG_COLOR, flexDirection: 'row', justifyContent: 'space-between'}, styles.scrollView]}>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Main')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="home" size={24} /><Text>Главная</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('MapPlaces')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="room" size={24} style={{ color: '#FF6E36' }} /><Text style={{ color: '#FF6E36' }} >Карта заведений</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Favorite')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="favorite" size={24} /><Text>Избранные</Text></View>
            </TouchableOpacity>
          </View>
        </View>  
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.6,
    shadowRadius: 2.9,

    elevation: 3,
    position: 'relative'
  }
})

export default MapPlaces
