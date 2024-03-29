import React, {Component} from 'react'
import { StatusBar, Text, StyleSheet, View, ScrollView, Image } from 'react-native'
//import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

import { Header } from '../components/uikit/item/Header'
import { w, normalize } from '../constants/global'

class AboutApp extends Component {  
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>        
        <ScrollView>          
          <Header leftColor="white" style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="md-menu" onPress={() => navigation.openDrawer()} />
          <StatusBar animated showHideTransition='slide' backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
          <View style={{ width: w, height: getComponentHeight(w * 0.8) }}>
            <LinearGradient style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} colors={['#FF662E', '#FFA470']} useAngle angle={146.71}>
              <Image 
                style={{ height: 124, width: 131 }} 
                source={require('../../resources/images/logo.png')}
                resizeMode="stretch"
              />
            </LinearGradient>
                                      
          </View>
          <View style={{ }}>
            <Text style={{fontFamily: 'Roboto-Regular', fontWeight: 'normal', color: '#170701', paddingHorizontal: 15, fontSize: 24, lineHeight: 28, paddingTop: 25, paddingBottom: 15}}>О приложении</Text>
            <Divider style={{ backgroundColor: '#E5E5E5', height: 1 }} />
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(14), fontWeight: '300', lineHeight: 18, paddingHorizontal: 15, marginTop: 5}}>
              Приложение NAUQAN - это Ваш гид в мире скидок. Это тот самый случай, когда в одном приложении собраны лучшие акционные предложения со всего Казахстана. NAUQAN станет Вашим другом и советчиком в широком спектре товаров и услуг, ведь именно благодаря ему Вы всегда будете в курсе всех скидок и акций, которые проходят В вашем городе. Мы всегда рады новым предложениям как со стороны пользователей, так и со стороны бизнес-партнеров.
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
  textStyle: {
    fontSize: 16,
    lineHeight: 19,
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Roboto-Regular',
    fontWeight: '300',
    marginHorizontal: 10
  },
  containerText: {
    borderRadius: 6,
    borderColor: '#FFA470',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 10
  }
})

const mapStateToProps = state => {
  return {
    categories: state.catalog.categories,
    mainCategory: state.catalog.mainCategory,
    items: state.item.items
  }
}
export default connect(mapStateToProps, { })(AboutApp)
