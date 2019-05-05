import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BG_COLOR } from '../../../constants/global'

const CardView = (props) => {
  const { view } = styles
  return (
    <View style={[view, props.style]} >
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    borderRadius: 6,
    backgroundColor: BG_COLOR,
    //shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 4
  }
})

export { CardView }
