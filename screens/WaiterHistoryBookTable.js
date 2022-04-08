import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/styles';
import LoadingComponent from '../components/Loading';
import axios from 'axios';
import RenderHistoryBookTable from '../components/RenderHistoryBookTable';
import showToast from '../components/ShowToast';
import { useIsFocused } from '@react-navigation/native'
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function WaiterHistoryBookTable(props) {

  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [bookTable, setBookTable] = useState(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused()
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
  const getBookTableConfirm = () => {
    axios({
      method: 'get',
      url: '/waiter/getBookTable',
      params: {
        state: "all"
      }
    })
      .then(response => {
        setBookTable(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getData()
    getBookTableConfirm()
  }, [])

  useEffect(() => {
    getBookTableConfirm()
  }, [isFocused])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    getBookTableConfirm();
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
  };

  const RenderItem = ({ item }) => {
    return (
      <RenderBookTable
        item={item}
        nameBtn="Hoàn thành"
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
            data={bookTable}
            renderItem={RenderHistoryBookTable}
            keyExtractor={(item) => item._id}
            style={{ marginTop: 10 }}
          />

        </View>
      </>
    );
  }
}

export default WaiterHistoryBookTable;
