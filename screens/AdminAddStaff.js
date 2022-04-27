import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, ScrollView } from 'react-native';

import axios from 'axios';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'
import showToast from '../components/ShowToast';
import { useToast } from "react-native-toast-notifications";
import styles from '../components/styles';

function AdminAddStaff(props) {


    const { navigation } = props;
    const isFocused = useIsFocused()
    const toast = useToast();


    const CheckFormAddStaff = Yup.object().shape({
        password: Yup.string()
            .required('Vui lòng nhập vào mật khẩu mới!')
            .min(6, 'Mật khẩu quá ngắn!')
            .max(14, 'Mật khẩu quá dài!')
            .matches(/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,15}$/, "Mật khẩu từ 6 - 15 kí tự bao gồm chữ và số!"),
        rePassword: Yup.string()
            .required('Vui lòng nhập lại mật khẩu mới!')
            .oneOf([Yup.ref('password')], 'Mật khẩu nhập lại không đúng!')
            .matches(/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,15}$/, "Mật khẩu từ 6 - 15 kí tự bao gồm chữ và số!"),
    });

    return (
        <ScrollView>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: '',
                    phoneNumber: '',
                    address: '',
                    position: '',
                    userName: '',
                    password: '',
                    rePassword: ''
                }}
                validationSchema={CheckFormAddStaff}
                onSubmit={(values) => {
                    console.log(values)
                    alert("smksm")
                }}

            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <SafeAreaView style={styles.container}>
                        <StatusBar style="light" />
                        <View style={styles.form}>

                            <TextInput
                                style={styles.inputText}
                                placeholder="Họ và tên"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            {errors.name && touched.name ? (
                                <Text style={{ color: 'red', textAlign: "center" }}>{errors.name}</Text>
                            ) : null}

                            <TextInput
                                style={styles.inputText}
                                placeholder="Số điện thoại"
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}
                                value={values.phoneNumber}
                            />
                            {errors.phoneNumber && touched.phoneNumber ? (
                                <Text style={{ color: 'red', textAlign: "center" }}>{errors.phoneNumber}</Text>
                            ) : null}

                            <TextInput
                                style={styles.inputText}
                                placeholder="Địa chỉ"
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                            />
                            {errors.address && touched.address ? (
                                <Text style={{ color: 'red', textAlign: "center" }}>{errors.address}</Text>
                            ) : null}

                           

                            <TextInput
                                style={styles.inputText}
                                placeholder="Tên đăng nhập"
                                onChangeText={handleChange('userName')}
                                onBlur={handleBlur('userName')}
                                value={values.userName}
                            />
                            {errors.userName && touched.userName ? (
                                <Text style={{ color: 'red', textAlign: "center" }}>{errors.userName}</Text>
                            ) : null}

                            <TextInput
                                style={styles.inputText}
                                placeholder="Mật khẩu mới"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            {errors.password && touched.password ? (
                                <Text style={{ color: 'red', textAlign: "center" }}>{errors.password}</Text>
                            ) : null}

                            <TextInput
                                style={styles.inputText}
                                placeholder="Nhập lại mật khẩu mới"
                                onChangeText={handleChange('rePassword')}
                                onBlur={handleBlur('rePassword')}
                                value={values.rePassword}
                            />
                            {errors.rePassword && touched.rePassword ? (
                                <Text style={{ color: 'red', textAlign: "center" }}>{errors.rePassword}</Text>
                            ) : null}

                            <TouchableOpacity
                                onPress={handleSubmit}
                            >
                                <Text style={styles.btnConfirmForm}>Thêm</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                )}

            </Formik >

        </ScrollView>


    )
}



export default AdminAddStaff;