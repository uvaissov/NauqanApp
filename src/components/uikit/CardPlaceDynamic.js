import React, {Component} from 'react'
import { View, StyleSheet, Image, Text, TouchableHighlight, TouchableOpacity, Animated } from 'react-native'
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { BG_COLOR } from '../../constants/global'

class CardPlaceDynamic extends Component {
  state = {
    fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
    selected: false,
    width: this.props.width
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

  _calcHeightViewByWidth= (width) => {
    return width * 1.335
  }

  _calcHeightRowByWidth= (width) => {
    return width * 0.3
  }

  render() {
    const { item, style, onPress } = this.props
    const { view, row, favoriteView, touchZone } = styles
    const { fadeAnim, selected, width } = this.state
    return (<TouchableHighlight style={[view, { height: this._calcHeightViewByWidth(width), width, marginHorizontal: 5, marginBottom: 10 }, style]} onPress={onPress} >
      <Animated.View style={{flex: 1, overflow: 'hidden', borderRadius: 6, opacity: fadeAnim}}>
        <View style={{ flex: 1 }}>
          <Image 
            style={{flex: 1, height: undefined, width: undefined }} 
            source={item.source} 
            resizeMode="stretch"
          />
        </View>
        <View style={[row, { height: this._calcHeightRowByWidth(width)}]}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#170701', fontSize: 16, lineHeight: 19, opacity: 0.87, fontFamily: 'Roboto-Regular' }}>{item.title}</Text>
            <Text style={{ color: '#563DD0', fontSize: 12, lineHeight: 19, fontFamily: 'Roboto-Regular' }}>{item.count} предложений</Text>            
          </View>          
          <TouchableOpacity onPress={() => this.setState({selected: !selected })} style={touchZone}><View style={favoriteView}><EvilIcons name={'trash'} size={16} style={!selected ? { color: '#170701' } : { color: '#FF6E36' }} /></View></TouchableOpacity>
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

export { CardPlaceDynamic }
