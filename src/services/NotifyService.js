/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-duplicates */
import firebase from 'react-native-firebase'
import type, { Notification, NotificationOpen } from 'react-native-firebase'

class NotifyService {
  constructor(callback1, callback2, getCurrentCityId) {
    this.callback1 = callback1
    this.callback2 = callback2
    this.getCurrentCityId = getCurrentCityId
  }
  
    start = async (prevCityId, cityId) => {
      firebase.notifications().android.deleteChannel('test-channel')
      const notificationOpen = await firebase.notifications().getInitialNotification()
      if (notificationOpen) {
        const action = notificationOpen.action
        const notification = notificationOpen.notification
        //const seen = []
        //когда приложение закрыто
        this.callback1(notification.data)
      } 
      const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
        .setDescription('My apps test channel')
        // Create the channel
      firebase.notifications().android.createChannel(channel)      
      this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
        console.log('notification1', notification)
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      })
      this.notificationListener = firebase.notifications().onNotification((notification) => {
        notification.android.setChannelId('test-channel').android.setSmallIcon('ic_launcher')
        firebase.notifications().displayNotification(notification)
      })
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpenL) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpenL.action
        // Get information about the notification that was opened
        const notification = notificationOpenL.notification
        //var seen = []
        //Когда приложени уже открыто
        this.callback2(notification.data)  
        firebase.notifications().removeDeliveredNotification(notification.notificationId)
      })
    }
}

export default NotifyService
