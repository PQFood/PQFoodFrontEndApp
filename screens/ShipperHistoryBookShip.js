import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, TextInput, Alert } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native'
import LoadingComponent from '../components/Loading';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import styles from '../components/stylesShipper';
import CurrencyFormat from 'react-currency-format';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import RenderBookShipElement from '../components/RenderBookShipElement';
import UseGetShipSearch from '../hooks/UseGetShipSearch';
import { ScrollView } from 'react-native-gesture-handler';

function ShipperHistoryBookShip(props) {

  const { navigation, route } = props;

  const toast = useToast();
  const [bookShip, setBookShip] = useState(null)
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [full, setFull] = useState(false)
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)

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
    setSearch('')
    setIsSearch(false)
  }, [isFocused, quantity])


  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    getOrderShip();
    setRefreshing(true);
    setSearch('')
    setIsSearch(false)
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
          navigation.navigate("ShipperDetailHistotyBookShip", { orderId: item.orderId })
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
          <View style={{ marginTop: 16, marginBottom: 8, flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={{
                backgroundColor: "white",
                width: windowWidth * 0.6,
                height: 45,
                borderRadius: 140,
                textAlign: "center",
                marginRight: 10
              }}
              placeholder="Tìm kiếm"
              onChangeText={(text) => { setSearch(text) }}
              value={search}
            />
            <TouchableOpacity
              onPress={() => {
                UseGetShipSearch({ search, setBookShip, setIsSearch })
              }}
              style={{
                backgroundColor: "#ff6600",
                padding: 8
              }}
              disabled={search ? false : true}
            >
              <FontAwesome name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {bookShip.length > 0 ? (
            <>
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
                ListFooterComponent={
                  <>
                    {(quantity < 5 && !full) ? (
                      <>
                      {isSearch ? (null) : (
                        <TouchableOpacity
                        onPress={() => {
                          setQuantity(quantity + 1)
                        }}
                        style={{
                          backgroundColor: "#66ccff",
                          alignItems: "center",
                          marginHorizontal: windowWidth * 0.3,
                          paddingVertical: windowHeight * 0.01,
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{ fontSize: 16 }}><AntDesign name="downcircle" size={16} color="black" />   Xem thêm</Text>
                      </TouchableOpacity>
                      )}
                      </>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setQuantity(1)
                        }}
                        style={{
                          backgroundColor: "#ffcc66",
                          alignItems: "center",
                          marginHorizontal: windowWidth * 0.3,
                          paddingVertical: windowHeight * 0.01,
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{ fontSize: 16 }}><AntDesign name="upcircle" size={16} color="black" />  Ẩn bớt</Text>
                      </TouchableOpacity>
                    )}

                  </>
                }
              />
            </>
          ) : (
            <>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#ffcc66", "green", "blue"]}
                  />
                }
              >
                <Text style={{ fontSize: 20, color: "#ff6600", marginTop: 16 }}>
                  Không có kết quả tìm kiếm!
                </Text>
              </ScrollView>
            </>
          )}

        </View>
      </>
    );
  }
}

export default ShipperHistoryBookShip;