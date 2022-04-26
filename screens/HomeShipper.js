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

function HomeShipper(props) {

  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [socket, setSocket] = useState(null)
  const toast = useToast();
  const [bookShip, setBookShip] = useState(null)
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true)

  const getOrderShip = () => {
    axios({
      method: 'get',
      url: '/shipper/homeShipper',
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
    if (user !== "")
      socket?.emit("newUser", { userName: user, position: 3 })
  }, [socket, user])

  useEffect(() => {
    socket?.on("getNotificationShipperConfirmBookShip", data => {
      getOrderShip()
    })
    socket?.on("getNotificationShipperUpdateBookTable", data => {
      getOrderShip()
    })
    socket?.on("getNotificationShipperReceiveBookShip", data => {
      getOrderShip()
    })
    socket?.on("getNotificationShipperCompleteBookShip", data => {
      getOrderShip()
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socket?.on("getNotificationChefCompleteBookShip", data => {
      getOrderShip()
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socket?.on("getNotificationChefConfirmBookShip", data => {
      getOrderShip()
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socket?.on("getNotificationShipperCancelBookShip", data => {
      getOrderShip()
      toast.show(data, {
        type: "danger",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socket?.on("getNotificationBookShip", data => {
      getOrderShip()
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socket?.on("getNotificationAdminCancelShip", data => {
      getOrderShip()
      toast.show(data, {
        type: "danger",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
  }, [socket])

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
            navigation.navigate('ShipperDetailBookShip', { orderId: item.orderId, user: user, name: name, socket: socket })
          }
          else if (item.color === "green") {
            navigation.navigate('ShipperCompleteBookShip', { orderId: item.orderId, user: user, name: name, socket: socket })
          }
          else if (item.color === "blue") {
            navigation.navigate('ShipperReceiveBookShip', { orderId: item.orderId, user: user, name: name, socket: socket })
          }
          else {
            navigation.navigate('ShipperConfirm', { orderId: item.orderId, user: user, name: name, socket: socket })
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

export default HomeShipper;