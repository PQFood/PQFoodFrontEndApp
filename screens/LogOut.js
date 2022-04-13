import React, { useState, useEffect } from 'react';
import { Text, View} from 'react-native';
import URL from '../components/UrlSocketIO';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/styles';

function LogOut(props) {

  const { navigation, route } = props;
  const removeData = () => {
    try {
      AsyncStorage.removeItem('user')
      AsyncStorage.removeItem('name')
      navigation.navigate('Login')
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      removeData()
    }, 1200)
  })


  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        fontWeight: "bold",
        color: "#ff6600"
      }}>Đang tải...</Text>
    </View>

  )
}

export default LogOut;
