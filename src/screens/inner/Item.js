import React, {Component} from 'react'
import { StatusBar, Text, StyleSheet, View, ImageBackground, FlatList, ScrollView, InteractionManager} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { Header } from '../../components/uikit/item/Header'
import { CardItem } from '../../components/uikit/item/CardItem'
import { w } from '../../constants/global'

class Item extends Component { 
  state = {
    didFinishInitialAnimation: false
  }

  // Lifecycle methods
  componentDidMount() {
  // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
    // 2: Component is done animating
    // 3: Start fetching the team
      //this.props.dispatchTeamFetchStart()
   
      // 4: set didFinishInitialAnimation to false
      // This will render the navigation bar and a list of players
      this.setState({
        didFinishInitialAnimation: true
      })
    })
  }
  
  render() {
    const widthItem = (w / 2) - 8  
    const { navigation, items } = this.props
    if (this.state.didFinishInitialAnimation === false) {
      return (
        <View style={styles.container}>
          <Spinner
            //visibility of Overlay Loading Spinner
            visible
            //Text with the Spinner 
            textContent={'Загрузка...'}
            //Text style of the Spinner Text
            textStyle={{color: '#FFF'}}
          />
        </View>)
    }

    return (
      <View style={styles.container}>        
        <ScrollView>          
          <Header iconFunnel iconSearch leftColor="white" style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="md-arrow-back" title="Главная" onPress={() => navigation.goBack()} />
          <StatusBar animated backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
          <View style={{ width: w, height: getComponentHeight(w) }}>
            <ImageBackground  
              style={{flex: 1, height: undefined, width: undefined }} 
              source={require('../../../resources/demo/item.png')} 
              resizeMode="stretch"
            >
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.50)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
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
            <Text style={{fontFamily: 'Roboto-Regular'}}>Visit Алматы</Text>
            <Text style={{fontFamily: 'Roboto-Regular'}}>Поесть</Text>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 15, marginTop: 15, backgroundColor: '#EBF2F5'}}>
            <Text style={{ color: 'rgba(0, 0, 0, 0.87)', fontFamily: 'Roboto-Regular'}}>Астана, ул. Астанаевская, 63</Text>
          </View>
          <View style={{ width: w, overflow: 'hidden', paddingHorizontal: 15, paddingVertical: 20}}>
            <Text numberOfLines={6} style={{ fontFamily: 'Roboto-Regular' }}>
              Если вы до сих пор не нанесли визит в кафе Visit в Алматы, то утверждение о том, что вы знакомы с разнообразной, вкусной едой весьма спорно. Этот кулинарный бутик разбирается в вопросах гастрономии самого разного характера: за столиками кафе (интерьер — актуальный минимализм) можно отведать фирменные пир
            </Text>
          </View>
          <View>
            <View><Text style={{ fontFamily: 'Roboto-Regular' }}>Предложения</Text></View>
            <View>
              <FlatList 
                columnWrapperStyle={{ justifyContent: 'space-between'}}
                numColumns={2}
                data={items}
                renderItem={(item) => <CardItem style={{width: widthItem}} navigation={navigation} item={item.item} />}
                keyExtractor={(item) => item.key}
              />
            
            </View>
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
  }
})

const mapStateToProps = state => {
  return {
    categories: state.catalog.categories,
    mainCategory: state.catalog.mainCategory,
    items: state.item.items
  }
}
export default connect(mapStateToProps, { })(Item)
