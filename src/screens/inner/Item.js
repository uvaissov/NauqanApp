import React, {Component} from 'react'
import {StyleSheet, View, Image} from 'react-native'
import { Header } from '../../components/uikit/item/Header'
import { w } from '../../constants/global'

class Catalog extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="md-arrow-back" title="Главная" onPress={() => navigation.goBack()} />
        <View style={{ width: w, height: 210, borderWidth: 1 }}>
          <Image 
            style={{flex: 1, height: undefined, width: undefined }} 
            source={require('../../../resources/demo/promo.png')} 
            resizeMode="stretch"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})

export default Catalog
