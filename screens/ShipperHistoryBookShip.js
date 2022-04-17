import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, BackHandler, Alert } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native'
import LoadingComponent from '../components/Loading';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import styles from '../components/stylesShipper';
import CurrencyFormat from 'react-currency-format';
import { AntDesign } from '@expo/vector-icons';
import RenderBookShipElement from '../components/RenderBookShipElement';

function ShipperHistoryBookShip(props) {

  const { navigation, route } = props;

  const toast = useToast();
  const [bookShip, setBookShip] = useState(null)
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [full, setFull] = useState(false)

  const getOrderShip = () => {
    axios({
      method: 'get',
      url: '/shipper/getBookShipHistory',
      params: {
        quantity: quantity
      }
    })
      .then(response => {
        setBookShip(response.data.order)
        setFull(response.data.full)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getOrderShip()
  }, [isFocused,quantity])


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
    if (item.state === "Đã hủy") {
      backgroundColor = "#ff3300"
    }
    else {
      backgroundColor = "#66ff66"
    }
    return (
      <RenderBookShipElement
        item={item}
        onPress={() => {
          navigation.navigate("ShipperDetailHistotyBookShip",{orderId: item.orderId})
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

export default ShipperHistoryBookShip;