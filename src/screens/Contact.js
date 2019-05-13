import React, {Component} from 'react'
import { StatusBar, Text, TextInput, StyleSheet, View, ScrollView, ImageBackground} from 'react-native'
//import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { Divider, Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

import { Header } from '../components/uikit/item/Header'
import Icon from '../components/svgkit/Icon'

import { w, normalize } from '../constants/global'

class Contact extends Component {  
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>        
        <ScrollView>
          <ImageBackground  
            style={{width: '100%', flex: 2, transform: [{perspective: 850}], justifyContent: 'center'}}
            source={require('../../resources/images/background.png')} 
            resizeMode="cover"
            imageStyle={{opacity: 0.2, transform: [{scale: 0.7}]}}
          >
            <Header leftColor="white" style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="md-menu" onPress={() => navigation.openDrawer()} />
            <StatusBar animated showHideTransition='slide' backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
            <View style={{ width: w, height: getComponentHeight(w * 0.8) }}>
              <LinearGradient style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} colors={['#FF662E', '#FFA470']} useAngle angle={146.71}>
                <Icon name="contact" height={getComponentHeight(w * 0.7)} width={w * 0.7} />
              </LinearGradient>
                                      
            </View>
            <View style={{ }}>
              <Text style={{fontFamily: 'Roboto-Regular', fontWeight: 'normal', color: '#170701', paddingHorizontal: 15, fontSize: 24, lineHeight: 28, paddingTop: 25, paddingBottom: 15}}>
              Связаться с нами
              </Text>
              <Divider style={{ backgroundColor: '#E5E5E5', height: 1 }} />
              <Text style={{fontFamily: 'Roboto-Regular', fontSize: 14, fontWeight: '300', lineHeight: 18, paddingHorizontal: 15, marginTop: 5}}>
              Для того, чтобы начать работать с нашей компанией, заполните анкету. После чего с Вами свяжется менеджер по работе с новыми клиентами
              </Text>
            </View>
            <View style={{ padding: 15}}>
              <View style={styles.containerText}><TextInput style={styles.textStyle} placeholder="ФИО" placeholderTextColor="black" /></View>
              <View style={styles.containerText}><TextInput style={styles.textStyle} placeholder="E-mail" placeholderTextColor="black" /></View>
              <View style={styles.containerText}><TextInput style={styles.textStyle} placeholder="Номер телефона" placeholderTextColor="black" /></View>
              <View style={styles.containerText}><TextInput style={[styles.textStyle, {textAlignVertical: 'top'}]} multiline numberOfLines={10} placeholder="Сообщение" placeholderTextColor="black" /></View>
            </View>
            <View style={{ padding: 15, marginBottom: 30 }}>
              <Button
                buttonStyle={{ 
                  backgroundColor: '#FF5621',
                  borderRadius: 6,
                  height: 50
                }}
                onPress={() => navigation.navigate('Main')} 
                titleStyle={{ fontSize: normalize(14), lineHeight: 16, fontWeight: '500', color: '#fff', fontFamily: 'Roboto-Regular'}} title="ОТПРАВИТЬ"
              />
            </View>      
          </ImageBackground>
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
export default connect(mapStateToProps, { })(Contact)
