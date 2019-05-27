/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import CustomStatusBar from '../components/uikit/CustomStatusBar'
import Header from '../components/uikit/item/Header'
import { w } from '../constants/global'

class Setting extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
        <Header leftColor="black" style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="md-menu" onPress={() => navigation.openDrawer()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})

export default Setting
