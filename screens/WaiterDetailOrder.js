import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, FlatList, RefreshControl, Modal, Pressable } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';

import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import RenderItemOrder from '../components/RenderItemOrder';
import RenderStaff from '../components/RenderStaff';
import { LogBox } from 'react-native';
import styles from '../components/styles';
import LoadingComponent from '../components/Loading';
import ReasonCancelOrder from '../components/ReasonCancelOrder';

function WaiterDetailOrder(props) {

  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [reason, setReason] = useState('')
  const [order, SetOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState(null)
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  useEffect(() => {
    setUser(route.params.user);
    setName(route.params.name);
    setSocket(route.params.socket);
  }, [])
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
  useEffect(() => {
    getOrder()
  }, [])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    getOrder();
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
          <Text style={styles.title}>{route.params.nameTable}</Text>

          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#ffcc66", "green", "blue"]}
              />
            }
            ListFooterComponent={
              <>
                <FlatList
                  data={order.staff}
                  ListHeaderComponent={<Text style={styles.ul}>Nhân viên xử lý</Text>}
                  renderItem={RenderStaff}
                  keyExtractor={(item) => item.id}
                  ListFooterComponent={
                    <>
                    <TextInput
                      style={styles.noteStyle}
                      multiline
                      numberOfLines={4}
                      value={order.note}
                      editable={false}
                      selectTextOnFocus={false}
                    />
                    <Text style={{textAlign: "center", color: "#ff6600", fontSize: 16, marginTop: 8, fontWeight: "bold" }}>{order.state}</Text>
                    </>
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
          <View style={styles.footerPage}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WaiterEditOrder', { nameTable: route.params.nameTable, slug: route.params.slug, user: user, name: name, socket: socket })
              }}
            >
              <Text style={[styles.textBold, styles.btnFooter]}>Cập nhật</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true)
              }}
            >
              <Text style={[styles.textBold, styles.btnFooter]}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ReasonCancelOrder
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setReason={setReason}
          reason={reason}
          cancelOrder={() => {
            axios({
              method: 'get',
              url: '/chef/deleteOrder',
              params: {
                table: route.params.slug,
                user: user,
                reason: reason
              }
            })
              .then(response => {
                if (response.data === "ok") {
                  socket.emit("sendNotificationWaiterUpdate", {
                    senderName: name,
                    table: route.params.nameTable,
                    act: 2
                  })
                  navigation.navigate('HomeWaiter')
                }
                else alert("Không thể xóa hóa đơn")
              })
              .catch(error => {
                console.log(error)
              })
          }}
        />
      </>

    );
  }
}



export default WaiterDetailOrder;
