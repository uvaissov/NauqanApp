import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { w, h, TRASPARENT, BG_COLOR, normalize } from '../constants/global'
import CustomStatusBar from '../components/uikit/CustomStatusBar'
import { Header } from '../components/uikit/favorite/Header'
import CardPlaceDynamic from '../components/uikit/CardPlaceDynamic'

class Favorite extends Component {  
  _selectHorizontalItem = (value) => {
    console.log(value)
  }
  render() {
    const { navigation, places, horizontal } = this.props
    const itemWidth = w * 0.466
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
        <Header 
          visibleSort
          //sortPress={this._showSort} 
          searchPress={() => navigation.openDrawer()} 
          navigation={this._navigateToCatalog} 
          leftIcon="md-menu" 
          mainColor="#45A460"
          secondColor="#A9D334" 
          title="Избранное" 
          onPress={() => navigation.openDrawer()} 
        />  
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, marginTop: 5 }}>
            <Text style={{ fontFamily: 'Roboto-Regular', fontWeight: '500', flex: 1, fontSize: normalize(14), color: 'rgba(0, 0, 0, 0.5)' }}>Предложения</Text>
            <View style={{ flexDirection: 'row'}}>
              <TouchableOpacity style={{ marginLeft: 10}} onPress={() => this._selectHorizontalItem(true)}>
                <View style={[styles.buttonView, horizontal ? styles.buttonViewShadow : null]}>
                  <MaterialIcons name="view-list" size={28} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10}} onPress={() => this._selectHorizontalItem(false)}>
                <View style={[styles.buttonView, !horizontal ? styles.buttonViewShadow : null]}>
                  <MaterialIcons name="view-module" size={28} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <FlatList 
              columnWrapperStyle={{ justifyContent: 'space-between'}}
              data={places}
              numColumns={2} 
              renderItem={(row) => <CardPlaceDynamic trash width={itemWidth} onPress={() => navigation.push('Item', {id: row.item})} item={{ id: row.item, name: 'Adidas', count: 15, img: require('../../resources/demo/adidas.png')}} />}
              keyExtractor={(item) => item}
              style={{ padding: 5 }}
            />
          </ScrollView>
        </View>
        <View style={[styles.shadowBox, { backgroundColor: TRASPARENT, height: h * 0.07}]} >          
          <View style={[{flex: 1, backgroundColor: BG_COLOR, flexDirection: 'row', justifyContent: 'space-between'}, styles.scrollView]}>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Main')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="home" size={24} /><Text style={{textAlign: 'center'}}>Главная</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('MapPlaces')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="room" size={24} /><Text style={{textAlign: 'center'}}>Карта заведений</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Favorite')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="favorite" size={24} style={{ color: '#FF6E36', textAlign: 'center' }} /><Text style={{ color: '#FF6E36' }} >Избранные</Text></View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    borderColor: BG_COLOR, 
    borderWidth: 1
  }
})

const mapStateToProps = state => {
  return {
    places: state.favorite.places,
    horizontal: state.favorite.horizontal
  }
}
export default connect(mapStateToProps, { })(Favorite)
