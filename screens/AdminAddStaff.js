import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Picker, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, ScrollView } from 'react-native';

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
    const [selectedValue, setSelectedValue] = useState('Phục vụ')
    const [pass1, setPass1] = useState(true)
    const [pass2, setPass2] = useState(true)
    const toast = useToast();

    useEffect(() => {
        setPass1(true)
        setPass2(true)
        setSelectedValue('Phục vụ')
    }, [isFocused])


    const CheckFormAddStaff = Yup.object().shape({
        password: Yup.string()
            .required('Vui lòng nhập vào mật khẩu mới!')
            .min(6, 'Mật khẩu quá ngắn!')
            .max(14, 'Mật khẩu quá dài!')
            .matches(/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,15}$/, "Mật khẩu từ 6 - 15 kí tự bao gồm chữ và số!"),
        rePassword: Yup.string()
            .required('Vui lòng nhập lại mật khẩu mới!')
            .oneOf([Yup.ref('password')], 'Mật khẩu nhập lại không đúng!')
    });

    return (
        <ScrollView>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: '',
                    phoneNumber: '',
                    address: '',
                    position: selectedValue,
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

                            <View style={styles.pickerPositon}>
                                <Picker
                                    selectedValue={selectedValue}
                                    style={{width: 150,}}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                >
                                    <Picker.Item label="Phục vụ" value="Phục vụ" />
                                    <Picker.Item label="Đầu bếp" value="Đầu bếp" />
                                    <Picker.Item label="Shipper" value="Shipper" />
                                </Picker>
                            </View>


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

                            <View style={{ position: "relative" }}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Mật khẩu"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={pass1}
                                />
                                {errors.password && touched.password ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.password}</Text>
                                ) : null}

                                <TouchableOpacity
                                    style={styles.iconShowHidden}
                                    onPress={() => {
                                        setPass1(!pass1)
                                    }}
                                >
                                    {pass1 ? (<Entypo name="eye" size={28} color="black" />) : (<Entypo name="eye-with-line" size={28} color="black" />)}

                                </TouchableOpacity>
                            </View>

                            <View>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Nhập lại mật khẩu mới"
                                    onChangeText={handleChange('rePassword')}
                                    onBlur={handleBlur('rePassword')}
                                    value={values.rePassword}
                                    secureTextEntry={pass2}
                                />
                                {errors.rePassword && touched.rePassword ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.rePassword}</Text>
                                ) : null}
                                <TouchableOpacity
                                    style={styles.iconShowHidden}
                                    onPress={() => {
                                        setPass2(!pass2)
                                    }}
                                >
                                    {pass2 ? (<Entypo name="eye" size={28} color="black" />) : (<Entypo name="eye-with-line" size={28} color="black" />)}

                                </TouchableOpacity>
                            </View>


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