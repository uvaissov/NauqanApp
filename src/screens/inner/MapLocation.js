import React, {Component} from 'react'
import { StyleSheet, View, Text, Image, InteractionManager } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import CustomStatusBar from '../../components/uikit/CustomStatusBar'
import Header from '../../components/uikit/item/Header'
import { w, TRASPARENT, BG_COLOR, statusBarHeight, genImageUri } from '../../constants/global'

class MapLocation extends Component {
  state = {
    didFinishInitialAnimation: false,
    latitude: null,
    longitude: null,
    error: null,
    points: [this.props.navigation.getParam('point')]
  }

  componentDidMount() {
    this.setState({
      latitude: this.props.navigation.getParam('point').lng,
      longitude: this.props.navigation.getParam('point').lat
    })
    // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        this.setState({
          didFinishInitialAnimation: true
        })
      }, 350)
    })    
  }

  async componentDidUpdate(prevState) {
    if (prevState.didFinishInitialAnimation === false && this.state.didFinishInitialAnimation === true) {
      console.log('first fetch')
    }
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
                        <View style={{ width: 150, height: 80, backgroundColor: '#fff', borderRadius: 6, padding: 10, borderColor: BG_COLOR, borderWidth: 1 }}>
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
        <Header leftColor="white" style={{position: 'absolute', width: w, top: statusBarHeight, zIndex: 1}} leftIcon="md-arrow-back" onPress={() => navigation.goBack()} />
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
export default connect(mapStateToProps, { })(MapLocation)
