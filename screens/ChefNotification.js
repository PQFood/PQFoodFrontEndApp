import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, RefreshControl, FlatList } from 'react-native';

import axios from 'axios';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { LogBox } from 'react-native';
import styles from '../components/styles';

function ChefNotification(props) {

  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState(null)

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  useEffect(() => {
    setUser(route.params.user);
    setName(route.params.name);
    setSocket(route.params.socket);
  }, [])

  const getNote = () => {
    axios({
      method: 'get',
      url: '/chef/getNote',
      params: {
        table: route.params.slug
      }
    })
      .then(response => {
        setNote(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getNote()
  }, [])
  if (loading) {
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
  else {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>{route.params.nameTable}</Text>
          <TextInput
            style={[styles.noteStyle,{width: windowWidth*0.8, marginVertical: 14}]}
            multiline
            numberOfLines={6}
            onChangeText={(text) => setNote(text)}
            value={note}
            placeholder="Ghi chú"
          />
          <TouchableOpacity style={{ backgroundColor: "#ffcc66", alignItems: "center", height: windowHeight*0.07, borderRadius: 15, width: windowWidth*0.8 }}
            onPress={()=>{
              axios({
                method: 'post',
                url: '/chef/setNote',
                data: {
                  table: route.params.slug,
                  note: note,
                  user: user
                }
              })
                .then(response => {
                  socket.emit("sendNotificationChefNote", {
                    senderName: name,
                    table: route.params.nameTable,
                  })
                  navigation.goBack()
                })
                .catch(error => {
                  console.log(error)
                })
            }}
          >
            <Text style={[styles.textBold, { lineHeight: windowHeight*0.07, textAlign: "center" }]}>Thông báo</Text>
          </TouchableOpacity>

        </View>
      </>

    );
  }
}

export default ChefNotification;
