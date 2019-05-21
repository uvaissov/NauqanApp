import React, {Component} from 'react'
import { Text, StyleSheet, View, ImageBackground, ScrollView, StatusBar, InteractionManager} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import Moment from 'moment'
import { getSale } from '../../actions/SaleActions'
import { Header } from '../../components/uikit/item/Header'
import { w, normalize, genImageUri } from '../../constants/global'

class Sale extends Component {
  state = {
    didFinishInitialAnimation: false
  }

  // Lifecycle methods
  componentDidMount() {
    this.props.getSale(this.props.navigation.getParam('id'))    
    // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        didFinishInitialAnimation: true
      })
    })
  }
  render() {
    const { navigation, item } = this.props
    if (this.state.didFinishInitialAnimation === false || !item.id) {
      return (
        <View style={styles.container}>
          {/*<Spinner
            //visibility of Overlay Loading Spinner
            visible
            //Text with the Spinner 
            textContent={'Загрузка...'}
            //Text style of the Spinner Text
            textStyle={{color: '#FFF'}}
          />
          */}
        </View>)
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <Header leftColor="white" style={{position: 'absolute', width: w, top: 0, zIndex: 1}} leftIcon="md-arrow-back" title="Главная" onPress={() => navigation.goBack()} />
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.24)" barStyle="default" />
          <View style={{ width: w, height: getComponentHeight(w) }}>
            <ImageBackground  
              style={{flex: 1, height: undefined, width: undefined }} 
              source={{uri: genImageUri(item.img)}} 
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
            {/*skidka*/
              item.skidka &&
              <View style={styles.skidkaView}>
                <Text style={styles.skidkaText}>Скидка {item.skidka}%</Text>
              </View>
            }
          </View>
          <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(24), color: 'rgba(0, 0, 0, 0.87)' }}>{item.name}</Text>
            {
              item.date_en &&
              <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(12), color: 'rgba(0, 0, 0, 0.4)', lineHeight: 14, margin: 10}}>Действует до {Moment(item.date_en).format('DD.MM.YYYY')}</Text>
            }    
            {
              item.skidka_price && 
              <View style={{ flexDirection: 'row'}}>
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(16), color: '#979797', textDecorationLine: 'line-through' }} >{item.price}</Text>
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(16), color: '#FF6E36', marginLeft: 5}}>{item.skidka_price}</Text>
              </View>
            }
            {
              !item.skidka_price && 
              <View style={{ flexDirection: 'row'}}>
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: normalize(16), color: '#FF6E36', marginLeft: 5}}>{item.price}</Text>
              </View>
            }        
            
            {
              item.ekonom &&
              <Text style={{fontFamily: 'Roboto-Regular'}}>Экономия - <Text style={{color: '#FF6E36'}}>{item.ekonom} тенге</Text></Text>
            }
            
          </View>
          <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)' }} />
          <View style={{ paddingHorizontal: 15, paddingVertical: 20}}>
            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, lineHeight: 21, color: 'rgba(0, 0, 0, 0.541327)' }}>
              {item.description}
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
  skidkaView: {
    position: 'absolute',
    backgroundColor: '#FF6E36',
    left: 0,
    top: getComponentHeight(w) - 55,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  skidkaText: {
    fontFamily: 'Roboto-Regular', fontSize: normalize(12), color: 'white', lineHeight: 19
  }
})

const mapStateToProps = state => {
  return {
    item: state.sale.item
  }
}
export default connect(mapStateToProps, { getSale })(Sale)
