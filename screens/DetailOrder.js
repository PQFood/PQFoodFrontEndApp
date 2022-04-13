import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, FlatList, SafeAreaView } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import RenderItemOrder from '../components/RenderItemOrder';
import RenderStaff from '../components/RenderStaff';
import styles from '../components/styles';
import LoadingComponent from '../components/Loading';

function DetailOrder(props) {

  const { navigation, route } = props;
  const [order, SetOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [staff, setStaff] = useState(null)

  const getOrderHistory = () => {
    axios({
      method: 'get',
      url: '/waiter/getDetailOrder',
      params: {
        orderId: route.params.orderId
      }
    })
      .then(response => {
        SetOrder(response.data)
        setStaff(response.data.staff)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getOrderHistory()
  }, [])


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
            ListFooterComponent={
              <>
                <FlatList
                  data={staff}
                  ListHeaderComponent={<Text style={styles.ul}>Nhân viên xử lý</Text>}
                  renderItem={RenderStaff}
                  keyExtractor={(item) => item.id}
                  ListFooterComponent={
                    <TextInput
                      style={styles.noteStyle}
                      multiline
                      numberOfLines={4}
                      value={order.note}
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  }
                />
              </>
            }
            ListHeaderComponent={
              <Text style={styles.ul}>Món gọi</Text>
            }
            data={order.order}
            renderItem={RenderItemOrder}
            keyExtractor={(item) => item.slug}
          />
        </View>
        <View style={[styles.footer]}>
          <View style={[styles.footer2]}>
            <Text style={styles.textBold}>Tổng Tiền: </Text>
            <CurrencyFormat
              value={order.total}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' đ'}
              renderText={value => <Text style={styles.textBold}>{value}</Text>}
            />
          </View>
          <View style={{alignItems: "center", backgroundColor: "#ccffcc"}}>
            {order.state === "Đã hủy" ? (
            <Text style={[styles.textBold, { lineHeight: 40, color: "#ff0000" }]}>{order.state}</Text>

            ) : (
            <Text style={[styles.textBold, { lineHeight: 40, color:"#00cc00" }]}>{order.state}</Text>
            )}
          </View>

        </View>
      </>

    );
  }
}


export default DetailOrder;
