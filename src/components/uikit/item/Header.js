import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { getPlacesByZav, selectDirItem } from '../../../actions/ItemActions'
import { ModalSort} from './ModalSort'
import { w } from '../../../constants/global'

class Header extends Component {
  state = {
    searchShow: false,
    showModalSort: false
  }

  componentWillUnmount() {
    this.props.selectDirItem('asc')
  }
  
  onSelectDir= (dir) => {
    this.props.selectDirItem(dir)
    this.props.getPlacesByZav(this.props.itemId, this.props.text, dir)
  }

  render() {
    const {
      itemId,
      leftIcon,
      leftColor,
      headerColor,
      onPress,
      style,
      iconFunnel,
      iconSearch,
      text: inputValue,
      dir
    } = this.props

    const { viewStyle, leftButtonStyle, rightButtonStyle, inputStyle } = styles
    const { searchShow } = this.state

    const showLeftIcon = leftIcon ? (
      <TouchableOpacity onPress={onPress}>
        <Ionicons
          name={leftIcon}
          style={[leftButtonStyle, { paddingLeft: 15 }]}
          color={leftColor}
        />
      </TouchableOpacity>
    ) : null
    const showSearchInput = searchShow ? (
      <TextInput
        value={inputValue}
        autoFocus
        style={[
          inputStyle,
          { paddingBottom: 0, paddingLeft: leftIcon ? 15 : 0 }
        ]}
        onChangeText={(text) => {
          console.log(text)
          this.props.getPlacesByZav(itemId, text, dir)
        }}
      />
    ) : null
    const showSearchIcon =
      !searchShow && iconSearch ? (
        <TouchableOpacity onPress={() => this.setState({ searchShow: true })}>
          <Ionicons
            name="md-search"
            size={24}
            color="white"
            style={[leftButtonStyle, { marginRight: 10 }]}
          />
        </TouchableOpacity>
      ) : null
    const showIconFunnel =
      !searchShow && iconFunnel ? (
        <TouchableOpacity 
          onPress={() => {
            this.setState({ showModalSort: true })
          }}
        >
          <Ionicons
            name="md-funnel"
            size={24}
            color="white"
            style={[leftButtonStyle, { marginRight: 10 }]}
          />
        </TouchableOpacity>
      ) : null
    const showCloseIcon =
      iconSearch && searchShow ? (
        <TouchableOpacity
          onPress={() => {
            this.props.getPlacesByZav(itemId, '', dir)
            this.setState({ searchShow: false })
          }}
        >
          <Ionicons
            name={'ios-close'}
            style={[rightButtonStyle, { fontSize: 24 }]}
            color={'white'}
          />
        </TouchableOpacity>
      ) : null
    return (
      <View style={[viewStyle, style, { backgroundColor: headerColor }]}>
        <ModalSort dir={dir} onSelectDir={this.onSelectDir} visible={this.state.showModalSort} hideSort={() => this.setState({showModalSort: false})} />
        {showLeftIcon}
        <View style={{ flex: 1 }}>{showSearchInput}</View>
        {showIconFunnel}
        {showSearchIcon}
        {showCloseIcon}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingBottom: 15,
    position: 'relative',
    ...ifIphoneX(
      {
        height: 70
      },
      {
        height: 70
      }
    )
  },
  textStyle: {
    width: w - 60
  },
  leftButtonStyle: {
    fontSize: 25
  },
  inputStyle: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    flex: 1,
    color: 'white'
  },
  rightButtonStyle: {
    fontSize: 24,
    marginRight: 15
  }
})

const mapStateToProps = state => {
  return {
    text: state.item.text,
    dir: state.item.dir
  }
}

export default connect(
  mapStateToProps,
  { getPlacesByZav, selectDirItem }
)(Header)
