/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import CustomStatusBar from '../components/uikit/CustomStatusBar'

class Setting extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
        <Text style={styles.welcome}>Настройки</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})

export default Setting
