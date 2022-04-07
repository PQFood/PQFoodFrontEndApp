import React, { useState, useEffect } from 'react';
import { Text, View} from 'react-native';
import URL from '../components/UrlSocketIO';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/styles';
// import { io } from "socket.io-client";



function LogOut(props) {

  const { navigation, route } = props;
  // const [name, setName] = useState('')
  // const [user, setUser] = useState('')
  // const [socket, setSocket] = useState(null)
  // const getData = async () => {
  //   try {
  //     const value1 = await AsyncStorage.getItem('user')
  //     const value2 = await AsyncStorage.getItem('name')
  //     await setUser(value1)
  //     await setName(value2)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  // useEffect(() => {
  //   getData()
  // }, [])
  const removeData = () => {
    try {
      AsyncStorage.removeItem('user')
      AsyncStorage.removeItem('name')
      navigation.navigate('Login')
    } catch (e) {
      console.log(e)
    }
  }

  // useEffect(() => {
  //   setSocket(io(URL));
  // }, [])

  // useEffect(() => {
  //   socket?.emit("removeUserOnline", {
  //     userName: user,
  //   })
  // }, [socket,user])

  useEffect(() => {
    setTimeout(() => {
      removeData()
    }, 1200)
  })


  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        fontWeight: "bold",
        color: "#ff6600"
      }}>Đang tải...</Text>
    </View>

  )
}

export default LogOut;
