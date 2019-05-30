import React, {Component} from 'react'
import { Text, StyleSheet, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ColorDotsLoader } from 'react-native-indicator'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import Moment from 'moment'
import CustomStatusBar from '../../components/uikit/CustomStatusBar'
import { getSale } from '../../actions/SaleActions'
import {
  addFavoritePlace,
  delFavoritePlace
} from '../../actions/FavoriteActions'
import Header from '../../components/uikit/item/Header'
import { w, normalize, genImageUri, statusBarHeight, SALE } from '../../constants/global'

class Sale extends Component {
  state = {
    didFinishInitialAnimation: false
  }

  // Lifecycle methods
  componentDidMount() {
    this.props.getSale(this.props.navigation.getParam('id'))    
    this.setState({
      didFinishInitialAnimation: true
    })
  }
  _addToFav = (id, name) => {
    this.props.addFavoritePlace(id, SALE, name)
  }

  _remFromFav = id => {
    this.props.delFavoritePlace(id, SALE)
  }
  render() {
    const { navigation, item, places } = this.props
    const selected = places.findIndex(({ id, type }) => { return (id === item.id && type === SALE) }) > -1
    if (this.state.didFinishInitialAnimation === false || !item.id) {
      return (
        <View style={styles.container}>
          <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ColorDotsLoader />
          </View>
        </View>)
    }
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
        <Header leftColor="white" style={{position: 'absolute', width: w, top: statusBarHeight, zIndex: 1}} leftIcon="md-arrow-back" title="Главная" onPress={() => navigation.goBack()} />
        <ScrollView >          
          <View style={{ width: w, height: getComponentHeight(w) }}>
            <ImageBackground  
              style={{flex: 1, height: undefined, width: undefined }} 
              source={{uri: genImageUri(item.img)}} 
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.50)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.6]}
                useAngle
                angle={180}
                style={{flex: 1}}
              /> 
              <View style={{flex: 1}} />                
            </ImageBackground>
            {/*skidka*/
              item.skidka &&
              <View style={styles.skidkaView}>
                <Text style={styles.skidkaText}>Скидка {item.skidka}%</Text>
              </View>
            }
          </View>
          <View style={{ margin: 10, position: 'relative' }}>
            <TouchableOpacity onPress={() => (selected ? this._remFromFav(item.id) : this._addToFav(item.id, item.name))} style={styles.touchZone} >
              <View style={styles.favoriteView}>
                <MaterialIcons name={selected === true ? 'favorite' : 'favorite-border'} size={20} style={!selected ? { color: '#170701' } : { color: '#FF6E36' }} />
              </View>
            </TouchableOpacity>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(24), color: 'rgba(0, 0, 0, 0.87)' }}>{item.name}</Text>
            {
              item.date_en && 
              <View style={{flexDirection: 'row', alignItems: 'center'}} >
                <MaterialIcons name="access-time" size={14} style={{ color: '#FF6E36' }} />
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(12), color: 'rgba(0, 0, 0, 0.4)', lineHeight: 14, margin: 10}}>Действует до {Moment(item.date_en).format('DD.MM.YYYY')}</Text>
              </View>
              
            }    
            {
              item.skidka_price && 
              <View style={{ flexDirection: 'row'}}>
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(16), color: '#979797', textDecorationLine: 'line-through' }} >{item.price}</Text>
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(16), color: '#FF6E36', marginLeft: 5}}>{item.skidka_price} тенге</Text>
              </View>
            }
            {
              !item.skidka_price && 
              <View style={{ flexDirection: 'row'}}>
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(16), color: '#FF6E36', marginLeft: 5}}>{item.price} тенге</Text>
              </View>
            }        
            
            {
              item.ekonom &&
              <Text style={{fontFamily: 'Roboto-Regular'}}>Экономия - <Text style={{color: '#FF6E36'}}>{item.ekonom} тенге</Text></Text>
            }
          </View>
          <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)' }} />
          <View style={{ paddingHorizontal: 15, paddingVertical: 20}}>
            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, lineHeight: 21, color: 'rgba(0, 0, 0, 0.541327)' }}>
              {item.description}
            </Text>
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
  skidkaView: {
    position: 'absolute',
    backgroundColor: '#FF6E36',
    left: 0,
    top: getComponentHeight(w) - 55,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  skidkaText: {
    fontFamily: 'Roboto-Regular', fontSize: normalize(12), color: 'white', lineHeight: 19
  },
  touchZone: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
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
    item: state.sale.item,
    places: state.favorite.places
  }
}
export default connect(mapStateToProps, { 
  getSale, addFavoritePlace, delFavoritePlace 
})(Sale)
