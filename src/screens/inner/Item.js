import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground, FlatList, ScrollView, Image, TouchableHighlight, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
//import Spinner from 'react-native-loading-spinner-overlay'
import { ColorDotsLoader } from 'react-native-indicator'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import CustomStatusBar from '../../components/uikit/CustomStatusBar'
import { getZav, getPlacesByZav, cleanZav, selectHorizontalItem } from '../../actions/ItemActions'
import {
  addFavoritePlace,
  delFavoritePlace
} from '../../actions/FavoriteActions'
import Header from '../../components/uikit/item/Header'
import CardItem from '../../components/uikit/item/CardItem'
import { w, genImageUri, normalize, statusBarHeight, ITEM } from '../../constants/global'

class Item extends Component {
  state = {
    didFinishInitialAnimation: false
  }

  // Lifecycle methods
  componentDidMount() {
    console.log('componentDidMount Item')
    this.props.getZav(this.props.navigation.getParam('id'))
    this.props.getPlacesByZav(this.props.navigation.getParam('id'), this.props.text, this.props.dir)
    // 1: Component is mounted off-screen
    this.setState({
      didFinishInitialAnimation: true
    })
  }
  componentDidUpdate() {
    console.log('update')
  }

  onPressCartItem = (id) => {
    this.props.navigation.push('Sale', { id })
  }

  _selectHorizontalItem = (value) => {
    this.props.selectHorizontalItem(value)
  }

  keyExtractor = (item) => item.id.toString()

  _addToFav = (id, name) => {
    this.props.addFavoritePlace(id, ITEM, name)
  }

  _remFromFav = id => {
    this.props.delFavoritePlace(id, ITEM)
  }

  _renderItem = (item) => {
    const { horizontal } = this.props
    const widthItem = horizontal ? (w - 8) : (w / 2) - 10
    return (<CardItem favorite horizontal={horizontal} style={{ width: widthItem }} push={() => this.onPressCartItem(item.item.id)} item={item.item} />)
  }

  render() {
    const { navigation, items, zav, categories, horizontal, places } = this.props
    if (this.state.didFinishInitialAnimation === false || !zav.id) {
      return (
        <View style={styles.container}>
          <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ColorDotsLoader />
          </View>
        </View>)
    }
    const selected = places.findIndex(({ id, type }) => { return (id === zav.id && type === ITEM) }) > -1
    const [category = {}] = categories.filter((cat) => cat.id === zav.cat_id)

    const flatList = horizontal ? (
      <FlatList
        key={23}
        numColumns={1}
        data={items}
        renderItem={this._renderItem}
        keyExtractor={this.keyExtractor}
      />
    ) : (
      <FlatList
        key={12}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}
        data={items}
        renderItem={this._renderItem}
        keyExtractor={this.keyExtractor}
      />
    )
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
        <Header itemId={this.props.navigation.getParam('id')} iconFunnel iconSearch leftColor="white" style={{ position: 'absolute', width: w, top: statusBarHeight, zIndex: 1 }} leftIcon="md-arrow-back" title="Главная" onPress={() => navigation.goBack()} />
        <ScrollView>
          <View style={{ width: w, height: getComponentHeight(w) }}>
            <ImageBackground
              style={{ flex: 1, height: undefined, width: undefined }}
              source={{ uri: genImageUri(zav.img) }}
              resizeMode="cover"
            >

              <View style={{ flex: 1 }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 36, backgroundColor: 'white', position: 'absolute', height: 72, width: 72, bottom: -36, left: ((w / 2) - 36) }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', height: 62, width: 62, backgroundColor: 'black', borderRadius: 36 }}>
                    <Text style={{ fontFamily: 'Roboto-Regular', color: 'white', fontSize: 12, lineHeight: 14 }}>VISIT</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => (selected ? this._remFromFav(zav.id) : this._addToFav(zav.id, zav.name))} style={styles.touchZone} >
                  <View style={styles.favoriteView}>
                    <MaterialIcons name={selected === true ? 'favorite' : 'favorite-border'} size={20} style={!selected ? { color: '#170701' } : { color: '#FF6E36' }} />
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={{ alignItems: 'center', marginTop: 43 }}>
            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: normalize(16), color: 'black', marginHorizontal: 15 }}>{zav.name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
              <Image style={{ height: 14, width: 14, marginRight: 5 }} source={{ uri: genImageUri(category.enableIcon) }} resizeMode="contain" />
              <Text style={{ fontFamily: 'Roboto-Regular', color: category.mainColor, fontSize: normalize(12) }}>{category.name}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 15, marginTop: 15, backgroundColor: '#EBF2F5', alignItems: 'center' }}>
            <MaterialIcons name="room" size={25} style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
            <Text ellipsizeMode="tail" style={{flex: 1, color: 'rgba(0, 0, 0, 0.87)', fontFamily: 'Roboto-Regular', paddingLeft: 10 }}>{zav.city}, {zav.address}</Text>
            { zav.lat && zav.lng &&
            <TouchableOpacity>
              <MaterialIcons name='directions' size={25} style={{ color: '#FF6E36' }} onPress={() => navigation.navigate('MapLocation', {point: zav })} />
            </TouchableOpacity>
            }
          </View>
          <View style={{ width: w, overflow: 'hidden', paddingHorizontal: 15, paddingVertical: 20 }}>
            <Text numberOfLines={6} style={{ fontFamily: 'Roboto-Regular', color: 'rgba(0, 0, 0, 0.5)' }}>{zav.description}</Text>
          </View>
          <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          <View>
            {
              items &&
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, marginTop: 5 }}>
                  <Text style={{ fontFamily: 'Roboto-Regular', fontWeight: '500', flex: 1, fontSize: normalize(14), color: 'rgba(0, 0, 0, 0.5)' }}>Предложения</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableHighlight style={{ marginLeft: 10 }} onPress={() => this._selectHorizontalItem(true)}>
                      <View style={[styles.buttonView, horizontal ? styles.buttonViewShadow : null]}>
                        <MaterialIcons name="view-list" size={28} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{ marginLeft: 10 }} onPress={() => this._selectHorizontalItem(false)}>
                      <View style={[styles.buttonView, !horizontal ? styles.buttonViewShadow : null]}>
                        <MaterialIcons name="view-module" size={28} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={{ paddingVertical: 5 }}>
                  {flatList}
                </View>
              </View>
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const getComponentHeight = (weight) => {
  return weight * 0.732
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  buttonView: {
    backgroundColor: 'white'
  },
  buttonViewShadow: {
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.22,
    elevation: 4
  },
  touchZone: {
    position: 'absolute',
    bottom: -30,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 30
  },
  favoriteView: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.22,
    shadowColor: 'black',
    elevation: 4,
    backgroundColor: 'white'
  }
})

const mapStateToProps = state => {
  return {
    categories: state.catalog.categories,
    items: state.item.items,
    zav: state.item.item,
    horizontal: state.item.horizontal,
    places: state.favorite.places
  }
}
export default connect(mapStateToProps, {
  getZav, getPlacesByZav, cleanZav, selectHorizontalItem, addFavoritePlace, delFavoritePlace
})(Item)
