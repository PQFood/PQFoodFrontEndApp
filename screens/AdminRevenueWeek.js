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
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import LoadingComponent from '../components/Loading';

function AdminRevenueWeek(props) {

  const { navigation, route } = props;
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState(moment(date).format("DD-MM-YYYY"))

  const [show, setShow] = useState(false);
  const [arrTotal, setArrTotal] = useState(null)
  const [totalWeek, setTotalWeek] = useState(0)
  const [arrDay, setArrDay] = useState(null)
  const [loading, setLoading] = useState(true)

  const getRevenueWeek = (selectedDate) => {
    axios({
      method: 'get',
      url: '/admin/weekRevenue',
      params: {
        timeRevenue: selectedDate
      }
    })
      .then(response => {
        setArrTotal(response.data.arrTotal)
        setArrDay(response.data.arrDay)
        setTotalWeek(response.data.totalWeek)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    setDate(new Date())
    getRevenueWeek(date)
  }, [])

  const onChange = (event, selectedDate) => {
    if (event.type === "set") {
      setShow(false);
      setDate(selectedDate);
      setText(moment(selectedDate).format("DD-MM-YYYY"))
      getRevenueWeek(selectedDate)
    }
    else {
      setShow(false);
    }
  };

  if (loading) {
    return (
      <LoadingComponent />
    )
  }
  else {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>Biểu đồ thống kê doanh thu tuần</Text>
        <LineChart
          data={{
            labels: arrDay,
            datasets: [
              {
                data: arrTotal
              }
            ]
          }}
          width={windowWidth * 0.95} // from react-native
          height={windowHeight * 0.45}
          // yAxisLabel="$"
          yAxisSuffix="đ"

          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            // backgroundColor: "#3399ff",
            backgroundGradientFrom: "#6699ff",
            backgroundGradientTo: "#ff944d",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 8,
          }}

        />

        < View >
          <CurrencyFormat
            value={totalWeek}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' đ'}
            renderText={value => <Text style={[{
              fontWeight: "bold", color: "black",
              fontSize: 16,
              textAlign: "center",
              marginVertical: 10
            }]}>Doanh thu tuần: {value}</Text>}
          />
          <TouchableOpacity
            onPress={() => {
              setShow(true)
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
          <Text style={{ fontSize: 15, marginHorizontal: windowWidth * 0.3 }}>{text}</Text>
        </View >

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            onChange={onChange}
          />
        )}

      </View >
    );

  }

}

export default AdminRevenueWeek;
