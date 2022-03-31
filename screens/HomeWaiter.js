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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastProvider } from 'react-native-toast-notifications'
import { useToast } from "react-native-toast-notifications";
import URL from '../components/UrlSocketIO';


import { io } from "socket.io-client";

function HomeWaiter(props) {

  const toast = useToast();

  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [socket, setSocket] = useState(null)

  const getData = async () => {
    try {
      const value1 = await AsyncStorage.getItem('user')
      const value2 = await AsyncStorage.getItem('name')
      await setUser(value1)
      await setName(value2)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setSocket(io(URL));
  }, [])

  useEffect(() => {
    socket?.emit("newUser", { position: 1 })
  }, [socket])

  useEffect(() => {
    socket?.on("getNotificationUpdate", data => {
      getdinnerTable()
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 30000,
        offset: 30,
        animationType: "slide-in",
      });
    })
  }, [socket])


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
    const intervalId = setInterval(() => {
      getdinnerTable()
    }, 60000)

    return () => clearInterval(intervalId);

  }, [isFocused])


  const renderItem = ({ item }) => {
    var backgroundColor = ""
    if (item.color === "Orange") {
      backgroundColor = "#ffcc66"
    }
    else if (item.color === "Green") {
      backgroundColor = "#99ff66"
    }
    else if (item.color === "Blue") {
      backgroundColor = "#0099ff"
    }
    else {
      backgroundColor = "#ffffff"
    }

    return (
      <Item
        item={item}
        onPress={() => {
          if (item.color === "Orange") {
            navigation.navigate('WaiterDetailOrder', { nameTable: item.nameTable, slug: item.slug, user: user, name: name })
          }
          else if (item.color === "Green") {
            navigation.navigate('WaiterPayOrder', { nameTable: item.nameTable, slug: item.slug, user: user, name: name, socket: socket })
          }
          else if (item.color === "Blue") {
            navigation.navigate('WaiterCompleteFood', { nameTable: item.nameTable, slug: item.slug, name: name, user: user })
          }
          else {
            navigation.navigate('WaiterAddOrder', { nameTable: item.nameTable, slug: item.slug, name: name, user: user, socket: socket })

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
      {/* <TouchableOpacity
        onPress={()=>{
          socket.disconnect()
        }
        }
        >
          <Text>nhap vao</Text>
        </TouchableOpacity> */}

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
