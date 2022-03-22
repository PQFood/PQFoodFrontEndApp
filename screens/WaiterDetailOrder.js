import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert, RefreshControl } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';



function WaiterDetailOrder(props) {
  const [user, setUser] = useState('')
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      await setUser(value)
    } catch(e) {
      // error reading value
    }
  }
  getData()

  return (
    <Image
        style={styles.tinyLogo}
        source={{
          uri: 'http://res.cloudinary.com/pqshop/image/upload/v1645602716/pqfood/tmp-1-1645602714683_tccq2n.jpg'
        }}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
export default WaiterDetailOrder;
