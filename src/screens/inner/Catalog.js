import React, {Component} from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { 
  _visibleSort, 
  _visibleSubCategory, 
  _visibleSearchResult, 
  getSubCategories, 
  cleanSubCategories, 
  cleanPlaces, 
  getPlacesByCatalog, 
  searchByCatalog, 
  _onSelectDir,
  onSelectSubCat
} from '../../actions/CatalogActions'
import { Header } from '../../components/uikit'
import CustomStatusBar from '../../components/uikit/CustomStatusBar'
import { SubCategory } from '../../components/uikit/SubCategory'
import CardPlaceDynamic from '../../components/uikit/CardPlaceDynamic'
import { w, BG_COLOR, normalize } from '../../constants/global'
import { ModalSubCategory } from '../../components/uikit/catalog/ModalSubCategory'

class Catalog extends Component { 
  componentDidMount() {
    this.props._visibleSearchResult(false)
    this._loadData(this.props.navigation.getParam('catalog'), this.props.dir, undefined, undefined)
  }  
  onSelectDir = (value) => {
    this.props._onSelectDir(value)
    this._loadData(this.props.navigation.getParam('catalog'), value)
  }
  _loadData = (cat_id, dir, sub_cat_id, text) => {
    this.props.getSubCategories(cat_id)
    this.props.getPlacesByCatalog(cat_id, dir, sub_cat_id, text)  
  }
  _showSort = (value) => { 
    this.props._visibleSort(value)
  }
  _showSubCat = (value) => { 
    this.props._visibleSubCategory(value)
  }
  _navigateToCatalog = (cat_id) => {    
    this.props.navigation.navigate('Catalog', {catalog: cat_id, scrollTo: undefined})
    this.props._visibleSearchResult(false)
    this._loadData(cat_id, this.props.dir, undefined, undefined)
  }
  _showSearchResult = (value) => { 
    this.props._visibleSearchResult(value)
  }
  _searchByCatalog=(text) => {
    //this.props.searchByCatalog(text, this.props.navigation.getParam('catalog'))
    const { dir, selectedSubCat } = this.props
    this.props.getPlacesByCatalog(this.props.navigation.getParam('catalog'), dir, selectedSubCat, text)  
  }

  _selectResult=(row) => {
    if (row.type === 'zavedenie') {
      this.props.navigation.push('Item', {id: row.id})
    } else if (row.type === 'product') {
      this.props.navigation.push('Sale', {id: row.id})
    }
    this._showSearchResult(false)
  }

  _onSelectSubCat = (sub_cat_id) => {
    this.props.onSelectSubCat(sub_cat_id)
    this._showSubCat(false)    
    this.props.getPlacesByCatalog(this.props.navigation.getParam('catalog'), this.props.dir, sub_cat_id, this.props.text)
  }

  render() {
    const { 
      navigation, 
      categories, 
      sub_categories, 
      places, 
      showSort, 
      showSubCategoryOption, 
      showSearchResult = false, 
      searchResults,
      dir,
      selectedSubCat,
      text
    } = this.props
    const category = categories.filter(cat => cat.id === navigation.getParam('catalog'))[0]
    const scrollTo = navigation.getParam('scrollTo')
    const itemWidth = w * 0.466
    this._renderController = () => {
      /*if (showSearchResult === true) {
        return this._resultRender()
      }*/
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
    this.selectedSubCatText = () => {
      const [sub] = sub_categories.filter((subIter) => subIter.id === selectedSubCat)
      return (<Text style={{ fontSize: 16}}>{sub.name}</Text>)
    }
    this._subCategoryRender = () => {
      return (
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => this._showSubCat(true)} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#EEEEEE'}}>
              {
                selectedSubCat && this.selectedSubCatText()
              }
              {
                !selectedSubCat &&
                <Text style={{ fontSize: 16}}>Все подкатегории</Text>
              }
              
              <Ionicons name={'md-arrow-dropdown'} style={{ fontSize: 16}} color={'#000000'} />            
            </View>
          </TouchableOpacity>      
          <ModalSubCategory category={category} selectedSubCat={selectedSubCat} onSelectSubCat={this._onSelectSubCat} visible={showSubCategoryOption} hideSort={() => this._showSubCat(false)} sub_categories={sub_categories} />
          <ScrollView style={[{ flex: 1}]}>          
            <View style={{ paddingTop: 10}}>
              {
                places.length > 0 && sub_categories.length > 0 &&
                sub_categories.map((sub) => {
                  const place = places.filter(pl => sub.id === pl.sub_cat_id)//array
                  if (place.length === 0) {
                    return null
                  }
                  if (selectedSubCat) {
                    return (
                      <ScrollView>
                        <FlatList 
                          columnWrapperStyle={{ justifyContent: 'space-between'}}
                          data={places}
                          numColumns={2} 
                          renderItem={(row) => <CardPlaceDynamic favorite width={itemWidth} onPress={() => navigation.push('Item', {id: row.item})} item={row.item} />}
                          keyExtractor={(item) => item.id}
                          style={{ padding: 5 }}
                        />
                      </ScrollView>
                    )
                  }
                  return (<SubCategory onSelectSubCat={this._onSelectSubCat} key={sub.id} places={place} mainColor={category.mainColor} navigation={navigation} item={{ id: sub.id, categoryName: sub.name}} />)
                })
              }
            </View>
          </ScrollView>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor={category.mainColor.trim()} barStyle="default" />
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
          dir={dir}
          onSelectDir={this.onSelectDir}
          text={text}
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
    //searchResults: state.catalog.searchResults,
    dir: state.catalog.dir,
    selectedSubCat: state.catalog.selectedSubCat,
    text: state.catalog.text
  }
}
export default connect(mapStateToProps, { _visibleSort, _visibleSubCategory, _visibleSearchResult, getSubCategories, cleanSubCategories, cleanPlaces, getPlacesByCatalog, searchByCatalog, _onSelectDir, onSelectSubCat })(Catalog)
