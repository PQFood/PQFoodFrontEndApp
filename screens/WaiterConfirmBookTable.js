import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import RenderItemOrder from '../components/RenderItemOrder';
import RenderStaff from '../components/RenderStaff';
import { LogBox } from 'react-native';
import styles from '../components/styles';

function WaiterConfirmBookTable(props) {

  const { navigation, route } = props;
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [order, SetOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  useEffect(() => {
    setUser(route.params.user);
    setName(route.params.name);
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
              onPress={() => {
                axios({
                  method: 'get',
                  url: '/waiter/completeOrder',
                  params: {
                    table: route.params.slug,
                    user: user
                  }
                })
                  .then(response => {
                    if (response.data === "ok") {
                      socket.emit("sendNotificationWaiterCompleteOrder", {
                        senderName: name,
                        table: route.params.nameTable,
                      })
                      navigation.navigate('HomeWaiter')
                    }
                    else alert("Không thể hoàn thành hóa đơn")
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }}
            >
              <Text style={[styles.textBold, { lineHeight: 40 }]}>Hoàn Thành</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>

    );
  }
}

export default WaiterConfirmBookTable;