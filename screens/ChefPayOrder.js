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
import styles from '../components/styles';

function ChefPayOrder(props) {

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
      <View style={styles.footerOneElement}>
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
        
      </View>
    </>

    );
  }
}


export default ChefPayOrder;
