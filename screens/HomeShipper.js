import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, RefreshControl } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';
import { useToast } from "react-native-toast-notifications";
import Toast from 'react-native-toast-message';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
function HomeShipper(props) {
  const { navigation, route } = props;
  
  const toast = useToast();
  // console.log(toast)
  useEffect(() => {
    toast.show("Task finished successfully",
    {
      type: "success",
      placement: "top",
      duration: 20000,
      offset: 30,
      animationType: "slide-in",
    });
  }, []);
  useEffect(()=>{
    Toast.show({
      type: 'success',
      text1: 'Hello abc',
      text2: 'This is some something 👋',
      visibilityTime: 10000
    });
  },[])
  return (
    
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>Hello shipper!</Text>
      <Toast />
    </View>
  );
}

export default HomeShipper;