import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, BackHandler, Alert } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native'
import { io } from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../components/UrlSocketIO';
import showToast from '../components/ShowToast';
import LoadingComponent from '../components/Loading';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import styles from '../components/stylesShipper';
import CurrencyFormat from 'react-currency-format';
import RenderBookShipElement from '../components/RenderBookShipElement';

function ChefBookShip(props) {

  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [socketBookShip, setSocketBookShip] = useState(null)
  const [socket, setSocket] = useState(null)

  const toast = useToast();
  const [bookShip, setBookShip] = useState(null)
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true)
  const [socketId, setSocketId] = useState(null)

  const getOrderShip = () => {
    axios({
      method: 'get',
      url: '/chef/chefBookShip',
    })
      .then(response => {
        setBookShip(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getOrderShip()
  }, [isFocused])

  const storeSocketId = async (value) => {
    try {
      await AsyncStorage.setItem('socketId', value)
    } catch (e) {
      console.log(e)
    }
  }

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
    setSocketBookShip(io(URL));
    setSocket(io(URL));
  }, [])

  useEffect(async () => {
    try {
      let socketIdStore = await AsyncStorage.getItem('socketId')
      if (socketId === null || socketId !== socketIdStore) {
        if (user !== "") {
          await socketBookShip?.emit("newUser", { userName: user, position: 4 })
          await socket?.emit("newUser", { userName: user, position: 2 })
          await setSocketId("ship")
          await storeSocketId("ship")
        }
      }
    } catch (e) {
      console.log(e)
    }

  }, [socketBookShip, isFocused, user])

  //positon 2
  useEffect(() => {
    socket?.on("getNotificationAddOrder", data => {
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socket?.on("getNotificationShipperConfirmBookShip", data => {
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socket?.on("getNotificationWaiterUpdate", data => {
      toast.show(data.message, {
        type: data.type,
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socket?.on("getNotificationWaiterCompleteOrder", data => {
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socket?.on("getNotificationShipperUpdateBookTable", data => {
      toast.show(data, {
        type: "normal",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
  }, [socket])

  //position 4
  useEffect(() => {
    socketBookShip?.on("getNotificationChefConfirmBookShip", data => {
      getOrderShip()
    })
    socketBookShip?.on("getNotificationChefCompleteBookShip", data => {
      getOrderShip()
    })
    socketBookShip?.on("getNotificationShipperCompleteBookShip", data => {
      getOrderShip()
    })


    socketBookShip?.on("getNotificationShipperReceiveBookShip", data => {
      getOrderShip()
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })

    socketBookShip?.on("getNotificationShipperCancelBookShip", data => {
      getOrderShip()
      toast.show(data, {
        type: "danger",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })

    socketBookShip?.on("getNotificationShipperConfirmBookShip", data => {
      getOrderShip()
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })

    socketBookShip?.on("getNotificationShipperUpdateBookTable", data => {
      getOrderShip()
      toast.show(data, {
        type: "normal",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
  }, [socketBookShip])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    getOrderShip();
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
  };



  const renderItem = ({ item }) => {

    var backgroundColor = ""
    if (item.color === "orange") {
      backgroundColor = "#ffcc66"
    }
    else if (item.color === "green") {
      backgroundColor = "#99ff66"
    }
    else if (item.color === "blue") {
      backgroundColor = "#0099ff"
    }
    else {
      backgroundColor = "#ffffff"
    }
    return (
      <RenderBookShipElement
        item={item}
        onPress={() => {
          if (item.color === "orange") {
            navigation.navigate('ChefConfirmBookShip', { orderId: item.orderId, user: user, name: name, socket: socket })
          }
          else if (item.color === "green") {
            navigation.navigate('ChefCompleteBookShip', { orderId: item.orderId })
          }
          else if (item.color === "blue") {
            navigation.navigate('ChefProcessBookShip', { orderId: item.orderId, user: user, name: name, socket: socket })
          }
          else {
            showToast("Chờ xác nhận")
          }
        }}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

  if (loading) {
    return (
      <LoadingComponent />
    )
  }
  else {

    return (
      <>
        <View style={styles.container}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#ffcc66", "green", "blue"]}
              />
            }
            data={bookShip}
            renderItem={renderItem}
            keyExtractor={(item) => item.orderId}
          />
        </View>
      </>
    );
  }
}

export default ChefBookShip;