import React, {Component} from 'react'
import { Text, StyleSheet, View, ImageBackground, FlatList, ScrollView, InteractionManager, Image, TouchableOpacity} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
//import Spinner from 'react-native-loading-spinner-overlay'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import CustomStatusBar from '../../components/uikit/CustomStatusBar'
import { getZav, getPlacesByZav, cleanZav } from '../../actions/ItemActions'
import Header from '../../components/uikit/item/Header'
import { CardItem } from '../../components/uikit/item/CardItem'
import { w, genImageUri, normalize } from '../../constants/global'

class Item extends Component { 
  state = {
    didFinishInitialAnimation: false
  }

  // Lifecycle methods
  componentDidMount() {
    this.props.getZav(this.props.navigation.getParam('id'))
    this.props.getPlacesByZav(this.props.navigation.getParam('id'), this.props.text, this.props.dir)
    
    // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        didFinishInitialAnimation: true
      })
    })
  }
  
  render() {
    const widthItem = (w / 2) - 8  
    const { navigation, items, zav, categories } = this.props
    if (this.state.didFinishInitialAnimation === false || !zav.id) {
      return (
        <View style={styles.container}>
          <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
          {/*<Spinner
            //visibility of Overlay Loading Spinner
            visible
            //Text with the Spinner 
            textContent={'Загрузка...'}
            //Text style of the Spinner Text
            textStyle={{color: '#FFF'}}
          />
          */}
        </View>)
    }

    const [category] = categories.filter((cat) => cat.id === zav.cat_id)

    return (
      <View style={styles.container}>                
        <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
        <ScrollView>    
          <Header itemId={this.props.navigation.getParam('id')} iconFunnel iconSearch leftColor="white" style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="md-arrow-back" title="Главная" onPress={() => navigation.goBack()} />              
          <View style={{ width: w, height: getComponentHeight(w) }}>
            <ImageBackground  
              style={{flex: 1, height: undefined, width: undefined }} 
              source={{uri: genImageUri(zav.img)}} 
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.50)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.8]}
                useAngle
                angle={180}
                style={{flex: 1}}
              /> 
              <View style={{flex: 1}}>
                
                <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 36, backgroundColor: 'white', position: 'absolute', height: 72, width: 72, bottom: -36, left: ((w / 2) - 36)}}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', height: 62, width: 62, backgroundColor: 'black', borderRadius: 36}}>
                    <Text style={{ fontFamily: 'Roboto-Regular', color: 'white', fontSize: 12, lineHeight: 14}}>VISIT</Text>
                  </View>
                </View>                
              </View>      
            </ImageBackground>
          </View>
          <View style={{ alignItems: 'center', marginTop: 43 }}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(16), color: 'black'}}>{zav.name}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5}}>
              <Image style={{ height: 14, width: 14, marginRight: 5 }} source={{uri: genImageUri(category.enableIcon)}} resizeMode="contain" />
              <Text style={{fontFamily: 'Roboto-Regular', color: category.mainColor, fontSize: normalize(12)}}>{category.name}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 15, marginTop: 15, backgroundColor: '#EBF2F5'}}>
            <Text style={{ color: 'rgba(0, 0, 0, 0.87)', fontFamily: 'Roboto-Regular'}}>{zav.city}, {zav.address}</Text>
          </View>
          <View style={{ width: w, overflow: 'hidden', paddingHorizontal: 15, paddingVertical: 20}}>
            <Text numberOfLines={6} style={{ fontFamily: 'Roboto-Regular', color: 'rgba(0, 0, 0, 0.5)' }}>{zav.description}</Text>
          </View>
          <Divider style={{backgroundColor: 'rgba(0, 0, 0, 0.87)'}} />
          <View>
            {
              items && 
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, marginTop: 5 }}>
                  <Text style={{ fontFamily: 'Roboto-Regular', fontWeight: '500', flex: 1, fontSize: normalize(14), color: 'rgba(0, 0, 0, 0.5)' }}>Предложения</Text>
                  <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={{ marginLeft: 10}}>
                      <View style={[styles.buttonView]}>
                        <MaterialIcons name="view-list" size={28} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10}}>
                      <View style={[styles.buttonView, styles.buttonViewShadow]}>
                        <MaterialIcons name="view-module" size={28} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ paddingVertical: 5}}>
                  <FlatList 
                    columnWrapperStyle={{ justifyContent: 'space-between'}}
                    numColumns={2}
                    data={items}
                    renderItem={(item) => <CardItem style={{width: widthItem}} navigation={navigation} item={item.item} />}
                    keyExtractor={(item) => item.key}
                  />
                
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
      width: 5,
      height: 5
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.22,
    elevation: 4
  }
})

const mapStateToProps = state => {
  return {
    categories: state.catalog.categories,    
    items: state.item.items,
    zav: state.item.item
  }
}
export default connect(mapStateToProps, { getZav, getPlacesByZav, cleanZav })(Item)
