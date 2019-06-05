import React, { Component } from 'react'
import { Keyboard, View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TextInput, Text, FlatList, ScrollView, Image } from 'react-native'
//import Autocomplete from 'react-native-autocomplete-input'
//import { ifIphoneX } from 'react-native-iphone-x-helper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '../../svgkit/Icon'

import { w, statusBarHeight, BG_COLOR, hostName, genImageUri, normalize } from '../../../constants/global'

class HeaderMain extends Component {
  state = {
    data: [],
    value: '',
    showResults: false
  }

  onChangeText = (text) => {
    this.setState({value: text})
    if (this.searchWaiting) {
      clearTimeout(this.searchWaiting)
    }
    this.searchWaiting = setTimeout(() => {
      this.searchWaiting = null
      this.searchByText(text)  
    }, 300)  
  }

  searchByText = async (text) => {
    this.setState({value: text})
    if (text === '') {
      this.setState({data: []})
      return
    }
    const URL = `${hostName}/search?text=${text}`    
    fetch(URL, {
      method: 'GET'
    }).then((res) => res.json())
      .then((data) => this.setState({data})
      )      
  }
  renderItem=((item) => {
    const { navigation, categories } = this.props
    const { id, name, cat_id } = item.item
    let press 
    if (item.item.type === 'product') {
      press = (() => { navigation.push('Sale', {id}) })
    } else if (item.item.type === 'zavedenie') {
      press = (() => { navigation.push('Item', {id}) })
    }
    const [category = {}] = categories.filter((cat) => cat.id === cat_id)
    return (
      <TouchableOpacity onPress={() => press()}>
        <View style={{flex: 1, flexDirection: 'row', marginVertical: 7, borderBottomWeigth: 1 }}>
          <Image style={{ height: 20, width: 20, marginRight: 10 }} source={{ uri: genImageUri(category.enableIcon) }} resizeMode="contain" />
          <Text style={{fontSize: normalize(14), fontWeight: '400'}}>{name}</Text>
        </View>
      </TouchableOpacity>
    )
  })
  
  render() {
    const { leftIcon, headerColor, onPress, style } = this.props
    const { touchContainer, viewStyle, containerStyle, textStyle, leftButtonStyle, rightButtonStyle, resultContainer } = styles
    const { value, data, showResults } = this.state
    return (
      <View style={[viewStyle, style, {backgroundColor: headerColor, height: showResults ? 300 : 100 }]}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.8]}
          useAngle
          angle={180}
          style={{height: 100, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', paddingHorizontal: 20, paddingBottom: 30}}
        >
          {leftIcon &&
        <TouchableOpacity onPress={onPress}>          
          <Icon name="menu" height="20" width="20" fill="#fff" style={leftButtonStyle} />
        </TouchableOpacity>
          }
          <View style={containerStyle} >
            <TextInput
              placeholder='Поиск'
              style={textStyle}
              placeholderTextColor="white"
              onChangeText={text => this.onChangeText(text)}
              value={value}
              onFocus={() => this.setState({showResults: true})}
              onBlur={() => this.setState({showResults: false})}
            />                     
            <Ionicons name="md-search" style={[rightButtonStyle]} color="white" />        
          </View>
        </LinearGradient>
        { showResults && data.length > 0 &&
          <TouchableWithoutFeedback
            onPress={() => { 
              Keyboard.dismiss() 
              this.setState({showResults: false})
            }} style={touchContainer}
          >
            <View style={resultContainer}>
              <ScrollView keyboardShouldPersistTaps={'handled'} >
                <FlatList
                  keyboardShouldPersistTaps={'handled'}
                  data={data}
                  renderItem={this.renderItem}
                  keyExtractor={(item) => item.id}
                />
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        }
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  touchContainer: {
    flex: 1,
    position: 'absolute', 
    zIndex: 5, 
    top: statusBarHeight + 40
  },
  resultContainer: {
    marginLeft: 75,
    borderRadius: 4,
    maxHeight: 220, 
    width: w - 130, 
    backgroundColor: BG_COLOR,
    padding: 10
  },
  viewStyle: {
    justifyContent: 'flex-start',    
    position: 'relative',
    alignItems: 'flex-start'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    marginLeft: 25,
    color: '#fff'
  },
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 40,
    alignItems: 'center',
    borderRadius: 33,
    marginLeft: 15
  },
  leftButtonStyle: {
    marginBottom: 10
  },
  rightButtonStyle: {
    fontSize: 30,
    marginRight: 15
  }
})

export default HeaderMain
