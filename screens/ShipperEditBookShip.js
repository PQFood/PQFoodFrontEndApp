import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, Switch, SafeAreaView, Button } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import { LogBox } from 'react-native';
import showToast from '../components/ShowToast';
import styles from '../components/styles';
import LoadingComponent from '../components/Loading';

function ShipperEditBookShip(props) {

  const { navigation, route } = props;
  const [food, setFood] = useState(null)
  const [drink, setDrink] = useState(null)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [foodCheck, setFoodCheck] = useState(true)
  const [drinkCheck, setDrinkCheck] = useState(true)
  const [foodState, setFoodState] = useState(null)
  const [drinkState, setDrinkState] = useState(null)
  const [note, setNote] = useState('')
  const [nameCustomer, setNameCustomer] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [socket, setSocket] = useState(null)
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  useEffect(() => {
    setUser(route.params.user);
    setName(route.params.name);
    setSocket(route.params.socket);
  }, [])
  const getmenu = () => {
    axios({
      method: 'get',
      url: '/shipper/getBookShipEdit',
      params: {
        orderId: route.params.orderId
      }
    })
      .then(response => {
        setFood(response.data.food)
        setDrink(response.data.drink)
        setFoodState(response.data.foodState)
        setDrinkState(response.data.drinkState)
        setNote(response.data.note)
        setNameCustomer(response.data.name)
        setAddress(response.data.address)
        setPhoneNumber(response.data.phoneNumber)
        setTotal(response.data.total)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(async () => {
    await getmenu()
  }, [])

  const toggleSwitchFood = (item, value, index) => {

    setFoodState(() => {
      var result = foodState
      result[index].value = value
      return result
    })
    if (value) {
      setTotal(() => {
        return total + item.price * foodState[index].quantity
      })
    }
    else {
      setTotal(() => {
        return total - item.price * foodState[index].quantity
      })
    }
    setFoodCheck(!foodCheck)

  }
  const toggleSwitchDrink = (item, value, index) => {

    setDrinkState(() => {
      var result = drinkState
      result[index].value = value
      return result
    })
    if (value) {
      setTotal(() => {
        return total + item.price * drinkState[index].quantity
      })
    }
    else {
      setTotal(() => {
        return total - item.price * drinkState[index].quantity
      })
    }
    setDrinkCheck(!drinkCheck)
  }

  const decreaseFood = (item, index) => {
    if (foodState[index].quantity > 1 && foodState[index].value === true) {
      setFoodState(() => {
        var result = foodState
        result[index].value = true
        result[index].quantity = result[index].quantity - 1
        return result
      })
      setTotal(() => {
        return total - item.price
      })
      setFoodCheck(!foodCheck)
    }
    else {
      showToast("Không thể giảm tiếp!")
    }
  }

  const increaseFood = (item, index) => {
    if (foodState[index].value === false) {
      setFoodState(() => {
        var result = foodState
        result[index].value = true
        result[index].quantity = result[index].quantity + 1
        return result
      })
      setTotal(() => {
        return total + item.price * foodState[index].quantity
      })
      setFoodCheck(!foodCheck)
    }
    else {
      setFoodState(() => {
        var result = foodState
        result[index].quantity = result[index].quantity + 1
        return result
      })
      setTotal(() => {
        return total + item.price
      })
      setFoodCheck(!foodCheck)
    }
  }

  const decreaseDrink = (item, index) => {
    if (drinkState[index].quantity > 1 && drinkState[index].value === true) {
      setDrinkState(() => {
        var result = drinkState
        result[index].value = true
        result[index].quantity = result[index].quantity - 1
        return result
      })
      setTotal(() => {
        return total - item.price
      })
      setFoodCheck(!drinkCheck)
    }
    else {
      showToast("Không thể giảm tiếp!")
    }
  }

  const increaseDrink = (item, index) => {
    if (drinkState[index].value === false) {
      setDrinkState(() => {
        var result = drinkState
        result[index].value = true
        result[index].quantity = result[index].quantity + 1
        return result
      })
      setTotal(() => {
        return total + item.price * drinkState[index].quantity
      })
      setDrinkCheck(!drinkCheck)
    }
    else {
      setDrinkState(() => {
        var result = drinkState
        result[index].quantity = result[index].quantity + 1
        return result
      })
      setTotal(() => {
        return total + item.price
      })
      setDrinkCheck(!drinkCheck)
    }
  }

  const renderItemFood = ({ item, index }) => {
    return (
      <SafeAreaView style={styles.item}>
        <View>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.image
            }}
          />
        </View>
        <View style={styles.infoItem}>
          <View style={styles.groupInfo}>
            <View><Text style={{ fontWeight: "bold" }}>{item.name}</Text></View>
          </View>
          <View style={styles.groupInfo}>
            <View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                ios_backgroundColor="#3e3e3e"
                value={foodState[index].value}
                onValueChange={(value) => { toggleSwitchFood(item, value, index) }}
              />
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
              <TouchableOpacity style={styles.changeQuantity}
                onPress={() => {
                  decreaseFood(item, index)
                }}
              >
                <Text style={styles.textChangeQuantity}>-</Text>
              </TouchableOpacity>
              <View><Text style={{ marginLeft: 10 }}>{foodState[index].quantity}</Text></View>

              <TouchableOpacity style={styles.changeQuantity}
                onPress={() => {
                  increaseFood(item, index)
                }}
              >
                <Text style={styles.textChangeQuantity}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.groupInfo}>
            <View>
              <CurrencyFormat
                value={item.price}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' đ'}
                renderText={value => <Text>{value}</Text>}
              />
            </View>
            <View>
              <CurrencyFormat
                value={item.price * foodState[index].quantity}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' đ'}
                renderText={value => <Text>{value}</Text>}
              />
            </View>
          </View>
        </View>

      </SafeAreaView>
    );
  };

  const renderItemDrink = ({ item, index }) => {
    return (
      <SafeAreaView style={styles.item}>
        <View>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.image
            }}
          />
        </View>
        <View style={styles.infoItem}>
          <View style={styles.groupInfo}>
            <View><Text style={{ fontWeight: "bold" }}>{item.name}</Text></View>
          </View>
          <View style={styles.groupInfo}>
            <View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                ios_backgroundColor="#3e3e3e"
                value={drinkState[index].value}
                onValueChange={(value) => { toggleSwitchDrink(item, value, index) }}
              />
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
              <TouchableOpacity style={styles.changeQuantity}
                onPress={() => {
                  decreaseDrink(item, index)
                }}
              >
                <Text style={styles.textChangeQuantity}>-</Text>
              </TouchableOpacity>
              <View><Text style={{ marginLeft: 10 }}>{drinkState[index].quantity}</Text></View>

              <TouchableOpacity style={styles.changeQuantity}
                onPress={() => {
                  increaseDrink(item, index)
                }}
              >
                <Text style={styles.textChangeQuantity}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.groupInfo}>
            <View>
              <CurrencyFormat
                value={item.price}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' đ'}
                renderText={value => <Text>{value}</Text>}
              />
            </View>
            <View>
              <CurrencyFormat
                value={item.price * drinkState[index].quantity}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' đ'}
                renderText={value => <Text>{value}</Text>}
              />
            </View>
          </View>
        </View>

      </SafeAreaView>
    );
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
            ListFooterComponent={
              <>
                <FlatList
                  data={drink}
                  ListHeaderComponent={<Text style={styles.ul}>Danh Sách Thức Uống</Text>}
                  renderItem={renderItemDrink}
                  keyExtractor={(item) => item.slug}

                />
                <TextInput
                  style={styles.noteStyle}
                  multiline
                  numberOfLines={4}
                  onChangeText={(text) => setNote(text)}
                  value={note}
                  placeholder="Ghi chú"
                />
                <TextInput
                  style={styles.noteStyle}
                  onChangeText={(text) => setNameCustomer(text)}
                  value={nameCustomer}
                  placeholder="Họ và tên"
                />
                <TextInput
                  style={styles.noteStyle}
                  onChangeText={(text) => setPhoneNumber(text)}
                  value={phoneNumber}
                  placeholder="Số điện thoại"
                />
                <TextInput
                  style={styles.noteStyle}
                  multiline
                  numberOfLines={4}
                  onChangeText={(text) => setAddress(text)}
                  value={address}
                  placeholder="Địa chỉ"
                />
              </>
            }
            ListHeaderComponent={
              <Text style={styles.ul}>Danh Sách Thức Ăn</Text>
            }
            data={food}
            renderItem={renderItemFood}
            keyExtractor={(item) => item.slug}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.footer2}>
            <Text style={styles.textBold}>Tổng Tiền: </Text>
            <CurrencyFormat
              value={total}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' đ'}
              renderText={value => <Text style={styles.textBold}>{value}</Text>}
            />
          </View>
          <View>
            <TouchableOpacity style={{ backgroundColor: "#ffcc66", alignItems: "center", height: 40 }}
              onPress={() => {
                if (total > 0) {
                  axios({
                    method: 'post',
                    url: '/shipper/editBookShip',
                    data: {
                      food: foodState,
                      drink: drinkState,
                      total: total,
                      orderId: route.params.orderId,
                      note: note,
                      staff: user,
                      name: nameCustomer,
                      phoneNumber: phoneNumber,
                      address: address,
                    }
                  })
                    .then(response => {
                      if (response.data === "ok") {
                        socket.emit("sendNotificationShipperUpdateBookTable", {
                          senderName: name,
                          orderId: route.params.orderId,
                        })
                        navigation.goBack()
                      }
                      else alert("Cập nhật thất bại!")
                    })
                    .catch(error => {
                      console.log(error)
                    })
                }
                else {
                  alert('Vui lòng chọn ít nhất một món!')
                }

              }}
              disabled={nameCustomer === '' || phoneNumber === '' || address === '' ? true : false}
            >
              <Text style={[styles.textBold, { lineHeight: 40 }]}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}


export default ShipperEditBookShip;
