import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, RefreshControl } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';



function HomeAdmin(props) {
  const { navigation, route } = props;
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
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>Hello {user}, {route.params.data.userName}!</Text>
    </View>
  );
}

export default HomeAdmin;
