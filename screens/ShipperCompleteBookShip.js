import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import RenderItemOrder from '../components/RenderItemOrder';
import RenderStaff from '../components/RenderStaff';
import { LogBox } from 'react-native';
import styles from '../components/styles';
import LoadingComponent from '../components/Loading';
import { useIsFocused } from '@react-navigation/native'
import RenderInfoCustomer from '../components/RenderInfoCustomer';


function ShipperCompleteBookShip(props) {

  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [bookShip, setBookShip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState(null)
  const isFocused = useIsFocused()

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  useEffect(() => {
    setUser(route.params.user);
    setName(route.params.name);
    setSocket(route.params.socket);
  }, [])
  const getBookShip = () => {
    axios({
      method: 'get',
      url: '/shipper/getBookShip',
      params: {
        orderId: route.params.orderId
      }
    })
      .then(response => {
        setBookShip(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getBookShip()
  }, [isFocused])

  if (loading) {
    return (
      <LoadingComponent />
    )
  }
  else {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>{route.params.orderId}</Text>

          <FlatList
            ListFooterComponent={
              <>
                <RenderInfoCustomer bookShip={bookShip}/>
                <FlatList
                  data={bookShip.staff}
                  ListHeaderComponent={<Text style={styles.ul}>Nhân viên xử lý</Text>}
                  renderItem={RenderStaff}
                  keyExtractor={(item) => item.id}
                />
              </>
            }
            ListHeaderComponent={
              <Text style={styles.ul}>Món gọi</Text>
            }
            data={bookShip.order}
            renderItem={RenderItemOrder}
            keyExtractor={(item) => item.slug}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.footer2}>
            <Text style={styles.textBold}>Tổng Tiền: </Text>
            <CurrencyFormat
              value={bookShip.total}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' đ'}
              renderText={value => <Text style={styles.textBold}>{value}</Text>}
            />
          </View>
          <View style={styles.footerPage}>
            
            <TouchableOpacity
              onPress={() => {
                axios({
                  method: 'get',
                  url: '/shipper/completeBookShip',
                  params: {
                    orderId: route.params.orderId,
                    user: user
                  }
                })
                  .then(response => {
                    if (response.data === "ok") {
                      socket.emit("sendNotificationShipperCompleteBookShip", {
                        senderName: name,
                        orderId: route.params.orderId,
                      })
                      navigation.goBack()
                    }
                    else alert("Không thể hoàn thành hóa đơn")
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }}
            >
              <Text style={[styles.textBold, styles.btnFooter]}>Hoàn thành</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Cảnh báo",
                  "Bạn có chắc muốn hủy hóa đơn này?",
                  [
                    {
                      text: "Bỏ qua",
                    },
                    {
                      text: "Xác nhận", onPress: () => {
                        axios({
                          method: 'get',
                          url: '/shipper/deleteBookShip',
                          params: {
                            orderId: route.params.orderId,
                            user: user
                          }
                        })
                          .then(response => {
                            if (response.data === "ok") {
                              socket.emit("sendNotificationShipperCancelBookShip", {
                                senderName: name,
                                orderId: route.params.orderId,
                              })
                              navigation.goBack()
                            }
                            else alert("Không thể xóa hóa đơn")
                          })
                          .catch(error => {
                            console.log(error)
                          })

                      }
                    }
                  ]
                );

              }}
            >
              <Text style={[styles.textBold, styles.btnFooter]}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>

    );
  }
}

export default ShipperCompleteBookShip;
