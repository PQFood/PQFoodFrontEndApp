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
import showToast from '../components/ShowToast';
import { useToast } from "react-native-toast-notifications";
import styles from '../components/styles';

function AdminAddStaff(props) {


    const { navigation } = props;
    const isFocused = useIsFocused()
    const [user, setUser] = useState('')
    const toast = useToast();
    const getUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            await setUser(value)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getUser()
    }, [])


    const ChangePasswordSchema = Yup.object().shape({
        passOld: Yup.string()
            .required('Vui lòng nhập vào mật khẩu cũ!')
            .matches(/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,15}$/, "Mật khẩu từ 6 - 15 kí tự bao gồm chữ và số!"),
        passNew: Yup.string()
            .required('Vui lòng nhập vào mật khẩu mới!')
            .min(6, 'Mật khẩu quá ngắn!')
            .max(14, 'Mật khẩu quá dài!')
            .matches(/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,15}$/, "Mật khẩu từ 6 - 15 kí tự bao gồm chữ và số!"),
        passReNew: Yup.string()
            .required('Vui lòng nhập lại mật khẩu mới!')
            .oneOf([Yup.ref('passNew')], 'Mật khẩu nhập lại không đúng!')
            .matches(/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,15}$/, "Mật khẩu từ 6 - 15 kí tự bao gồm chữ và số!"),
    });

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{ passOld: '', passNew: '', passReNew: '' }}
                validationSchema={ChangePasswordSchema}
                onSubmit={(values) => {
                    alert("abs")
                }}

            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <SafeAreaView style={styles.container}>
                        <StatusBar style="light" />
                        <View style={styles.form}>
                            <View style={{ position: "relative" }}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Mật khẩu cũ"
                                    onChangeText={handleChange('passOld')}
                                    onBlur={handleBlur('passOld')}
                                    value={values.passOld}
                                />
                                {errors.passOld && touched.passOld ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.passOld}</Text>
                                ) : null}
                                

                            </View>
                            <View style={{ position: "relative" }}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Mật khẩu mới"
                                    onChangeText={handleChange('passNew')}
                                    onBlur={handleBlur('passNew')}
                                    value={values.passNew}
                                />
                                {errors.passNew && touched.passNew ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.passNew}</Text>
                                ) : null}
                                

                            </View>
                            <View style={{ position: "relative" }}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Nhập lại mật khẩu mới"
                                    onChangeText={handleChange('passReNew')}
                                    onBlur={handleBlur('passReNew')}
                                    value={values.passReNew}
                                />
                                {errors.passReNew && touched.passReNew ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.passReNew}</Text>
                                ) : null}
                            </View>
                            <TouchableOpacity
                                style={styles.buttonLogin}
                                onPress={handleSubmit}
                            >
                                <Text >Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                )}

            </Formik >

        </>


    )
}



export default AdminAddStaff;