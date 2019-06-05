/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { Text, StyleSheet, View, Switch} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import CustomStatusBar from '../components/uikit/CustomStatusBar'
import { Header } from '../components/uikit/favorite/Header'
import { notifySelect } from '../actions/CityActions'
import { normalize } from '../constants/global'

class Setting extends Component {
  _notifyUse = (value) => {
    this.props.notifySelect(value)
    if (value === true) {
      firebase.messaging().subscribeToTopic('all')
      firebase.messaging().subscribeToTopic(`cityId_${this.props.cityId}`)
    } else {
      firebase.messaging().unsubscribeFromTopic('all')
      firebase.messaging().unsubscribeFromTopic(`cityId_${this.props.cityId}`)     
    }
  }

  render() {
    const { navigation, notifyUse } = this.props
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
        <Header showSearch={false} mainColor="#8366D8" secondColor="#4786FF" title="Настройки" leftColor="black" leftIcon="md-menu" onPress={() => navigation.openDrawer()} /> 
        <View>
          <View style={styles.elementView}>
            <Text style={styles.elementText}>Уведомления</Text>
            <Switch onValueChange={(value) => this._notifyUse(value)} value={notifyUse} />
          </View>
        </View>
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
  },
  elementView: {
    flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft: 20, marginTop: 20
  },
  elementText: {
    flex: 1, fontFamily: 'Roboto-Regular', fontSize: normalize(16)
  }
})

const mapStateToProps = state => {
  return {
    notifyUse: state.city.notifyUse,
    cityId: state.city.selected
  }
}
export default connect(
  mapStateToProps,
  { notifySelect }
)(Setting)
