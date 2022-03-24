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
import { useIsFocused } from '@react-navigation/native'

function HomeWaiter(props) {

  const { navigation, route } = props;

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.nameTable}</Text>
    </TouchableOpacity>
  );

  const [dinnerTable, setDinnerTable] = useState(null)
  const isFocused = useIsFocused()
  const getdinnerTable = () => {
    axios({
      method: 'get',
      url: '/waiter/homeWaiter',
    })
      .then(response => {
        setDinnerTable(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

 

  useEffect(() => {
    getdinnerTable()
  }, [isFocused])


  const renderItem = ({ item }) => {
    var backgroundColor = ""
    if (item.color === "Orange") {
      backgroundColor = "#ffcc66"
    }
    else if (item.color === "Green") {
      backgroundColor = "#99ff66"

    }
    else {
      backgroundColor = "#ffffff"
    }

    return (
      <Item
        item={item}
        onPress={() => {
          if (item.color === "Orange") {
            navigation.navigate('WaiterDetailOrder',{ nameTable: item.nameTable, slug: item.slug })
          }
          else if (item.color === "Green") {
            navigation.navigate('WaiterPayOrder')
          }
          else {
            navigation.navigate('WaiterAddOrder', { nameTable: item.nameTable, slug: item.slug })

          }
        }}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dinnerTable}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.slug}
      />

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  item: {
    padding: 50,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
export default HomeWaiter;