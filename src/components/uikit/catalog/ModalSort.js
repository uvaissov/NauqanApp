import React from 'react'
import { View, StyleSheet, Text, Modal, FlatList, TouchableWithoutFeedback } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
//import { w } from '../../../constants/global'

const ModalSort = ({visible, hideSort}) => {
  const { viewStyle, rowView, rowText } = styles   
  const data = [{name: 'Показать от А до Я', dir: 'asc'}, {name: 'Показать от Я до А', dir: 'desc'}]
  return (
    <Modal 
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={() => { hideSort() }}
    > 
      <TouchableWithoutFeedback onPress={() => { hideSort() }}>
        <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.1)'}]}>        
          <View style={viewStyle}>
            <FlatList
              data={data}
              renderItem={(item) => <View style={rowView}><Text style={rowText}>{item.item.name}</Text></View>}
            />        
          </View>        
        </View>
      </TouchableWithoutFeedback>
    </Modal> 
    
  )
}

const styles = StyleSheet.create({  
  viewStyle: {       
    backgroundColor: '#FAFAFA',
    height: 112,     
    width: 242,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 6},
    shadowOpacity: 0.2,
    elevation: 4,
    position: 'absolute',
    borderRadius: 4,
    ...ifIphoneX({
      top: 85
    }, {
      top: 55
    }),
    right: 8
  },
  rowView: {
    padding: 15
  },
  rowText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal',
    fontFamily: 'Roboto-Regular',
    color: 'rgba(0, 0, 0, 0.87)'
  }
})

export { ModalSort }
