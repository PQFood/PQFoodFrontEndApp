import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, BackHandler, Alert } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import showToast from '../components/ShowToast';
import LoadingComponent from '../components/Loading';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import styles from '../components/stylesShipper';
import CurrencyFormat from 'react-currency-format';
import RenderBookShipElement from '../components/RenderBookShipElement';
import AdminUseGetOrder from '../hooks/AdminUseGetOrder';
import RenderConfirmOrderAdmin from '../components/RenderConfirmOrderAdmin';

function AdminConfirmOrder(props) {

  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const toast = useToast();
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    AdminUseGetOrder({ setLoading, setOrder, link: "adminGetOrder" })
    const intervalId = setInterval(() => {
      AdminUseGetOrder({ setLoading, setOrder, link: "adminGetOrder" })
    }, 60000)
    return () => clearInterval(intervalId);

  }, [isFocused])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    AdminUseGetOrder({ setLoading, setOrder, link: "adminGetOrder" })
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
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
            data={order}
            renderItem={({ item }) => {
              return (
                <RenderConfirmOrderAdmin
                  item={item}
                  confirm = {true}
                  btnCancel={() => {
                    Alert.alert(
                      "Cảnh báo",
                      "Bạn có chắc muốn hủy đơn hàng này?",
                      [
                        {
                          text: "Bỏ qua",
                        },
                        {
                          text: "Xác nhận", onPress: () => {
                            axios({
                              method: 'post',
                              url: '/admin/adminCancelOrder',
                              data: {
                                orderId: item.orderId
                              }
                            })
                              .then(response => {
                                if (response.data === "ok") {
                                  showToast("Hủy thành công")
                                  AdminUseGetOrder({ setLoading, setOrder, link: "adminGetOrder" })
                                }
                                else {
                                  alert("Hủy thất bại")
                                }
                              })
                              .catch(error => {
                                console.log(error)
                              })
         
                          }
                        }
                      ]
                    );
                  }}
                  btnConfirm={() => {
                    axios({
                      method: 'post',
                      url: '/admin/adminConfirmOrder',
                      data: {
                        orderId: item.orderId
                      }
                    })
                      .then(response => {
                        if (response.data === "ok") {
                          showToast("Xác nhận thành công")
                          AdminUseGetOrder({ setLoading, setOrder, link: "adminGetOrder" })
                        }
                        else {
                          alert("Xác nhận thất bại")
                        }
                      })
                      .catch(error => {
                        console.log(error)
                      })
                  }}
                  NavigationDetail = {()=>{
                    navigation.navigate("DetailOrder",{orderId: item.orderId})
                  }}
                />
              )
            }}
            keyExtractor={(item) => item.orderId}
          />
        </View>
      </>
    );
  }
}

export default AdminConfirmOrder;