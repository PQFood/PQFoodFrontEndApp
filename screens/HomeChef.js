import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, BackHandler, Alert } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native'
import { io } from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../components/UrlSocketIO';
import showToast from '../components/ShowToast';

function HomeChef(props) {

  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [socket, setSocket] = useState(null)
  const toast = useToast();
  const [dinnerTable, setDinnerTable] = useState(null)
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = useState(false);
  const [socketShip, setSocketShip] = useState(null)
  const [socketId, setSocketId] = useState(null)

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

  const storeSocketId = async (value) => {
    try {
      await AsyncStorage.setItem('socketId', value)
    } catch (e) {
      console.log(e)
    }
  }

  //2
  useEffect(() => {
    setSocket(io(URL));
  }, [])
  //4
  useEffect(() => {
    setSocketShip(io(URL));
  }, [])

  useEffect(async () => {
    try {
      let socketIdStore = await AsyncStorage.getItem('socketId')
      if (socketId === null || socketId !== socketIdStore) {
        if (user !== ""){
          await socketShip?.emit("newUser", { userName: user, position: 4 })
          await socket?.emit("newUser", { userName: user, position: 2 })
          await setSocketId("home")
          await storeSocketId("home")
        }
      }
    } catch (e) {
      console.log(e)
    }

  }, [socketShip, isFocused, user, socket])
  //positon 2
  useEffect(() => {
    socket?.on("getNotificationUpdate", data => {
      getdinnerTable()
    })
    socket?.on("getNotificationChefCompleteOrder", data => {
      getdinnerTable()
    })
    socket?.on("getNotificationWaiterCompletePayOrder", data => {
      getdinnerTable()
    })
    socket?.on("getNotificationShipperCancelBookShip", data => {
      getdinnerTable()
    })

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
    socket?.on("getNotificationWaiterCompleteOrder", data => {
      getdinnerTable()
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socket?.on("getNotificationShipperConfirmBookShip", data => {
      getdinnerTable()
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socket?.on("getNotificationWaiterUpdate", data => {
      getdinnerTable()
      toast.show(data.message, {
        type: data.type,
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socket?.on("getNotificationShipperUpdateBookTable", data => {
      getdinnerTable()
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

    socketShip?.on("getNotificationShipperReceiveBookShip", data => {
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })

    socketShip?.on("getNotificationShipperConfirmBookShip", data => {
      toast.show(data, {
        type: "success",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })

    socketShip?.on("getNotificationShipperUpdateBookTable", data => {
      toast.show(data, {
        type: "normal",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
    socketShip?.on("getNotificationShipperCancelBookShip", data => {
      toast.show(data, {
        type: "danger",
        placement: "top",
        duration: 60000,
        offset: 30,
        animationType: "slide-in",
      });
    })
  }, [socketShip])

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.nameTable}</Text>
    </TouchableOpacity>
  );

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    getdinnerTable();
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
  };



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
            navigation.navigate('ChefDetailOrder', { nameTable: item.nameTable, slug: item.slug, user: user, name: name, socket: socket })
          }
          else if (item.color === "Green") {
            navigation.navigate('ChefPayOrder', { nameTable: item.nameTable, slug: item.slug })
          }
          else if (item.color === "Blue") {
            navigation.navigate('ChefCompleteFood', { nameTable: item.nameTable, slug: item.slug, user: user, name: name, socket: socket })
          }
          else {
            showToast("Bàn trống")
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#ffcc66", "green", "blue"]}
            />
          }
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