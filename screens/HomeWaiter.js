import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList, RefreshControl, BackHandler } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";
import URL from '../components/UrlSocketIO';
import { io } from "socket.io-client";

function HomeWaiter(props) {

  const toast = useToast();
  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [socket, setSocket] = useState(null)
  const [refreshing, setRefreshing] = React.useState(false);
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
    getdinnerTable()
    // const intervalId = setInterval(() => {
    //   getdinnerTable()
    // }, 60000)

    // return () => clearInterval(intervalId);

  }, [isFocused])

  useEffect(() => {
    setSocket(io(URL));
  }, [])

  useEffect(() => {
    socket?.emit("newUser", { position: 1 })
  }, [socket])

  useEffect(() => {
    socket?.on("getNotificationUpdate", data => {
      getdinnerTable()
      toast.show(data.message, {
        type: data.type,
        placement: "top",
        duration: 30000,
        offset: 30,
        animationType: "slide-in",
      });
    })
  }, [socket])
  useEffect(() => {
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
  }, [socket])

  useEffect(() => {
    socket?.on("getNotificationChefNote", data => {
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

  useEffect(() => {
    socket?.on("getNotificationChefCompleteOrder", data => {
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
    socket?.on("getNotificationWaiterCompleteOrder", data => {
      getdinnerTable()
    })
  }, [socket])

  useEffect(() => {
    socket?.on("getNotificationWaiterCompletePayOrder", data => {
      getdinnerTable()
    })
  }, [socket])

  useEffect(() => {
    socket?.on("getNotificationBookShip", data => {
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
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        Alert.alert("Thông báo", "Bạn có chắc muốn thoát ứng dụng?", [
          {
            text: "Hủy",
            onPress: () => null,
            style: "cancel"
          },
          {
            text: "Xác nhận", onPress: () => {
              socket?.emit('forceDisconnect');
              navigation.navigate("Login")
            }
          }
        ]);
        return true;
      }
    );

    return () => backHandler.remove();
  }, [socket]);


  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    getdinnerTable();
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
  };

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

    return (
      <Item
        item={item}
        onPress={() => {
          if (item.color === "Orange") {
            navigation.navigate('WaiterDetailOrder', { nameTable: item.nameTable, slug: item.slug, user: user, name: name, socket: socket })
          }
          else if (item.color === "Green") {
            navigation.navigate('WaiterPayOrder', { nameTable: item.nameTable, slug: item.slug, user: user, name: name, socket: socket })
          }
          else if (item.color === "Blue") {
            navigation.navigate('WaiterCompleteFood', { nameTable: item.nameTable, slug: item.slug, name: name, user: user, socket: socket })
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
      <TouchableOpacity
        onPress={()=>{
          navigation.navigate('Test')
        }
        }
        >
          <Text>nhap vao</Text>
        </TouchableOpacity>

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
