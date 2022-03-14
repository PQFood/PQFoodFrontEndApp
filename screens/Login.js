import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, RefreshControl } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Formik } from 'formik';


function Login() {

    const [refreshPage, setRefreshPage] = useState("");

    return (
        <Formik
            initialValues={{ user: "", password: "" }}
            onSubmit={values => {
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
                                    onPress: () => {
                                        window.location.reload();
                                }
                                }]
                            )
            }
                        else {
                            alert('thành công')
            }
                    })
                    .catch (error => {
    console.log(error)
})
            }}
        >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.content}>
                <Text style={styles.inHi}>Đăng nhập</Text>

            </View>

            <View style={styles.form}>
                <FontAwesome5 name="lock" size={24} color="black" style={styles.iconLock} />
                <FontAwesome5 name="user-alt" size={24} color="black" style={styles.iconUser} />
                <TextInput
                    style={styles.inputText}
                    placeholder="Tên đăng nhập"
                    autoFocus={true}
                    onChangeText={handleChange('user')}
                    onBlur={handleBlur('user')}
                    value={values.user}
                />

                <TextInput
                    style={styles.inputText}
                    placeholder="Mật khẩu"
                    // keyboardType="numeric"
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                />

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
        top: 90,
        left: 70,
        zIndex: 100,
    },
    iconUser: {
        position: "absolute",
        top: 20,
        left: 70,
        zIndex: 100,
    }
})

export default Login;