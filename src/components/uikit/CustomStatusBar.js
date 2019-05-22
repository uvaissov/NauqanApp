import React from 'react'
import { StyleSheet, Platform, View, StatusBar} from 'react-native'

const CustomStatusBar = ({ absolute, backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }, absolute]}>
    <StatusBar animated showHideTransition='slide' translucent backgroundColor={backgroundColor} {...props} />
  </View>
)
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
})
export default CustomStatusBar
