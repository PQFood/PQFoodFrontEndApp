import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, FlatList, SafeAreaView } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrencyFormat from 'react-currency-format';
import RenderItemOrder from '../components/RenderItemOrder';
import RenderStaff from '../components/RenderStaff';

function WaiterDetailOrder(props) {

  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [order, SetOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      await setUser(value)
    } catch (e) {
      console.log(e)
    }
  }
  if (user === '') getUser()
  const getOrder = () => {
    axios({
      method: 'get',
      url: '/waiter/getOrder',
      params: {
        table: route.params.slug
      }
    })
      .then(response => {
        SetOrder(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(async() => {
    await getOrder()
  }, [])
  // console.log(order.staff)
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

        <FlatList
          ListFooterComponent={
            <>
              <FlatList
                data={order.staff}
                ListHeaderComponent={<Text style={styles.ul}>Nhân viên xử lý</Text>}
                renderItem={RenderStaff}
                keyExtractor={(item) => item.slug}
                ListFooterComponent={
                  <TextInput
                    style={{
                      backgroundColor: "#ffffff",
                      borderWidth: 1,
                      paddingLeft: 10,
                      borderRadius: 10,
                    }}
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
      <View style={styles.footer}>
        <View style={styles.footer2}>
          <Text style={styles.textBold}>Tổng Tiền: </Text>
          <CurrencyFormat
            value={order.total}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' đ'}
            renderText={value => <Text style={styles.textBold}>{value}</Text>}
          />
        </View>
        <View>
          <TouchableOpacity style={{ backgroundColor: "#ffcc66", alignItems: "center", height: 40 }}
            // onPress={() => {
            //     axios({
            //       method: 'post',
            //       url: '/waiter/addOrder',
            //       data: {
            //         food: foodState,
            //         drink: drinkState,
            //         total: total,
            //         nameTable: route.params.nameTable,
            //         slugTable: route.params.slug,
            //         note: note,
            //         staff: user

            //       }
            //     })
            //       .then(response => {
            //         if (response.data === "ok") navigation.navigate('HomeWaiter')
            //         else alert("Đặt đơn không thành công")
            //       })
            //       .catch(error => {
            //         console.log(error)
            //       })
            //   }
            // }
          >
            <Text style={[styles.textBold, { lineHeight: 40 }]}>Hoàn thành món</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    color: "#ff6600",
    marginVertical: 6
  },
  ul: {
    fontSize: 18,
    color: "#ff6600",
    textAlign: "center"
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: windowWidth * 0.9,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10
  },
  groupInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: windowWidth * 0.6
  },
  footer: {
    height: windowHeight * 0.1,
  },
  footer2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 6,
    backgroundColor: "#ccffcc"
  }
  ,
  textBold: {
    fontWeight: "bold",
    fontSize: 20
  },
  textChangeQuantity: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  changeQuantity: {
    backgroundColor: "#ff6600",
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 10
  }
});

export default WaiterDetailOrder;
