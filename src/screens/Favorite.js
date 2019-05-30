import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { w, h, TRASPARENT, BG_COLOR, normalize, ITEM } from '../constants/global'
import CustomStatusBar from '../components/uikit/CustomStatusBar'
import { Header } from '../components/uikit/favorite/Header'
import CardPlaceDynamic from '../components/uikit/CardPlaceDynamic'
import CardItem from '../components/uikit/item/CardItem'
import { selectHorizontalItem } from '../actions/FavoriteActions'

class Favorite extends Component { 
  state = {
    searchText: '',
    showSearch: false
  }
  _selectHorizontalItem = (value) => {
    this.props.selectHorizontalItem(value)
  }
  _renderItem = (row) => {
    const { navigation, horizontal } = this.props
    const widthItem = horizontal ? (w - 8) : (w / 2) - 10
    console.log('widthItem:', widthItem)    
    if (row.item.type === ITEM) {
      return (<CardPlaceDynamic horizontal={horizontal} trash width={widthItem} onPress={() => navigation.push('Item', {id: row.item.id})} item={{ id: row.item.id, name: row.item.name }} />)
    }
    return (<CardItem style={{width: widthItem}} horizontal={horizontal} trash push={() => navigation.push('Sale', {id: row.item.id})} item={{ id: row.item.id, name: row.item.name }} />)
  }
  render() {
    const { navigation, places, horizontal } = this.props
    const { searchText } = this.state
    let data = places
    if (searchText) {
      data = places.filter((row) => row.name.toLowerCase().includes(searchText.toLowerCase()))
    }

    const flatList = horizontal ? (
      <FlatList
        key={`${1}_id`}
        numColumns={1}       
        data={data}
        renderItem={this._renderItem}
        keyExtractor={(item) => `${item.id} - ${item.type}`}
      />
    ) : (
      <FlatList 
        key={`${2}_id`}
        columnWrapperStyle={{ justifyContent: 'space-between'}}
        data={data}
        numColumns={2} 
        renderItem={this._renderItem}
        keyExtractor={(item) => `${item.id} - ${item.type}`}
      />      
    )
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
        <Header 
          visibleSort
          searchText={this.state.searchText}
          showSearch={this.state.showSearch}
          searchPress={(value) => this.setState({showSearch: value})} 
          navigation={this._navigateToCatalog} 
          leftIcon="md-menu" 
          mainColor="#45A460"
          secondColor="#A9D334" 
          title="Избранное" 
          onPress={() => navigation.openDrawer()} 
          searchByText={(text) => this.setState({searchText: text})}
        />  
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, marginTop: 5 }}>
            <Text style={{ fontFamily: 'Roboto-Regular', fontWeight: '500', flex: 1, fontSize: normalize(14), color: 'rgba(0, 0, 0, 0.5)' }}>Предложения</Text>
            <View style={{ flexDirection: 'row'}}>
              <TouchableOpacity style={{ marginLeft: 10}} onPress={() => this._selectHorizontalItem(true)}>
                <View style={[styles.buttonView, horizontal ? styles.buttonViewShadow : null]}>
                  <MaterialIcons name="view-list" size={28} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10}} onPress={() => this._selectHorizontalItem(false)}>
                <View style={[styles.buttonView, !horizontal ? styles.buttonViewShadow : null]}>
                  <MaterialIcons name="view-module" size={28} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            {flatList}
          </ScrollView>
        </View>
        <View style={[styles.shadowBox, { backgroundColor: TRASPARENT, height: h * 0.07}]} >          
          <View style={[{flex: 1, backgroundColor: BG_COLOR, flexDirection: 'row', justifyContent: 'space-between'}, styles.scrollView]}>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Main')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="home" size={24} /><Text style={{textAlign: 'center'}}>Главная</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('MapPlaces')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="room" size={24} /><Text style={{textAlign: 'center'}}>На карте</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Favorite')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="favorite" size={24} style={{ color: '#FF6E36', textAlign: 'center' }} /><Text style={{ color: '#FF6E36' }} >Избранные</Text></View>
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

const mapStateToProps = state => {
  return {
    places: state.favorite.places,
    horizontal: state.favorite.horizontal
  }
}
export default connect(mapStateToProps, { selectHorizontalItem })(Favorite)
