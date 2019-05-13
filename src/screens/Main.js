import React, {Component} from 'react'
import { Image, StyleSheet, View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { HeaderMain, Swiper, ButtonGrad, CardPlace} from '../components/uikit'
import { w, h, BG_COLOR, TRASPARENT } from '../constants/global'

class Main extends Component {
  render() {
    const { navigation, mainCategory, categories } = this.props    
    return (
      <View style={styles.container}>        
        {/* Start scroll component */}
        <ScrollView overScrollMode="never" bounces={false} style={[{ flex: 1}]}>
          <HeaderMain style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="ios-menu" title="Главная" onPress={() => navigation.openDrawer()} />          
          <StatusBar animated showHideTransition='slide' backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
          <Swiper data={[{ source: require('../../resources/demo/promo.png') }, { source: require('../../resources/demo/promo.png') }]} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 15 }}> 
            {
              mainCategory.map((itemName) => {
                const category = categories.filter(cat => cat.code === itemName)[0]
                return (
                  <ButtonGrad key={itemName} code={itemName} mainColor={category.mainColor} secondColor={category.secondColor} text={category.name} onPress={() => navigation.push('Catalog', { catalog: itemName, scrollTo: 'index' })} />
                )
              }
              )
            }           
          </View>
          <Swiper data={[{ source: require('../../resources/demo/picture.png') }, { source: require('../../resources/demo/picture.png') }]} radius={6} />
          <View style={{ flexDirection: 'row', margin: 15}}>
            <View style={{ flex: 1, justifyContent: 'center'}}><Text style={{ fontWeight: 'bold', 
              fontFamily: 'Roboto-Regular',
              fontStyle: 'normal', 
              fontSize: 14, 
              lineHeight: 19}} 
            >Топ заведений</Text></View>
            <View style={{ flex: 1, alignItems: 'center'}}><Image style={{width: 31, height: 31}} source={require('../../resources/icons/png/topPlaces.png')} /></View>
            <View style={{ flex: 1}} />
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15}} >
              <CardPlace navigation={navigation} item={{ title: 'Adidas', count: 15, source: require('../../resources/demo/adidas.png')}} />
              <CardPlace navigation={navigation} item={{ title: 'Acceserize', count: 3, source: require('../../resources/demo/access.png')}} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15}} >
              <CardPlace navigation={navigation} item={{ title: 'Magnum', count: 67, source: require('../../resources/demo/magnum.png')}} />
              <CardPlace navigation={navigation} item={{ title: 'Foxtot', count: 2, source: require('../../resources/demo/foxtrot.png')}} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15}} >
              <CardPlace navigation={navigation} item={{ title: 'Кувшин', count: 6, source: require('../../resources/demo/kuvshin.png')}} />
              <CardPlace navigation={navigation} item={{ title: 'Элита', count: 12, source: require('../../resources/demo/elita.png')}} />
            </View>
          </View>
          <View style={{ padding: 15 }}>
            <Button
              buttonStyle={{ 
                backgroundColor: '#FF5621',
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.35,
                shadowRadius: 1.22,
                
                elevation: 4
              }}
              onPress={() => navigation.push('Catalog', { catalog: 'all' })} 
              titleStyle={{ fontSize: 14, lineHeight: 16, fontWeight: '500', color: '#fff', fontFamily: 'Roboto-Regular'}} title="ВЕСЬ КАТАЛОГ"
            />
          </View>       
        </ScrollView>
        {/* footer static and get 10% from display */}
        <View style={[styles.shadowBox, { backgroundColor: TRASPARENT, height: h * 0.1}]} >          
          <View style={[{flex: 1, backgroundColor: BG_COLOR, flexDirection: 'row', justifyContent: 'space-between'}, styles.scrollView]}>
            <TouchableOpacity style={{ flex: 1}} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="home" size={24} style={{ color: '#FF6E36' }} /><Text style={{ color: '#FF6E36' }} >Главная</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('MapPlaces')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="room" size={24} /><Text>Карта заведений</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Favorite')} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialIcons name="favorite" size={24} /><Text>Избранные</Text></View>
            </TouchableOpacity>
          </View>
        </View>        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.6,
    shadowRadius: 2.9,

    elevation: 3,
    position: 'relative'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  shadowGradient: {
    height: 4
  }
})

const mapStateToProps = state => {
  return {
    categories: state.catalog.categories,
    mainCategory: state.catalog.mainCategory
  }
}
export default connect(mapStateToProps, { })(Main)
