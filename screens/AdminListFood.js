import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, BackHandler, Alert } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native'
import showToast from '../components/ShowToast';
import LoadingComponent from '../components/Loading';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import styles from '../components/stylesShipper';
import AdminUseGetOrder from '../hooks/AdminUseGetOrder';
import RenderFoodAdmin from '../components/RenderFoodAdmin';

function AdminListFood(props) {

  const { navigation, route } = props;
  const toast = useToast();
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)
  

  useEffect(() => {
    AdminUseGetOrder({ setLoading, setOrder, link: "listFood" })
  }, [isFocused])



  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    AdminUseGetOrder({ setLoading, setOrder, link: "listFood" })
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
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#ffcc66", "green", "blue"]}
              />
            }
            data={order}
            renderItem={({ item }) => {
              return (
                <RenderFoodAdmin
                  item={item}
                  NavigationEditFood = {()=>{
                    // alert(item.slug)
                    navigation.navigate("AdminEditFoodMenu",{slug:item.slug} )
                  }}
                  btnCancel={() => {
                    Alert.alert(
                      "Cảnh báo",
                      "Bạn có chắc muốn xóa thức ăn này?",
                      [
                        {
                          text: "Bỏ qua",
                        },
                        {
                          text: "Xác nhận", onPress: () => {
                            axios({
                              method: 'post',
                              url: '/admin/deleteFood',
                              data: {
                                slug: item.slug
                              }
                            })
                              .then(response => {
                                if (response.data === "ok") {
                                  showToast("Xóa thành công")
                                  AdminUseGetOrder({ setLoading, setOrder, link: "listFood" })
                                }
                                else {
                                  alert("Xóa thất bại")
                                }
                              })
                              .catch(error => {
                                console.log(error)
                              })

                          }
                        }
                      ]
                    );
                  }}
                />
              )
            }}
            keyExtractor={(item) => item._id}
          />
        </View>
      </>
    );
  }
}

export default AdminListFood;