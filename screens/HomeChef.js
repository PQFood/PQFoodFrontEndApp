import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, FlatList, ToastAndroid } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';
import { useToast } from "react-native-toast-notifications";

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native'
import Toast from 'react-native-toast-message';
import { io } from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../components/UrlSocketIO';

function HomeChef(props) {

  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [socket, setSocket] = useState(null)
  const toast = useToast();
  const [dinnerTable, setDinnerTable] = useState(null)
  const isFocused = useIsFocused()
  const getdinnerTable = () => {
    axios({
      method: 'get',
      url: '/chef/homeChef',
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
    socket?.emit("newUser", { position: 2 })
  }, [socket])

  useEffect(() => {
    socket?.on("getNotificationAddOrder", data => {
      getdinnerTable()
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
  }, [socket])
  useEffect(() => {
    socket?.on("getNotificationUpdate", data => {
      getdinnerTable()
    })
  }, [socket])

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.nameTable}</Text>
    </TouchableOpacity>
  );



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

    const showToast = () => {
      ToastAndroid.show(
        "Bàn trống",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      )
    }

    return (
      <Item
        item={item}
        onPress={() => {
          if (item.color === "Orange") {
            navigation.navigate('ChefDetailOrder', { nameTable: item.nameTable, slug: item.slug, user: user, name: name, socket: socket })
          }
          else if (item.color === "Green") {
            navigation.navigate('ChefPayOrder', { nameTable: item.nameTable, slug: item.slug })
          }
          else if (item.color === "Blue") {
            navigation.navigate('WaiterCompleteFood', { nameTable: item.nameTable, slug: item.slug })
          }
          else {
            showToast()
          }
        }}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

  return (
    <>

      <View style={styles.container}>
        <FlatList
          data={dinnerTable}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.slug}
        />

      </View>
    </>

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
export default HomeChef;