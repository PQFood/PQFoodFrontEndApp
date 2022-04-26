import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import RenderItemOrder from '../components/RenderItemOrder';
import RenderStaff from '../components/RenderStaff';
import styles from '../components/styles';
import LoadingComponent from '../components/Loading';
import { useIsFocused } from '@react-navigation/native'
import RenderInfoCustomer from '../components/RenderInfoCustomer';


function AdminDetailHistotyBookShip(props) {

  const { navigation, route } = props;
  const [bookShip, setBookShip] = useState(null)
  const [loading, setLoading] = useState(true)
  const isFocused = useIsFocused()

  const getBookShip = () => {
    axios({
      method: 'get',
      url: '/admin/getDetailShipCurrent',
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
                <RenderInfoCustomer bookShip={bookShip} />
                <FlatList
                  data={bookShip.staff}
                  ListHeaderComponent={<Text style={styles.ul}>Nhân viên xử lý</Text>}
                  renderItem={RenderStaff}
                  keyExtractor={(item) => item.id}
                />
                {bookShip.state === "Đã hủy" ? (
                  <Text style={{marginTop: 5, fontSize: 15}}>Lý do hủy: {bookShip.reason}</Text>
                ) : null}
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
          <View style={{ alignItems: "center", backgroundColor: "#ccffcc" }}>
            {bookShip.state === "Đã hủy" ? (
              <Text style={[styles.textBold, { lineHeight: 40, color: "#ff0000" }]}>{bookShip.state}</Text>

            ) : (
              <Text style={[styles.textBold, { lineHeight: 40, color: "#00cc00" }]}>{bookShip.state}</Text>
            )}
          </View>
        </View>

      </>

    );
  }
}

export default AdminDetailHistotyBookShip;
