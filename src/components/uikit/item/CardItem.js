import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableHighlight, TouchableOpacity, Animated } from 'react-native'
import FastImage from 'react-native-fast-image'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'
import Moment from 'moment'
import {
  addFavoritePlace,
  delFavoritePlace
} from '../../../actions/FavoriteActions'
import { BG_COLOR, normalize, genImageUri, SALE, hostName } from '../../../constants/global'

class CardItem extends Component {   
  state = {
    fadeAnim: new Animated.Value(0) // Initial value for opacity: 0
  }  
  componentDidMount() {
    const item = this.props.item
    if (!item.img) {
      this._fecthData(item)
      console.log('_fecthData')      
    }
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 300 // Make it take a while
      }
    ).start() // Starts the animation
  }

  componentDidUpdate() {
    console.log('update card item')    
  }

  _fecthData = (item) => {
    fetch(`${hostName}/product?id=${item.id}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => { this.setState({item: data[0]}) })         
  }

  _addToFav = (id, name) => {
    this.props.addFavoritePlace(id, SALE, name)
  }

  _remFromFav = id => {
    this.props.delFavoritePlace(id, SALE)
  }

  render() {
    const { push, style, horizontal, favorite, trash, places } = this.props
    const { fadeAnim } = this.state
    let { item } = this.state 
    if (!item) {
      item = this.props.item
    }
    const { view, row } = styles
    const selected = places.findIndex(({ id, type}) => id === item.id && type === SALE) > -1
    let height = style.width
    let width = style.width
    if (horizontal) {
      width *= 0.3
      height *= 0.35
    }
    return (
      <TouchableHighlight style={[style, view]} onPress={() => push()} >      
        <Animated.View style={{flex: 1, overflow: 'hidden', borderRadius: 6, flexDirection: horizontal ? 'row' : 'column', opacity: fadeAnim }}>        
          <View style={{ height, width }}>
            <FastImage 
              style={{flex: 1, height: undefined, width: undefined }} 
              source={{uri: genImageUri(item.img)}}
              resizeMode={FastImage.resizeMode.cover}
            />          
          </View>        
          <View style={row}>
            <View style={{ flex: 1}}>
              <Text ellipsizeMode="tail" numberOfLines={2} style={{ marginBottom: 10, marginRight: 40, fontFamily: 'Roboto-Regular', fontSize: normalize(16), lineHeight: 19, color: 'rgba(0, 0, 0, 0.87)' }}>{item.name}</Text>
              {
                horizontal && 
                <View style={{ minHeight: 19, marginBottom: 10}}>
                  { item.ekonom && 
                    <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(12), color: 'rgba(0, 0, 0, 1)', lineHeight: 19}}>
                      Вы сэкономите <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(12), color: '#FF6E36'}}> {item.ekonom} тенге </Text>
                    </Text>
                  }
                </View>
              }            
              <View style={{ minHeight: 14, marginBottom: 10 }}>
                { item.date_en && 
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name="access-time" size={14} style={{ color: '#FF6E36' }} />
                  <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(11), color: 'rgba(0, 0, 0, 0.4)', lineHeight: 14, marginLeft: 5}}>
                    Действует до {Moment(item.date_en).format('DD.MM.YYYY')}
                  </Text>
                </View>
                }
              </View>
              {
                item.skidka_price &&
                <View style={{ flexDirection: ((item.price && item.price > 100000) || (item.skidka_price && item.skidka_price > 100000)) ? 'column' : 'row', width: '80%'}}>
                  <Text ellipsizeMode="tail" style={{fontFamily: 'Roboto-Regular', fontSize: normalize(14), color: '#979797', textDecorationLine: 'line-through', marginRight: 5 }} >{item.price}</Text>
                  <Text ellipsizeMode="tail" style={{fontFamily: 'Roboto-Regular', fontSize: normalize(14), color: '#FF6E36'}}>{item.skidka_price} тенге</Text>
                </View>
              }
              {
                !item.skidka_price &&
                <View style={{ flexDirection: 'row'}}>                  
                  <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(14), color: '#FF6E36', marginLeft: 5}}>{item.price} тенге</Text>
                </View>
              }
              
            </View>
            {trash && (
              <TouchableOpacity
                onPress={() => this._remFromFav(item.id)}
                style={styles.touchZone}
              >
                <View style={styles.favoriteView}>
                  <EvilIcons
                    name={'trash'}
                    size={16}
                    style={
                      { color: '#170701' }
                    }
                  />
                </View>
              </TouchableOpacity>
            )}
            {favorite && (
              <TouchableOpacity
                onPress={() =>
                  (selected ? this._remFromFav(item.id) : this._addToFav(item.id, item.name))
                }
                style={[styles.touchZone, !horizontal ? {bottom: 5} : {top: 5}]}
              >
                <View style={styles.favoriteView}>
                  <MaterialIcons
                    name={selected === true ? 'favorite' : 'favorite-border'}
                    size={14}
                    style={
                      !selected ? { color: '#170701' } : { color: '#FF6E36' }
                    }
                  />
                </View>
              </TouchableOpacity>
            )}        
          </View>
          {/*skidka*/
            item.skidka &&
        <View style={[styles.skidkaView, horizontal ? {bottom: 15} : {top: 5}]}>
          <Text style={styles.skidkaText}>Скидка {item.skidka}%</Text>
        </View>
          }
          
        </Animated.View>
      </TouchableHighlight>

    )
  }
}

const styles = StyleSheet.create({
  row: {
    paddingLeft: 10,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: BG_COLOR
  },
  view: {
    borderRadius: 6,
    backgroundColor: BG_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.22,
    marginHorizontal: 5, 
    marginBottom: 10,
    elevation: 4,
    position: 'relative'
  },
  skidkaView: {
    position: 'absolute',
    backgroundColor: '#FF6E36',
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    zIndex: 1
  },
  skidkaText: {
    fontFamily: 'Roboto-Regular', fontSize: normalize(12), color: 'white', lineHeight: 19
  },
  touchZone: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20
  },
  favoriteView: {
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
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
    places: state.favorite.places
  }
}
export default connect(
  mapStateToProps,
  { addFavoritePlace, delFavoritePlace }
)(CardItem)

