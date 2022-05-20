import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert, RefreshControl } from 'react-native';
import moment from 'moment';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../components/styles';

function AdminRevenueDay(props) {

  const { navigation, route } = props;
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState(moment(date).format("DD-MM-YYYY"))

  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0)

  const onChange = (event, selectedDate) => {
    if (event.type === "set") {
      setShow(false);
      setDate(selectedDate);
      setText(moment(selectedDate).format("DD-MM-YYYY"))
      axios({
        method: 'get',
        url: '/admin/dayRevenue',
        params: {
          dayRevenue: selectedDate
        }
      })
        .then(response => {
          setTotal(response.data)
          // console.log(selectedDate)
          // console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
    else {
      setShow(false);
    }
  };


  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <View>
        <View style={{ flexDirection: "row", marginVertical: 10, marginHorizontal: windowWidth*0.1, justifyContent: "space-between" }}>
          <Text style={{ fontSize: 15, }}>{text}</Text>
          <CurrencyFormat
            value={total}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' đ'}
            renderText={value => <Text style={[{
              fontWeight: "bold", color: "black",
              fontSize: 16,
            }]}>{value}</Text>}
          />
        </View>
        <View style={[{ flexDirection: "row" }]}>
          <TouchableOpacity
            onPress={() => {
              setShow(true);
            }}
            style={{
              backgroundColor: "#ffcc00",
              paddingHorizontal: windowWidth * 0.3,
              paddingVertical: 10,
              borderRadius: 10,
              marginRight: 10
            }}
          >
            <Text
              style={{ fontSize: 16 }}
            >
              Chọn ngày
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              backgroundColor: "#ffcc00",
              paddingHorizontal: windowWidth * 0.1,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              axios({
                method: 'get',
                url: '/admin/dayRevenue',
                params: {
                  dayRevenue: date
                }
              })
                .then(response => {
                  setTotal(response.data)
                })
                .catch(error => {
                  console.log(error)
                })
            }}
          >
            <Text>
              Xem
            </Text>
          </TouchableOpacity> */}
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
}

export default AdminRevenueDay;
