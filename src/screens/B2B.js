import React, {Component} from 'react'
import { Text, TextInput, StyleSheet, View, ScrollView, ImageBackground, Alert } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { Divider, Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import CustomStatusBar from '../components/uikit/CustomStatusBar'
import Header from '../components/uikit/item/Header'
import Icon from '../components/svgkit/Icon'

import { w, normalize } from '../constants/global'

class B2B extends Component {  
  state={
    fio: '',
    mail: '',
    phone: '',
    message: ''
  }
  sendMail = () => {
    const { fio, phone, message, mail } = this.state
    if (fio.length > 0 && phone.length > 0 && message.length > 0 && mail.length > 0) {
      const formData = new FormData()
      formData.append('fio', fio)
      formData.append('tel', phone)
      formData.append('sms', message)
      formData.append('email', mail)
      formData.append('type', 'b2b')
      fetch('http://nauqan.ibeacon.kz/send_mail', { method: 'POST', body: formData })
      Alert.alert('', 'Ваши данные успешно отправлены', [{text: 'OK', onPress: () => console.log('OK Pressed')}], {cancelable: false})
      this.setState({fio: '', mail: '', phone: '', message: '' })
    } else {
      Alert.alert('', 'Необходимо заполнить все поля', [{text: 'OK', onPress: () => console.log('OK Pressed')}], {cancelable: false})
    }  
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <CustomStatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
          <ScrollView>
            <ImageBackground  
              style={{width: '100%', flex: 2, transform: [{perspective: 850}], justifyContent: 'center'}}
              source={require('../../resources/images/background.png')} 
              resizeMode="cover"
              imageStyle={{opacity: 0.2, transform: [{scale: 0.7}]}}
            >
              <Header leftColor="white" style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="md-menu" onPress={() => navigation.openDrawer()} />
              <View style={{ width: w, height: getComponentHeight(w * 0.8) }}>
                <LinearGradient style={{ }} colors={['#FF662E', '#FFA470']} useAngle angle={146.71}>
                  <Icon name="b2b_big" height={getComponentHeight(w * 0.8)} width={w} />
                </LinearGradient>
                                      
              </View>
              <View style={{ }}>
                <Text style={{fontFamily: 'Roboto-Regular', fontWeight: 'normal', color: '#170701', paddingHorizontal: 15, fontSize: 24, lineHeight: 28, paddingTop: 25, paddingBottom: 15}}>Вы владелец бизнеса?</Text>
                <Divider style={{ backgroundColor: '#E5E5E5', height: 1 }} />
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 14, fontWeight: '300', lineHeight: 18, paddingHorizontal: 15, marginTop: 5}}>
              Для того, чтобы начать работать с нашей компанией, заполните анкету. После чего с Вами свяжется менеджер по работе с новыми клиентами
                </Text>
              </View>
              <View style={{ padding: 15}}>
                <View style={styles.containerText}><TextInput value={this.state.fio} onChangeText={(text) => this.setState({fio: text})} style={styles.textStyle} placeholder="ФИО" placeholderTextColor="rgba(0, 0, 0, 0.54)" /></View>
                <View style={styles.containerText}><TextInput value={this.state.mail} onChangeText={(text) => this.setState({mail: text})} style={styles.textStyle} placeholder="E-mail" placeholderTextColor="rgba(0, 0, 0, 0.54)" autoCompleteType="email" /></View>
                <View style={styles.containerText}><TextInputMask value={this.state.phone} onChangeText={(text) => this.setState({phone: text})} style={styles.textStyle} placeholder="Номер телефона" placeholderTextColor="rgba(0, 0, 0, 0.54)" autoCompleteType="tel" keyboardType={'phone-pad'} type={'custom'} options={{mask: '+9(999)999-99-99'}} /></View>
                <View style={styles.containerText}><TextInput value={this.state.message} onChangeText={(text) => this.setState({message: text})} style={[styles.textStyle, {textAlignVertical: 'top'}]} multiline numberOfLines={10} placeholder="Сообщение" placeholderTextColor="rgba(0, 0, 0, 0.54)" /></View></View>
              <View style={{ padding: 15, marginBottom: 30 }}>
                <Button
                  buttonStyle={{ 
                    backgroundColor: '#FF5621',
                    borderRadius: 6,
                    height: 50
                  }}
                  // eslint-disable-next-line no-alert
                  onPress={() => { 
                    this.sendMail()
                  }} 
                  titleStyle={{ fontSize: normalize(14), lineHeight: 16, fontWeight: '500', color: '#fff', fontFamily: 'Roboto-Regular'}} title="ОТПРАВИТЬ"
                />
              </View>      
            </ImageBackground>
          </ScrollView>
        </KeyboardAwareScrollView>      
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
    margin: 10
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
export default connect(mapStateToProps, { })(B2B)
