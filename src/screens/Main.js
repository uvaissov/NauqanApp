import React, {Component} from 'react'
import { Image, StyleSheet, View, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { HeaderMain, Swiper, ButtonGrad, CardPlace} from '../components/uikit'
import { w, h, BG_COLOR, TRASPARENT } from '../constants/global'

class Main extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        {/* Start scroll component */}
        <ScrollView overScrollMode="never" bounces={false} style={[{ flex: 1}]}>
          <HeaderMain style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="ios-menu" title="Главная" onPress={() => navigation.openDrawer()} />
          <Swiper data={[{ source: require('../../resources/demo/promo.png') }, { source: require('../../resources/demo/promo.png') }]} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 15 }}> 
            <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Поесть" onPress={() => navigation.push('Catalog')} />
            <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Продукты" onPress={() => navigation.push('Catalog')} />
            <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Красота и здоровье" onPress={() => navigation.push('Catalog')} />
            <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Благотво рительность" onPress={() => navigation.push('Catalog')} />
            <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Все" onPress={() => navigation.push('Catalog', { catalog: 'all' })} />
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
              titleStyle={{ fontSize: 14, lineHeight: 16, fontWeight: '500', color: '#fff', fontFamily: 'Roboto-Regular'}} title="ВЕСЬ КАТАЛОГ"
            />
          </View>       
        </ScrollView>
        {/* footer static and get 10% from display */}
        <View style={[styles.shadowBox, { backgroundColor: TRASPARENT, height: h * 0.1}]} >          
          <View style={[{flex: 1, backgroundColor: BG_COLOR, flexDirection: 'row', justifyContent: 'space-between'}, styles.scrollView]}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>1</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>2</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>3</Text></View>
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

export default Main
