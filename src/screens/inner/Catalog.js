import React, {Component} from 'react'
import { Text, StyleSheet, View, ScrollView, StatusBar, TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { _visibleSort, _visibleSubCategory } from '../../actions'
import { Header } from '../../components/uikit'
import { SubCategory } from '../../components/uikit/SubCategory'
import { BG_COLOR } from '../../constants/global'
import { ModalSubCategory } from '../../components/uikit/catalog/ModalSubCategory'

class Catalog extends Component {
  _showSort = (value) => { 
    this.props._visibleSort(value)
  }
  _showSubCat = (value) => { 
    this.props._visibleSubCategory(value)
  }
  render() {
    const { navigation, categories, showSort, showSubCategoryOption } = this.props
    const category = categories.filter(cat => cat.id === navigation.getParam('catalog'))[0]
    const scrollTo = navigation.getParam('scrollTo')
    console.log('showSubCategoryOption', showSubCategoryOption)
      
    return (
      <View style={styles.container}>
        <StatusBar animated backgroundColor={category.mainColor} barStyle="default" />
        <Header visibleSort={showSort} sortPress={this._showSort} searchPress={() => navigation.goBack()} scrollTo={scrollTo} categories={categories} category={category} navigation={navigation} leftIcon="md-arrow-back" mainColor={category.mainColor} secondColor={category.secondaryColor} title="Каталог" onPress={() => navigation.goBack()} />         
        <ModalSubCategory visible={showSubCategoryOption} hideSort={() => this._showSubCat(false)} />
        <ScrollView style={[{ flex: 1}]}>
          <TouchableOpacity onPress={() => this._showSubCat(true)} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#EEEEEE'}}>
              <Text style={{ fontSize: 16}}>Все подкатегории</Text>
              <Ionicons name={'md-arrow-dropdown'} style={{ fontSize: 16}} color={'#000000'} />            
            </View>
          </TouchableOpacity>
          <View style={{ paddingTop: 10}}>
            <SubCategory mainColor={category.mainColor} navigation={navigation} item={{ categoryName: 'test1'}} />
            <SubCategory mainColor={category.mainColor} navigation={navigation} item={{ categoryName: 'test2'}} />
            <SubCategory mainColor={category.mainColor} navigation={navigation} item={{ categoryName: 'test3'}} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: BG_COLOR
  }
})

const mapStateToProps = state => {
  return {
    categories: state.catalog.categories,
    mainCategory: state.catalog.mainCategory,
    showSort: state.catalog.visibleSort,
    showSubCategoryOption: state.catalog.visibleSubCategory
  }
}
export default connect(mapStateToProps, { _visibleSort, _visibleSubCategory })(Catalog)
