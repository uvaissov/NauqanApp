import React from 'react'
import { View, StyleSheet, Text, Modal, FlatList, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
//import { ifIphoneX } from 'react-native-iphone-x-helper'
import { w, genImageUri } from '../../../constants/global'

const ModalSubCategory = ({ visible, hideSort, sub_categories, onSelectSubCat, selectedSubCat, category }) => {
  const { name: catName, mainColor: catColor, enableIcon } = category
  const { viewStyle, rowView, rowText } = styles 
  this._getIcon = (id) => {
    return selectedSubCat === id ? <MaterialIcons name="lens" size={24} style={{color: 'black'}} /> : <MaterialIcons name="panorama-fish-eye" size={24} style={{color:'black'}} />
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
              <View style={[rowView, { alignItems: 'center'}]}>
                <Image style={{ height: 20, width: 20, marginRight: 5 }} source={{uri: genImageUri(enableIcon)}} resizeMode="contain" />
                <Text style={[rowText, { color: catColor, fontSize: 20, fontWeight: '500', lineHeight: 28 }]}>{catName}</Text>
              </View>
            </TouchableOpacity>
            <FlatList
              data={sub_categories}
              keyExtractor={(item) => { 
                return `id:${item.id}` 
              }
              }
              renderItem={(item) => {
                const icons = this._getIcon(item.item.id)
                return (
                  <TouchableOpacity onPress={() => { onSelectSubCat(item.item.id) }}>
                    <View style={rowView}>
                      <Text style={[rowText]}>{item.item.name}</Text>
                      {icons}
                    </View>
                  </TouchableOpacity>
                )
              }
              }
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
    padding: 15,
    paddingLeft: 25,
    flexDirection: 'row'
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal',
    fontFamily: 'Roboto-Regular',
    color: 'rgba(0, 0, 0, 0.87)'
  }
})

export { ModalSubCategory }
