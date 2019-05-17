/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { w, h, TRASPARENT, BG_COLOR } from '../constants/global'
import { CardPlaceDynamic } from '../components/uikit'

class Favorite extends Component {  
  render() {
    const { navigation } = this.props
    const itemWidth = w * 0.466
    return (
      <View style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ScrollView>
            <FlatList 
              columnWrapperStyle={{ justifyContent: 'space-between'}}
              data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25']}
              numColumns={2} 
              renderItem={() => <CardPlaceDynamic width={itemWidth} onPress={() => navigation.push('Item')} item={{ id: '1', title: 'Adidas', count: 15, source: require('../../resources/demo/adidas.png')}} />}
              keyExtractor={(item) => item}
              style={{ padding: 5 }}
            />
          </ScrollView>
        </View>
        <View style={[styles.shadowBox, { backgroundColor: TRASPARENT, height: h * 0.1}]} >          
          <View style={[{flex: 1, backgroundColor: BG_COLOR, flexDirection: 'row', justifyContent: 'space-between'}, styles.scrollView]}>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Main')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="home" size={24} /><Text>Главная</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('MapPlaces')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="room" size={24} /><Text >Карта заведений</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Favorite')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="favorite" size={24} style={{ color: '#FF6E36' }} /><Text style={{ color: '#FF6E36' }} >Избранные</Text></View>
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
      height: 8
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    borderColor: BG_COLOR, 
    borderWidth: 1
  }
})

export default Favorite
