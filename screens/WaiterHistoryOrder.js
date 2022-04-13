import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, FlatList, Button } from 'react-native';
import styles from '../components/styles';
import LoadingComponent from '../components/Loading';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native'
import RenderHistoryOrder from '../components/RenderHistoryOrder';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { AntDesign } from '@expo/vector-icons';

function WaiterHistoryOrder(props) {

  const { navigation, route } = props;
  const [quantity, setQuantity] = useState(1)
  const [orderHistory, setOrderHistory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [full, setFull] = useState(false)
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
        setFull(response.data.full)
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
  }, [quantity])

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
    let colorItem = ""
    if(item.state === "Đã hủy") colorItem = "#ff3300"
    else colorItem = "#66ff66"

    return (
      <TouchableOpacity
        onPress={()=>{
          navigation.navigate('DetailOrder',{orderId: item.orderId})
        }}
        style={{marginBottom: 10, 
          width: windowWidth*0.9,
          backgroundColor: colorItem,
          marginHorizontal: 10,
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 8
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
            renderItem={RenderItem}
            keyExtractor={(item) => item._id}
            style={{ marginTop: 10 }}
            ListFooterComponent = {
              <>
              {(quantity < 5 && !full) ? (
                <TouchableOpacity
                onPress={()=>{
                  setQuantity(quantity+1)
                }}
                style={{
                  backgroundColor: "#66ccff",
                  alignItems: "center",
                  marginHorizontal: windowWidth*0.3,
                  paddingVertical: windowHeight*0.01,
                  borderRadius: 10,
                }}
              >
                <Text style={{fontSize: 16}}><AntDesign name="downcircle" size={16} color="black" />   Xem thêm</Text>
              </TouchableOpacity>
              ) : (
                <TouchableOpacity
                onPress={()=>{
                  setQuantity(1)
                }}
                style={{
                  backgroundColor: "#ffcc66",
                  alignItems: "center",
                  marginHorizontal: windowWidth*0.3,
                  paddingVertical: windowHeight*0.01,
                  borderRadius: 10,
                }}
              >
                <Text style={{fontSize: 16}}><AntDesign name="upcircle" size={16} color="black" />  Ẩn bớt</Text>
              </TouchableOpacity>
              )}
              
              </>
            }
          />

        </View>
      </>
    );
  }
}

export default WaiterHistoryOrder;
