import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';

import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'

function Login(props) {


    const { navigation } = props;
    const isFocused = useIsFocused()
    const [pass, SetPass] = useState(true)
    const [userState, setUserState] = useState({
        user: "",
        password: ""
    })
    useEffect(() => {
        SetPass(true)
    }, [isFocused])
    const LoginSchema = Yup.object().shape({
        user: Yup.string()
            .required('Vui lòng nhập vào tên đăng nhập!'),
        password: Yup.string()
            .required('Vui lòng nhập vào mật khẩu!'),
    });

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('user', value)
        } catch (e) {
            console.log(e)
        }
    }
    const storeName = async (value) => {
        try {
            await AsyncStorage.setItem('name', value)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>

            <Formik
                enableReinitialize={true}
                initialValues={userState}
                validationSchema={LoginSchema}
                onSubmit={(values,{resetForm}) => {
                    axios({
                        method: 'post',
                        url: '/login',
                        data: {
                            user: values.user,
                            password: values.password
                        }
                    })
                        .then(response => {
                            if (response.data === "Thất bại") {
                                Alert.alert(
                                    'Thông báo',
                                    'Đăng nhập thất bại! Vui lòng đăng nhập lại!',
                                    [{
                                        text: 'Ok',
                                    }]
                                )
                            }
                            else {
                                if (response.data.position === "Chủ quán") {
                                    storeData(response.data.userName)
                                    navigation.navigate('HomeAdmin', { data: response.data })
                                }
                                else if (response.data.position === "Phục vụ") {
                                    storeData(response.data.userName)
                                    storeName(response.data.name)
                                    navigation.navigate('HomeWaiter', { data: response.data })
                                }
                                else if (response.data.position === "Shipper") {
                                    storeData(response.data.userName)
                                    storeName(response.data.name)
                                    navigation.navigate('HomeShipper', { data: response.data })
                                }
                                else {
                                    storeData(response.data.userName)
                                    storeName(response.data.name)
                                    navigation.navigate('HomeChef', { data: response.data })
                                }
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        resetForm({values: {
                            user: values.user,
                            password: ""
                        }})
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <SafeAreaView style={styles.container}>
                        <StatusBar style="light" />
                        <View style={styles.content}>
                            <Text style={styles.inHi}>Đăng nhập</Text>

                        </View>

                        <View style={styles.form}>

                            <View style={{ position: "relative" }}>
                                <FontAwesome5 name="user-alt" size={24} color="black" style={styles.iconUser} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Tên đăng nhập"
                                    autoFocus={true}
                                    onChangeText={handleChange('user')}
                                    onBlur={handleBlur('user')}
                                    value={values.user}
                                />
                                {errors.user && touched.user ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.user}</Text>
                                ) : null}
                            </View>
                            <View style={{ position: "relative" }}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Mật khẩu"
                                    // keyboardType="numeric"
                                    secureTextEntry={pass}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                {errors.password && touched.password ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.password}</Text>
                                ) : null}
                                <FontAwesome5 name="lock" size={24} color="black" style={styles.iconLock} />
                                <TouchableOpacity
                                    style={styles.iconShowHidden}
                                    onPress={() => {
                                        SetPass(!pass)
                                    }}
                                >
                                    {pass ? (<Entypo name="eye" size={28} color="black" />) : (<Entypo name="eye-with-line" size={28} color="black" />)}

                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity
                                style={styles.buttonLogin}
                                onPress={handleSubmit}
                            >
                                <Text style={{ ...TEXT }}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                )}

            </Formik >

        </>


    )
}

const TEXT = {
    color: "#fff",
    textAlign: "center"
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ff9933",
        justifyContent: "center"
    },
    content: {

    },
    inHi: {
        ...TEXT,
        fontSize: 20,
        lineHeight: 50,
        fontWeight: "bold"
    },
    inContent: {
        ...TEXT,
        fontSize: 16,
        lineHeight: 30,
    },
    inputText: {
        borderRadius: 30,
        backgroundColor: "white",
        height: 50,
        marginHorizontal: 50,
        marginVertical: 10,
        textAlign: "center"
    },
    buttonLogin: {
        backgroundColor: "#999999",
        height: 50,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginHorizontal: 50
    },
    action: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        marginHorizontal: 40
    },
    iconLock: {
        position: "absolute",
        top: 20,
        left: windowWidth*0.18,
        zIndex: 100,
    },
    iconUser: {
        position: "absolute",
        top: 20,
        left: windowWidth*0.18,
        zIndex: 100,
    },
    iconShowHidden: {
        position: "absolute",
        top: 20,
        left: windowWidth*0.74,
        zIndex: 100,
    }
})

export default Login;