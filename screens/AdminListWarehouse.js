import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, RefreshControl } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native'
import showToast from '../components/ShowToast';
import axios from 'axios';
import LoadingComponent from '../components/Loading';
import { FlatList } from 'react-native-gesture-handler';
import AdminRenderWarehouse from '../components/AdminRenderWarehouse';



function AdminListWarehouse(props) {

  const { navigation, route } = props;
  const [warehouse, setWarehouse] = useState(null)
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(true)

  const getWarehouse = () => {
    axios({
      method: 'get',
      url: '/chef/getWarehouse',
    })
      .then(response => {
        setWarehouse(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getWarehouse()
  }, [isFocused])

  const RenderItem = ({ item }) => {
    return (
      <AdminRenderWarehouse
        item={item}
        updateWarehouse={() => {
          navigation.navigate('AdminEditWarehouse', { slug: item.slug })
        }}
        deleteWarehouse={() => {
          Alert.alert(
            "Cảnh báo",
            "Bạn có chắc muốn xóa sản phẩm này không?",
            [
              {
                text: "Bỏ qua",
              },
              {
                text: "Xác nhận", onPress: () => {
                  axios({
                    method: 'post',
                    url: '/admin/deleteWarehouse',
                    data: {
                      slug: item.slug,
                    }
                  })
                    .then(response => {
                      if (response.data === "ok") {
                        showToast("Xóa sản phẩm thành công")
                        getWarehouse()
                      }
                      else {
                        showToast("Xóa sản phẩm thất bại")
                        getWarehouse()
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
  }

  if (loading) {
    return (
      <LoadingComponent />
    )
  }
  else {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <FlatList
          data={warehouse}
          renderItem={RenderItem}
          keyExtractor={(item) => item.slug}
        />
      </View>
    );
  }
}

export default AdminListWarehouse;
