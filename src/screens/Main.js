import React, {Component} from 'react'
import { Image, StyleSheet, View, Text, ScrollView, StatusBar, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Button } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { getCategories, getSubCategories } from '../actions/index'
import { HeaderMain, SwiperApp, ButtonGrad, CardPlace} from '../components/uikit'
import { w, h, BG_COLOR, TRASPARENT } from '../constants/global'

class Main extends Component {
  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    const { navigation, mainCategory, categories, loading, error } = this.props   
    
    /**when first loading show this splash screen */
    if (loading) {
      return (<View style={StyleSheet.absoluteFill}>
        <ImageBackground  
          style={{width: '100%', flex: 1, transform: [{perspective: 850}], justifyContent: 'center'}}
          source={require('../../resources/images/background.png')} 
          resizeMode="cover"        
        >   
          {error &&
          <View>
            <Text>{error.message}</Text>
            <Text>{error.stack}</Text>
          </View>
          }
          
          <LinearGradient
            colors={['rgba(250, 250, 250, 0)', '#FAFAFA']}
            start={{x: 0.0, y: 0.25}} 
            end={{x: 0.5, y: 1.0}}
            locations={[0, 0.6]}
            useAngle
            angle={180}
            style={{flex: 1}}
          />          
          <Image 
            style={{ position: 'absolute', height: 200, width: 200, top: (h / 2) - 100, left: (w / 2) - 100 }} 
            source={require('../../resources/images/logo.png')}
            resizeMode="stretch"
          />               
        </ImageBackground>
      </View>)
    }

    return (
      <View style={styles.container}>        
        {/* Start scroll component */}
        <ScrollView overScrollMode="never" bounces={false} style={[{ flex: 1}]}>
          <HeaderMain style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="ios-menu" title="Главная" onPress={() => navigation.openDrawer()} />          
          <StatusBar animated showHideTransition='slide' backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
          <SwiperApp data={[{ id: '1', source: require('../../resources/demo/promo.png') }, { id: '2', source: require('../../resources/demo/promo.png') }]} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 15 }}> 
            {
              mainCategory.map((itemName) => {
                const category = categories.filter(cat => cat.id === itemName)[0]                
                return (
                  <ButtonGrad key={itemName} code={category.id} mainColor={category.mainColor || '#FFF'} secondColor={category.secondaryColor || '#000'} text={category.name} onPress={() => navigation.push('Catalog', { catalog: itemName, scrollTo: category.id })} />
                )
              }
              )
            }           
          </View>
          <SwiperApp data={[{ id: '3', source: require('../../resources/demo/picture.png') }, { id: '4', source: require('../../resources/demo/picture.png') }]} radius={6} />
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
            <ScrollView 
              horizontal
              decelerationRate={0}
              snapToInterval={(152/*itemWidth*/ * 2) + 20/*el-Margin*/}
              overScrollMode="never" 
              showsVerticalScrollIndicator={false} 
              showsHorizontalScrollIndicator={false}
              pagingEnabled 
              bounces={false}
            > 
              <FlatList 
                alwaysBounceVertical={false}
                columnWrapperStyle={{ justifyContent: 'flex-start'}}
                data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25']}
                numColumns={10} 
                renderItem={() => <CardPlace navigation={navigation} item={{ id: '1', title: 'Adidas', count: 15, source: require('../../resources/demo/adidas.png')}} />}
                keyExtractor={(item) => item}
              />
            </ScrollView>                       
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
            <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Main')} >
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
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
    loading: state.catalog.loading,
    mainCategory: state.catalog.mainCategory,
    error: state.catalog.error
  }
}
export default connect(mapStateToProps, { getCategories, getSubCategories })(Main)
