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
import URL from '../components/UrlSocketIO';
import { io } from "socket.io-client";
import { LogBox } from 'react-native';
import styles from '../components/styles';


function WaiterPayOrder(props) {
  // console.log(URL)
  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [socket, setSocket] = useState(null)
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  useEffect(() => {
    setUser(route.params.user)
    setSocket(route.params.socket);
  }, [])
  // console.log(route.params.socket)
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <TouchableOpacity
        onPress={
          ()=>{
            socket.emit("sendNotificationAddOrder",{
              senderName: user,
            })
          }
        }
      >
        <Text>pay {route.params.user}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default WaiterPayOrder;
