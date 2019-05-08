import React, {Component} from 'react'
import { Text, StyleSheet, View, ScrollView, StatusBar} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { Header } from '../../components/uikit'
import { SubCategory } from '../../components/uikit/SubCategory'

class Catalog extends Component {
  render() {
    const { navigation, categories } = this.props
    const category = categories.filter(cat => cat.code === navigation.getParam('catalog'))[0]
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={category.mainColor} barStyle="light-content" />
        <Header categories={categories} navigation={navigation} leftIcon="md-arrow-back" mainColor={category.mainColor} secondColor={category.secondColor} title="Каталог" onPress={() => navigation.goBack()} /> 
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

const mapStateToProps = state => {
  return {
    categories: state.catalog.categories,
    mainCategory: state.catalog.mainCategory
  }
}
export default connect(mapStateToProps, { })(Catalog)