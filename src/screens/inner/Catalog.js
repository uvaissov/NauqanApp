import React, {Component} from 'react'
import { Text, StyleSheet, View, ScrollView, StatusBar} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Header } from '../../components/uikit'
import { SubCategory } from '../../components/uikit/SubCategory'

class Catalog extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#45A460" barStyle="light-content" />
        <Header navigation={navigation} leftIcon="md-arrow-back" mainColor="#45A460" secondColor="#A9D334" title="Каталог" onPress={() => navigation.navigate('Main')} /> 
        <ScrollView style={[{ flex: 1}]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15}}>
            <Text style={{ fontSize: 16}}>Все подкатегории</Text>
            <Ionicons name={'ios-search'} style={{ fontSize: 16}} color={'white'} />
          </View>
          <SubCategory navigation={navigation} item={{ categoryName: 'test1'}} />
          <SubCategory navigation={navigation} item={{ categoryName: 'test2'}} />
          <SubCategory navigation={navigation} item={{ categoryName: 'test3'}} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
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

export default Catalog
