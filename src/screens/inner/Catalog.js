import React, {Component} from 'react'
import { Text, StyleSheet, View, ScrollView, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { _visibleSort, _visibleSubCategory, _visibleSearchResult, getSubCategories, cleanSubCategories, cleanPlaces, getPlacesByCatalog, searchByCatalog } from '../../actions/CatalogActions'
import { Header } from '../../components/uikit'
import { SubCategory } from '../../components/uikit/SubCategory'
import { BG_COLOR, normalize } from '../../constants/global'
import { ModalSubCategory } from '../../components/uikit/catalog/ModalSubCategory'

class Catalog extends Component { 
  componentDidMount() {
    //this.props.cleanSubCategories()
    //this.props.cleanPlaces()
    this.props.getSubCategories(this.props.navigation.getParam('catalog'))
    this.props.getPlacesByCatalog(this.props.navigation.getParam('catalog')) 
  }

  _showSort = (value) => { 
    this.props._visibleSort(value)
  }
  _showSubCat = (value) => { 
    this.props._visibleSubCategory(value)
  }
  _navigateToCatalog = (name) => {    
    this.props.navigation.navigate('Catalog', {catalog: name, scrollTo: undefined})
    //this.props.cleanSubCategories()
    //this.props.cleanPlaces()
    this.props.getSubCategories(name)
    this.props.getPlacesByCatalog(name)    
  }
  _showSearchResult = (value) => { 
    this.props._visibleSearchResult(value)
  }

  _searchByCatalog=(text) => {
    this.props.searchByCatalog(text, this.props.navigation.getParam('catalog'))
  }

  _selectResult=(row) => {
    if (row.type === 'zavedenie') {
      this.props.navigation.push('Item', {id: row.id})
    } else if (row.type === 'product') {
      this.props.navigation.push('Sale', {id: row.id})
    }
    this._showSearchResult(false)
  }

  render() {
    const { navigation, categories, sub_categories, places, showSort, showSubCategoryOption, showSearchResult, searchResults } = this.props
    const category = categories.filter(cat => cat.id === navigation.getParam('catalog'))[0]
    const scrollTo = navigation.getParam('scrollTo')

    this._renderController = () => {
      if (showSearchResult === true) {
        return this._resultRender()
      }
      return this._subCategoryRender() 
    }

    this._resultRender = () => {
      return (
        <View>
          <FlatList 
            keyExtractor={(row) => row.id + row.name} 
            data={searchResults} 
            renderItem={(row) => (
              <TouchableOpacity onPress={() => this._selectResult(row.item)}>
                <View style={styles.searchStyleView}>
                  <Text style={styles.searchStyleText}>{row.item.name}</Text>
                </View>
              </TouchableOpacity>
            )} 
          />
        </View>
      )
    }

    this._subCategoryRender = () => {
      return (
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => this._showSubCat(true)} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#EEEEEE'}}>
              <Text style={{ fontSize: 16}}>Все подкатегории</Text>
              <Ionicons name={'md-arrow-dropdown'} style={{ fontSize: 16}} color={'#000000'} />            
            </View>
          </TouchableOpacity>      
          <ModalSubCategory catColor={category.mainColor} catName={category.name} visible={showSubCategoryOption} hideSort={() => this._showSubCat(false)} sub_categories={sub_categories} />
          <ScrollView style={[{ flex: 1}]}>          
            <View style={{ paddingTop: 10}}>
              {
                places.length > 0 && sub_categories.length > 0 &&
                sub_categories.map((sub) => {
                  const place = places.filter(pl => sub.id === pl.sub_cat_id)//array
                  console.log(place)
                  if (place.length === 0) {
                    return null
                  }
                  return (<SubCategory key={sub.id} places={place} mainColor={category.mainColor} navigation={navigation} item={{ categoryName: sub.name}} />)
                })
              }
            </View>
          </ScrollView>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar animated backgroundColor={category.mainColor.trim()} barStyle="default" />
        <Header 
          visibleSort={showSort} 
          sortPress={this._showSort} 
          searchPress={(value) => this._showSearchResult(value)} 
          scrollTo={scrollTo} 
          categories={categories} 
          category={category} 
          navigation={this._navigateToCatalog} 
          leftIcon="md-arrow-back" 
          mainColor={category.mainColor.trim()} 
          secondColor={category.secondaryColor.trim()} 
          title="Каталог" 
          onPress={() => navigation.goBack()}
          showSearchResult={showSearchResult}
          searchByCatalog={this._searchByCatalog}
        />
        {this._renderController()}
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: BG_COLOR
  },
  searchStyleView: {
    height: 50, justifyContent: 'center', paddingLeft: 70, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.12)'  
  },
  searchStyleText: {
    fontSize: normalize(16), fontFamily: 'Roboto-Regular', fontStyle: 'normal', color: 'black'
  }
})

const mapStateToProps = state => {
  return {
    categories: state.catalog.categories,
    sub_categories: state.catalog.sub_categories,
    places: state.catalog.places,
    showSort: state.catalog.visibleSort,
    showSubCategoryOption: state.catalog.visibleSubCategory,
    showSearchResult: state.catalog.visibleSearchResult,
    searchResults: state.catalog.searchResults
  }
}
export default connect(mapStateToProps, { _visibleSort, _visibleSubCategory, _visibleSearchResult, getSubCategories, cleanSubCategories, cleanPlaces, getPlacesByCatalog, searchByCatalog })(Catalog)
