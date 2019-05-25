import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  FlatList
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { selectCity } from '../../actions/CityActions'
import { w } from '../../constants/global'

class CityOption extends Component {
  state = {
    modal: false
  };
  render() {
    const { items, selected } = this.props
    const [city = { name: 'Выберите город' }] = items.filter(
      ({ id }) => id === selected
    )
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ modal: true })
        }}
      >
        <View style={styles.cityView}>
          <MaterialIcons
            name="room"
            size={24}
            style={{ color: 'rgba(0, 0, 0, 0.4)' }}
          />
          <Text style={styles.cityText}>{city.name}</Text>
          <Ionicons
            name={'md-arrow-dropdown'}
            style={{ fontSize: 16 }}
            color={'rgba(0, 0, 0, 0.5)'}
          />
        </View>
        <ModalSelect
          select={this.props.selectCity}
          selected={selected}
          items={items}
          modal={this.state.modal}
          showAction={action => this.setState({ modal: action })}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cityView: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  cityText: {
    flex: 1,
    marginLeft: 15
  }
})

const ModalSelect = props => {
  const { modal, showAction, items, selected, select } = props
  const { viewStyle, rowView, rowText } = stylesModal
  this._getIcon = id => {
    return selected === id ? (
      <MaterialIcons name="lens" size={24} style={{ color: 'black' }} />
    ) : (
      <MaterialIcons
        name="panorama-fish-eye"
        size={24}
        style={{ color: 'black' }}
      />
    )
  }
  this.select = id => {
    showAction(false)
    select(id)
  }
  return (
    <Modal
      visible={modal}
      animationType="fade"
      transparent
      onRequestClose={() => {
        showAction(false)
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          showAction(false)
        }}
      >
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.1)',
              justifyContent: 'center',
              alignItems: 'center'
            }
          ]}
        >
          <View style={viewStyle}>
            <View style={[rowView, { alignItems: 'center' }]}>
              <MaterialIcons
                name="room"
                size={24}
                style={{ color: 'rgba(0, 0, 0, 0.4)' }}
              />
              <Text
                style={[
                  rowText,
                  { fontSize: 20, fontWeight: '500', lineHeight: 28 }
                ]}
              >
                Выберите город
              </Text>
            </View>
            <FlatList
              data={items}
              keyExtractor={item => {
                return `id:${item.id}`
              }}
              renderItem={item => {
                const icons = this._getIcon(item.item.id)
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.select(item.item.id)
                    }}
                  >
                    <View style={rowView}>
                      <Text style={[rowText]}>{item.item.name}</Text>
                      {icons}
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const stylesModal = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#FAFAFA',
    height: w * 0.8 * 1.132,
    width: w * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 6 },
    shadowOpacity: 0.2,
    elevation: 4,
    borderRadius: 4
  },
  rowView: {
    padding: 15,
    paddingLeft: 25,
    flexDirection: 'row'
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal',
    fontFamily: 'Roboto-Regular',
    color: 'rgba(0, 0, 0, 0.87)'
  }
})

const mapStateToProps = state => {
  return {
    name: state.city.name,
    items: state.city.items,
    selected: state.city.selected
  }
}

export default connect(
  mapStateToProps,
  { selectCity }
)(CityOption)
