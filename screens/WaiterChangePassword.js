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

function WaiterChangePassword(props) {


    const { navigation } = props;
    const isFocused = useIsFocused()
    const [pass1, SetPass1] = useState(true)
    const [pass2, SetPass2] = useState(true)
    const [pass3, SetPass3] = useState(true)


    useEffect(() => {
        SetPass1(true)
        SetPass2(true)
        SetPass3(true)
    }, [isFocused])

    const ChangePasswordSchema = Yup.object().shape({
        passOld: Yup.string()
            .required('Vui lòng nhập vào mật khẩu cũ!'),
        passNew: Yup.string()
            .required('Vui lòng nhập vào mật khẩu mới!')
            .min(6, 'Mật khẩu quá ngắn!')
            .max(14, 'Mật khẩu quá dài!')
    });

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{ passOld: '', passNew: '', passReNew: '' }}
                validationSchema={ChangePasswordSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    alert("án")
                }}
            //     axios({
            //         method: 'post',
            //         url: '/login',
            //         data: {
            //             user: values.user,
            //             password: values.password
            //         }
            //     })
            //         .then(response => {
            //            
            //         })
            //         .catch(error => {
            //             console.log(error)
            //         })
            //         resetForm({values: {
            //             user: values.user,
            //             password: ""
            //         }})
            // }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <SafeAreaView style={styles.container}>
                        <StatusBar style="light" />
                        <View style={styles.form}>


                            <View style={{ position: "relative" }}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Mật khẩu cũ"
                                    secureTextEntry={pass1}
                                    onChangeText={handleChange('passOld')}
                                    onBlur={handleBlur('passOld')}
                                    value={values.passOld}
                                />
                                {errors.passOld && touched.passOld ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.passOld}</Text>
                                ) : null}
                                <TouchableOpacity
                                    style={styles.iconShowHidden}
                                    onPress={() => {
                                        SetPass1(!pass1)
                                    }}
                                >
                                    {pass1 ? (<Entypo name="eye" size={28} color="black" />) : (<Entypo name="eye-with-line" size={28} color="black" />)}

                                </TouchableOpacity>

                            </View>
                            <View style={{ position: "relative" }}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Mật khẩu mới"
                                    secureTextEntry={pass2}
                                    onChangeText={handleChange('passNew')}
                                    onBlur={handleBlur('passNew')}
                                    value={values.passNew}
                                />
                                {errors.passNew && touched.passNew ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.passNew}</Text>
                                ) : null}
                                <TouchableOpacity
                                    style={styles.iconShowHidden}
                                    onPress={() => {
                                        SetPass2(!pass2)
                                    }}
                                >
                                    {pass2 ? (<Entypo name="eye" size={28} color="black" />) : (<Entypo name="eye-with-line" size={28} color="black" />)}

                                </TouchableOpacity>

                            </View>
                            <View style={{ position: "relative" }}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Nhập lại mật khẩu mới"
                                    secureTextEntry={pass3}
                                    onChangeText={handleChange('passReNew')}
                                    onBlur={handleBlur('passReNew')}
                                    value={values.passReNew}
                                />
                                {errors.passReNew && touched.passReNew ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.passReNew}</Text>
                                ) : null}
                                <TouchableOpacity
                                    style={styles.iconShowHidden}
                                    onPress={() => {
                                        SetPass3(!pass3)
                                    }}
                                >
                                    {pass3 ? (<Entypo name="eye" size={28} color="black" />) : (<Entypo name="eye-with-line" size={28} color="black" />)}

                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity
                                style={styles.buttonLogin}
                                onPress={handleSubmit}
                            >
                                <Text style={{ ...TEXT }}>Xác nhận</Text>
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
        backgroundColor: "#e6ffff",
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
        left: windowWidth * 0.18,
        zIndex: 100,
    },
    iconUser: {
        position: "absolute",
        top: 20,
        left: windowWidth * 0.18,
        zIndex: 100,
    },
    iconShowHidden: {
        position: "absolute",
        top: 20,
        left: windowWidth * 0.74,
        zIndex: 100,
    }
})

export default WaiterChangePassword;