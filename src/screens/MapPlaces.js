/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { StyleSheet, Text, View} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

class MapPlaces extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>123</Text>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{...StyleSheet.absoluteFillObject}}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

export default MapPlaces
