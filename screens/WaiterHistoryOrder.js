import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/styles';
import LoadingComponent from '../components/Loading';
import axios from 'axios';
import RenderBookTable from '../components/RenderBookTable';
import showToast from '../components/ShowToast';
import { useIsFocused } from '@react-navigation/native'
import RenderHistoryOrder from '../components/RenderHistoryOrder';


function WaiterHistoryOrder(props) {

  const { navigation, route } = props;
  const [quantity, setQuantity] = useState(1)
  const [orderHistory, setOrderHistory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused()

  const getHistoryOrder = (quantity) => {
    axios({
      method: 'get',
      url: '/waiter/getHistoryOrder',
      params: {
        quantity: quantity
      }
    })
      .then(response => {
        setOrderHistory(response.data.order)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getHistoryOrder(quantity)
  }, [])

  useEffect(() => {
    getHistoryOrder(quantity)
  }, [isFocused])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    getHistoryOrder(quantity);
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
  };

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={()=>{
          alert("abs")
        }}
      >
        <RenderHistoryOrder
          item={item}
        />
      </TouchableOpacity>

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
            data={orderHistory}
            numColumns={2}
            renderItem={RenderItem}
            keyExtractor={(item) => item._id}
            style={{ marginTop: 10 }}
          />

        </View>
      </>
    );
  }
}

export default WaiterHistoryOrder;
