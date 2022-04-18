import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/styles';
import LoadingComponent from '../components/Loading';
import axios from 'axios';
import RenderHistoryBookTable from '../components/RenderHistoryBookTable';
import showToast from '../components/ShowToast';
import { useIsFocused } from '@react-navigation/native'
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { AntDesign } from '@expo/vector-icons';


function WaiterHistoryBookTable(props) {

  const { navigation, route } = props;
  const [bookTable, setBookTable] = useState(null)
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [full, setFull] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused()

  const getBookTableConfirm = () => {
    axios({
      method: 'get',
      url: '/waiter/getBookTable',
      params: {
        state: "all",
        quantity: quantity
      }
    })
      .then(response => {
        setBookTable(response.data.bookTable)
        setFull(response.data.full)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getBookTableConfirm()
  }, [quantity, isFocused])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    getBookTableConfirm();
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
  };

  const RenderItem = ({ item }) => {
    return (
      <RenderBookTable
        item={item}
        nameBtn="Hoàn thành"
      />
    )
  }


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
            data={bookTable}
            renderItem={RenderHistoryBookTable}
            keyExtractor={(item) => item._id}
            style={{ marginTop: 10 }}
            ListFooterComponent={
              <>
                {(quantity < 5 && !full) ? (
                  <TouchableOpacity
                    onPress={() => {
                      setQuantity(quantity + 1)
                    }}
                    style={{
                      backgroundColor: "#66ccff",
                      alignItems: "center",
                      marginHorizontal: windowWidth * 0.3,
                      paddingVertical: windowHeight * 0.01,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}><AntDesign name="downcircle" size={16} color="black" />   Xem thêm</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setQuantity(1)
                    }}
                    style={{
                      backgroundColor: "#ffcc66",
                      alignItems: "center",
                      marginHorizontal: windowWidth * 0.3,
                      paddingVertical: windowHeight * 0.01,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}><AntDesign name="upcircle" size={16} color="black" />  Ẩn bớt</Text>
                  </TouchableOpacity>
                )}

              </>
            }
          />

        </View>
      </>
    );
  }
}

export default WaiterHistoryBookTable;
