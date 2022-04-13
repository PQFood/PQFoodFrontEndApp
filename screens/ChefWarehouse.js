import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, RefreshControl } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native'

import axios from 'axios';
import LoadingComponent from '../components/Loading';
import { FlatList } from 'react-native-gesture-handler';
import RenderWarehouse from '../components/RenderWarehouse';



function ChefWarehouse(props) {

  const { navigation, route } = props;
  const [warehouse, setWarehouse] = useState(null)
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true)

  const getWarehouse = () => {
    axios({
      method: 'get',
      url: '/chef/getWarehouse',
    })
      .then(response => {
        setWarehouse(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getWarehouse()
  }, [isFocused])

  const RenderItem = ({ item }) => {
    return (
      <RenderWarehouse 
      item={item}
      updateWarehouse = {()=>{
        navigation.navigate('ChefChangeQuantityWarehouse',{slug: item.slug})
      }}
      />
    )
  }

  if (loading) {
    return (
      <LoadingComponent />
    )
  }
  else {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <FlatList
          data={warehouse}
          renderItem={RenderItem}
          keyExtractor={(item) => item.slug}
        />
      </View>
    );
  }
}

export default ChefWarehouse;
