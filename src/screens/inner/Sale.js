import React, {Component} from 'react'
import { Text, StyleSheet, View, ImageBackground, ScrollView, StatusBar} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import { Header } from '../../components/uikit/item/Header'
import { w } from '../../constants/global'

class Sale extends Component {  
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <Header leftColor="white" style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="md-arrow-back" title="Главная" onPress={() => navigation.goBack()} />
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
          <View style={{ width: w, height: getComponentHeight(w) }}>
            <ImageBackground  
              style={{flex: 1, height: undefined, width: undefined }} 
              source={require('../../../resources/demo/soup-big.png')} 
              resizeMode="stretch"
            >
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.50)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.6]}
                useAngle
                angle={180}
                style={{flex: 1}}
              /> 
              <View style={{flex: 1}} />                
            </ImageBackground>
          </View>
          <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 24, color: 'rgba(0, 0, 0, 0.87)' }}>Суп с фрикадельками</Text>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: 'rgba(0, 0, 0, 0.4)', lineHeight: 14, margin: 10}}>Действует до 22.03.19</Text>
            <View style={{ flexDirection: 'row'}}>
              <Text style={{fontFamily: 'Roboto-Regular', fontSize: 16, color: '#979797', textDecorationLine: 'line-through' }} >150</Text>
              <Text style={{fontFamily: 'Roboto-Regular', fontSize: 16, color: '#FF6E36', marginLeft: 5}}>142</Text>
            </View>
            <Text style={{fontFamily: 'Roboto-Regular'}}>Экономия - <Text style={{color: '#FF6E36'}}>8 тенге</Text></Text>
          </View>
          <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)' }} />
          <View style={{ paddingHorizontal: 15, paddingVertical: 20}}>
            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, lineHeight: 21, color: 'rgba(0, 0, 0, 0.541327)' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
export default connect(mapStateToProps, { })(Sale)
