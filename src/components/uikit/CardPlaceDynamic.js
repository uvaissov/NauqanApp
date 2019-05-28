import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Animated
} from 'react-native'
import { connect } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import {
  addFavoritePlace,
  delFavoritePlace
} from '../../actions/FavoriteActions'
import { BG_COLOR, genImageUri, ITEM, hostName } from '../../constants/global'

class CardPlaceDynamic extends Component {
  state = {
    fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
    selected: false
  }
  async componentDidMount() {
    const item = this.props.item
    if (!item.img) {
      this._fecthData(item)
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
  _fecthData = (item) => {
    fetch(`${hostName}/zavedeniya?id=${item.id}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => { this.setState({item: data[0]}) })         
  }

  _calcHeightViewByWidth = width => { 
    return width
  }

  _calcHeightRowByWidth = width => {
    return width * 0.3
  }

  _addToFav = (id, name) => {
    this.props.addFavoritePlace(id, ITEM, name)
  }

  _remFromFav = id => {
    this.props.delFavoritePlace(id, ITEM)
  }

  render() {
    const { style, onPress, favorite, trash, places, horizontal, width } = this.props
    let { item } = this.state 
    if (!item) {
      item = this.props.item
    }
    const { view, row, favoriteView, touchZone } = styles
    const { fadeAnim } = this.state
    const selected = places.findIndex(({ id, type}) => { return (id === item.id && type === ITEM) }) > -1
    let heightParam = width
    let widthParam = width
    if (horizontal) {
      widthParam *= 0.3
      heightParam *= 0.35
    }
    return (
      <TouchableHighlight
        style={[view, { width, marginHorizontal: 5, marginBottom: 10 }, style]}
        onPress={onPress}
      >
        <Animated.View
          style={{
            flex: 1,
            overflow: 'hidden',
            borderRadius: 6,
            opacity: fadeAnim,
            flexDirection: horizontal ? 'row' : 'column'
          }}
        >
          <View style={{ height: heightParam, width: widthParam }}>
            <Image
              style={{
                flex: 1,
                height: undefined,
                width: undefined
              }}
              source={{ uri: genImageUri(item.img) }}
              resizeMode="cover"
            />
          </View>
          <View style={[row]}>
            <View style={{ flex: 1 }}>
              <Text 
                ellipsizeMode="tail" 
                numberOfLines={horizontal ? 2 : 1}
                style={{
                  color: '#170701',
                  fontSize: 16,
                  lineHeight: 19,
                  opacity: 0.87,
                  fontFamily: 'Roboto-Regular',
                  marginRight: 35
                }}
              >
                {item.name}
              </Text>
              <View style={{flex: 1}} />
              <Text
                style={{
                  color: '#563DD0',
                  fontSize: 12,
                  lineHeight: 19,
                  fontFamily: 'Roboto-Regular'
                }}
              >
                {item.count} предложений
              </Text>
            </View>
            {trash && (
              <TouchableOpacity
                onPress={() => this._remFromFav(item.id)}
                style={touchZone}
              >
                <View style={favoriteView}>
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
                style={touchZone}
              >
                <View style={favoriteView}>
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
        </Animated.View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    backgroundColor: BG_COLOR,
    position: 'relative',
    flex: 1
  },
  touchZone: {
    position: 'absolute',
    top: 0,
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

    elevation: 4
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
)(CardPlaceDynamic)
