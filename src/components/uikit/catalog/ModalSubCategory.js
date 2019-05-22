import React from 'react'
import { View, StyleSheet, Text, Modal, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
//import { ifIphoneX } from 'react-native-iphone-x-helper'
import { w } from '../../../constants/global'

const ModalSubCategory = ({ visible, hideSort, sub_categories, catName, catColor, onSelectSubCat, selectedSubCat }) => {
  const { viewStyle, rowView, rowText } = styles 
  this._getColor = (id) => {
    return selectedSubCat === id ? '#FF5621' : 'rgba(0, 0, 0, 0.87)'
  }
  return (
    <Modal 
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={() => { hideSort() }}
    > 
      <TouchableWithoutFeedback onPress={() => { hideSort() }}>
        <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.1)', justifyContent: 'center', alignItems: 'center'}]}>        
          <View style={viewStyle}>
            <TouchableOpacity onPress={() => { onSelectSubCat(undefined) }}>
              <View style={rowView}><Text style={[rowText, { color: catColor }]}>{catName}</Text></View>
            </TouchableOpacity>
            <FlatList
              data={sub_categories}
              keyExtractor={(item) => { 
                return `id:${item.id}` 
              }
              }
              renderItem={(item) => (
                <TouchableOpacity onPress={() => { onSelectSubCat(item.item.id) }}>
                  <View style={rowView}>
                    <Text style={[rowText, { color: this._getColor(item.item.id)}]}>{item.item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
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
    height: (w * 0.8) * 1.132,     
    width: w * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 6},
    shadowOpacity: 0.2,
    elevation: 4,    
    borderRadius: 4
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

export { ModalSubCategory }
