import React, {Component} from 'react'
import { StatusBar, Text, StyleSheet, View, ScrollView} from 'react-native'
//import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { Header } from '../components/uikit/item/Header'
import Icon from '../components/svgkit/Icon'

import { w, TRASPARENT } from '../constants/global'

class AboutApp extends Component {  
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={TRASPARENT} barStyle="light-content" />
        <ScrollView>
          <Header leftColor="white" style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="md-arrow-back" title="Главная" onPress={() => navigation.goBack()} />
          <View style={{ width: w, height: getComponentHeight(w) }}>
            <LinearGradient style={{ }} colors={['#FF662E', '#FFA470']} useAngle angle={146.71}>
              <Icon name="b2b" height={getComponentHeight(w)} width={w} />
            </LinearGradient>
                                      
          </View>
          <View style={{ }}>
            <Text style={{fontFamily: 'Roboto-Regular', fontWeight: 'normal', color: '#170701', paddingHorizontal: 15, fontSize: 24, lineHeight: 28, paddingTop: 25, paddingBottom: 15}}>Вы владелец бизнеса?</Text>
            <Divider style={{ backgroundColor: '#E5E5E5', height: 1 }} />
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 14, fontWeight: '300', lineHeight: 18, paddingHorizontal: 15, marginTop: 5}}>
              Для того, чтобы начать работать с нашей компанией, заполните анкету. После чего с Вами свяжется менеджер по работе с новыми клиентами
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
