import React from 'react'
import { ScrollView, View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationActions, StackActions } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { w } from '../../../constants/global'
import { ButtonGrad } from '../main/ButtonGrad'

const Header = ({
  leftIcon,
  mainColor,
  secondColor,
  onPress,
  style,
  title,
  navigation
}) => {
  const { headerGradView, viewStyle, textStyle, leftButtonStyle, rightButtonStyle } = styles
  this.navigate = (params) => {
    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Main' }),
        NavigationActions.navigate({ routeName: 'Catalog', params })
      ]
    })
    navigation.dispatch(resetAction) 
  }
  return (
    <View style={viewStyle}>
      <LinearGradient style={[headerGradView, style]} colors={[mainColor, secondColor]} useAngle angle={135}>
        {leftIcon &&
          <TouchableOpacity onPress={onPress}>
            <Ionicons name={leftIcon} style={[leftButtonStyle, { paddingLeft: 10 }]} color={'white'} />
          </TouchableOpacity>
        }
        <Text numberOfLines={1} ellipsizeMode="tail" style={[textStyle, { paddingLeft: leftIcon ? 35 : 0 }]}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Ionicons name={'ios-search'} style={[rightButtonStyle]} color={'white'} />
        </TouchableOpacity>
      </LinearGradient>
      <ScrollView horizontal style={{ flexDirection: 'row', padding: 15 }}>
        <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Поесть" onPress={() => this.navigate({ catalog: 'all1' })} />
        <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Продукты" onPress={() => this.navigate({ catalog: 'all2' })} />
        <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Красота и здоровье" onPress={() => this.navigate({ catalog: 'all3' })} />
        <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Благотво рительность" onPress={() => navigation.push('Catalog', { catalog: 'all4' })} />
        <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Все" onPress={() => navigation.push('Catalog', { catalog: 'all5' })} />
        <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Поесть" onPress={() => navigation.push('Catalog', { catalog: 'all6' })} />
        <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Продукты" onPress={() => navigation.push('Catalog', { catalog: 'all7' })} />
        <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Красота и здоровье" onPress={() => navigation.push('Catalog', { catalog: 'all8' })} />
        <ButtonGrad mainColor="#45A460" secondColor="#A9D334" iconName="logo-apple" text="Благотво рительность" onPress={() => navigation.push('Catalog', { catalog: 'all9' })} />        
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  headerGradView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 90
  },
  viewStyle: {
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 3,
    position: 'relative',
    height: 200,
    backgroundColor: 'white'
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
    paddingTop: 50,
    width: w - 60,
    color: 'white'
  },
  leftButtonStyle: {
    paddingTop: 45,
    fontSize: 24
  },
  rightButtonStyle: {
    paddingTop: 45,
    fontSize: 24
  }
})

export { Header }
