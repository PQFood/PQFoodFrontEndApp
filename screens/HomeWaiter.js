import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, FlatList } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeWaiter({ navigation, route }) {

  const [dinnerTable, setDinnerTable] = useState(null)
  const getdinnerTable = () => {
    axios({
      method: 'get',
      url: '/homeWaiter',
    })
      .then(response => {
        setDinnerTable(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const renderItem = ({ item }) => (
    <Text>avc</Text>
  );
  
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>Hello, {route.params.data.position}!</Text>
      <FlatList
        data={dinnerTable}
        renderItem={renderItem}
        keyExtractor={item => item.slug}
      />
    </View>
  );
}

export default HomeWaiter;