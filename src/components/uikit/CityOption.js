import React, {Component} from 'react'
import { View, Text, StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

class CityOption extends Component {
  render() {
    const { name } = this.props
    return (
      <View style={styles.cityView}>
        <MaterialIcons name="room" size={24} style={{ color: 'rgba(0, 0, 0, 0.4)' }} />
        <Text style={styles.cityText}>{name}</Text>
        <Ionicons name={'md-arrow-dropdown'} style={{ fontSize: 16}} color={'rgba(0, 0, 0, 0.5)'} />
      </View>
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

const mapStateToProps = state => {
  return {
    name: state.city.name
  }
}

export default connect(mapStateToProps, { })(CityOption)
