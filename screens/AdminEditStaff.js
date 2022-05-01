import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'
import showToast from '../components/ShowToast';
import { useToast } from "react-native-toast-notifications";
import styles from '../components/styles';
import LoadingComponent from '../components/Loading';
import AdminUseGetInfoStaff from '../hooks/AdminUseGetInfoStaff';


function AdminEditStaff(props) {

    const { navigation, route } = props;
    const isFocused = useIsFocused()
    const [pass1, setPass1] = useState(true)
    const [pass2, setPass2] = useState(true)
    const [loading, setLoading] = useState(true)
    const [staff, setStaff] = useState(null)
    const toast = useToast();
    const userNameStaff = route.params.userName

    useEffect(() => {
        setPass1(true)
        setPass2(true)
        AdminUseGetInfoStaff({ setLoading, setStaff, userNameStaff})
    }, [isFocused])


    const CheckFormAddStaff = Yup.object().shape({
        name: Yup
            .string()
            .required('Vui lòng nhập họ tên nhân viên!'),
        phoneNumber: Yup
            .string()
            .max(11, 'Số điện thoại quá dài!')
            .required('Vui lòng nhập vào số điện thoại!')
            .matches(/^(0)[1-9][0-9]{8,9}$/, "Số điện thoại không hợp lệ!"),
        address: Yup
            .string()
            .required('Vui lòng nhập vào địa chỉ!'),
    });

    if (loading) {
        return (
            <LoadingComponent />
        )
    }
    else {

        return (
            <ScrollView>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: staff.name,
                        phoneNumber: staff.phoneNumber,
                        address: staff.address,
                        position: staff.position,
                    }}
                    validationSchema={CheckFormAddStaff}
                    // validateOnChange={false}
                    onSubmit={(values) => {
                        axios({
                            method: 'post',
                            url: '/admin/editStaff',
                            data: {
                                name: values.name,
                                phoneNumber: values.phoneNumber,
                                address: values.address,
                                position: values.position,
                                userNameStaff: userNameStaff
                            }
                        })
                            .then(response => {
                                if (response.data === "ok") showToast("Cập nhật thông tin nhân viên thành công")
                                else showToast("Cập nhật thông tin nhân viên thất bại")
                                navigation.navigate('AdminListStaff')
                            })
                            .catch(error => {
                                console.log(error)
                            })
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
                                        selectedValue={values.position}
                                        style={{ width: 150, }}
                                        onValueChange={handleChange('position')}
                                    >
                                        <Picker.Item label="Phục vụ" value="Phục vụ" />
                                        <Picker.Item label="Đầu bếp" value="Đầu bếp" />
                                        <Picker.Item label="Shipper" value="Shipper" />
                                    </Picker>
                                </View>

                                <TouchableOpacity
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.btnConfirmForm}>Cập nhật</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    )}
                </Formik >
            </ScrollView>
        )
    }
}


export default AdminEditStaff;