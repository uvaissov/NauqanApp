import React, { Component } from 'react'
import { Animated, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { addFavoritePlace, delFavoritePlace } from '../../actions/FavoriteActions'
import { BG_COLOR, genImageUri } from '../../constants/global'

class CardPlace extends Component {
  state = {
    fadeAnim: new Animated.Value(0) // Initial value for opacity: 0
  }
  componentDidMount() {
    Animated.timing( // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 300 // Make it take a while
      }
    ).start() // Starts the animation
  }

  _addToFav = (id) => {
    this.props.addFavoritePlace(id)
  }

  _remFromFav = (id) => {
    this.props.delFavoritePlace(id)
  }

  render() {
    const { item, navigation, places, catName } = this.props
    const { view, row, favoriteView, touchZone } = styles
    const { fadeAnim } = this.state
    const selected = places.includes(item.id)

    return (<TouchableHighlight style={[view, { height: 203, width: 152, marginHorizontal: 5, marginBottom: 10 }]} onPress={() => navigation.push('Item', {id: item.id, catName})} >
      <Animated.View style={{flex: 1, overflow: 'hidden', borderRadius: 6, opacity: fadeAnim}}>
        <View style={{ flex: 1 }}>
          <Image 
            style={{flex: 1, height: undefined, width: undefined }} 
            source={{uri: genImageUri(item.img)}} 
            resizeMode="stretch"
          />
        </View>
        <View style={row}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#170701', fontSize: 16, lineHeight: 19, opacity: 0.87, fontFamily: 'Roboto-Regular' }}>{item.name}</Text>
            <Text style={{ color: '#563DD0', fontSize: 12, lineHeight: 19, fontFamily: 'Roboto-Regular' }}>{item.count} предложений</Text>            
          </View>          
          <TouchableOpacity onPress={() => (selected ? this._remFromFav(item.id) : this._addToFav(item.id))} style={touchZone}>
            <View style={favoriteView}>
              <MaterialIcons name={selected === true ? 'favorite' : 'favorite-border'} size={14} style={!selected ? { color: '#170701' } : { color: '#FF6E36' }} />
            </View>
          </TouchableOpacity>
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
    height: 51,
    flexDirection: 'row',
    backgroundColor: BG_COLOR,
    position: 'relative'
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
export default connect(mapStateToProps, { addFavoritePlace, delFavoritePlace })(CardPlace)
