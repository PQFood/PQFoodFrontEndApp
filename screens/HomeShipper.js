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


function HomeShipper(props) {
  const { navigation, route } = props;
  const numbers = [1, 2, 3, 4, 5];
  return (
    <>
    <View>
      { numbers ? 
      (
        
        numbers.map((number)=>{
          <Text>abc</Text>
        })
      // <Text>abs</Text>
      ) 
      : null}
      </View>
    
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>Hello shipper!</Text>
    </View>
    </>
  );
}

export default HomeShipper;