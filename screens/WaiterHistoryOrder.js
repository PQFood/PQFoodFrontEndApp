import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import styles from '../components/styles';
import LoadingComponent from '../components/Loading';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native'
import RenderHistoryOrder from '../components/RenderHistoryOrder';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import UseGetOrderSearch from '../hooks/UseGetOrderSearch.js';

function WaiterHistoryOrder(props) {

  const { navigation, route } = props;
  const [quantity, setQuantity] = useState(1)
  const [orderHistory, setOrderHistory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [full, setFull] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused()
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)

  const getHistoryOrder = () => {
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
    getHistoryOrder()
    setSearch('')
    setIsSearch(false)
  }, [isFocused, quantity])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    setQuantity(1)
    getHistoryOrder();
    setRefreshing(true);
    setSearch('')
    setIsSearch(false)
    wait(1200).then(() => setRefreshing(false));
  };

  const RenderItem = ({ item }) => {
    let colorItem = ""
    if (item.state === "Đã hủy") colorItem = "#ff3300"
    else colorItem = "#66ff66"

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailOrder', { orderId: item.orderId })
        }}
        style={{
          marginBottom: 10,
          width: windowWidth * 0.9,
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
                UseGetOrderSearch({ search, setOrderHistory, setIsSearch })
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
          {/* {orderHistory.length > 0 ? ( */}
            <>
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
                ListFooterComponent={
                  <>
                    {(quantity < 5 && !full) ? (
                      <>
                        {
                          isSearch ? (null) : (
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
                          )
                        }
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
          {/* ) : (
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
          )} */}
        </View>
      </>
    );
  }
}

export default WaiterHistoryOrder;
