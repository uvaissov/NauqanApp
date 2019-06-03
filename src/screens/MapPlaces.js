import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, InteractionManager } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomStatusBar from '../components/uikit/CustomStatusBar'
import { Header } from '../components/uikit/map/Header'
import { w, h, TRASPARENT, BG_COLOR, statusBarHeight, hostName, genImageUri } from '../constants/global'

class MapPlaces extends Component {
  state = {
    didFinishInitialAnimation: false,
    latitude: null,
    longitude: null,
    error: null,
    points: []
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
        this.loadPoint(position.coords.latitude, position.coords.longitude)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    )
    // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        this.setState({
          didFinishInitialAnimation: true
        })
      }, 350)
    })    
  }

  loadPoint = (lat, lng) => {
    fetch(`${hostName}/get_zav?lat=${lng}&lng=${lat}&rad=5`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ points: data})
      })
  }  

  render() {
    const { navigation, categories } = this.props
    return (
      <View style={styles.container}>
        <View style={{flex: 1}} >          
          {
            this.state.didFinishInitialAnimation === true &&
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={{width: w, flex: 1}}
              region={{
                latitude: this.state.latitude || 43.2214459,
                longitude: this.state.longitude || 76.8501801,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
              }}
            > 
              {
                this.state.points.map((point, index) => {
                  const [category = {}] = categories.filter((cat) => cat.id === point.cat_id)             
                  return (
                    <Marker style={{zIndex: index + 1 }} ref={_marker => { this.marker = _marker }} key={point.id} coordinate={{ latitude: point.lng, longitude: point.lat }} onCalloutPress={() => { this.marker.hideCallout() }}>                      
                      <LinearGradient style={[styles.button]} colors={[category.mainColor.trim(), category.secondaryColor.trim()]} useAngle angle={135}>
                        <Image style={{height: 18, width: 18}} source={{uri: genImageUri(category.promoIcon)}} resizeMode="contain" />                        
                      </LinearGradient>
                      <MapView.Callout tooltip>
                        <View style={{ width: 150, height: 100, backgroundColor: '#fff', borderRadius: 6, padding: 10, borderColor: BG_COLOR, borderWidth: 1 }}>
                          <Text ellipsizeMode="tail" style={{flex: 1, fontWeight: '500', textAlign: 'center', color: 'black'}}>{point.name}</Text>
                          <Text ellipsizeMode="tail" style={{flex: 1, fontWeight: '500', textAlign: 'center', color: 'rgba(0,0,0,0.5)'}}>{point.address}</Text>
                        </View>
                      </MapView.Callout>
                    </Marker>
                  )
                })
              }
              
              {
                !!this.state.latitude && !!this.state.longitude && <MapView.Marker
                  coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude}}
                  title={'Your Location'}
                />
              }
            </MapView>
          }
          
        </View>
        <CustomStatusBar backgroundColor="grey" barStyle="default" absolute={{position: 'absolute', width: w, top: 0, zIndex: 10}} />
        <Header style={{position: 'absolute', width: w, top: statusBarHeight, zIndex: 10}} leftIcon="md-menu" title="Главная" onPress={() => navigation.openDrawer()} />
        {/* footer static and get 10% from display */}
        <View style={[styles.shadowBox, { backgroundColor: TRASPARENT, height: h * 0.07}]} >          
          <View style={[{flex: 1, backgroundColor: BG_COLOR, flexDirection: 'row', justifyContent: 'space-between'}, styles.scrollView]}>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Main')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="home" size={24} /><Text style={{textAlign: 'center'}}>Главная</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('MapPlaces')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="room" size={24} style={{ color: '#FF6E36' }} /><Text style={{ color: '#FF6E36', textAlign: 'center' }} >На карте</Text></View>
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
  },
  button: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: TRASPARENT,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,    
    elevation: 4
  }
})

const mapStateToProps = state => {
  return {
    categories: state.catalog.categories
  }
}
export default connect(mapStateToProps, { })(MapPlaces)
