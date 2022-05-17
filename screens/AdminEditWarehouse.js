import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useIsFocused } from '@react-navigation/native'
import showToast from '../components/ShowToast';
import { useToast } from "react-native-toast-notifications";
import styles from '../components/styles';
import LoadingComponent from '../components/Loading';


function AdminEditWarehouse(props) {

    const { navigation, route } = props;
    const isFocused = useIsFocused()
    const toast = useToast();
    const slug = route.params.slug
    const [warehouse, setWarehouse] = useState(null)
    const [loading, setLoading] = useState(true)

    const getOneWarehouse = () => {
        axios({
            method: 'get',
            url: '/chef/getOneWarehouse',
            params: {
                slug: slug
            }
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
        getOneWarehouse()
    }, [isFocused])


    const CheckFormAddDinnerTable = Yup.object().shape({
        name: Yup
            .string()
            .required('Vui lòng nhập tên sản phẩm!'),
        unit: Yup
            .string()
            .required('Vui lòng nhập đơn vị tính!'),
        quantity: Yup
            .number()
            .typeError("Vui lòng nhập vào số!")
            .required('Vui lòng nhập số lượng!')
            .min(0, "Lỗi! Nhỏ hơn 0 rồi!"),
        providerName: Yup
            .string()
            .required('Vui lòng nhập tên nhà cung cấp!'),
        providerPhoneNumber: Yup
            .string()
            .max(11, 'Số điện thoại quá dài!')
            .required('Vui lòng nhập số điện thoại!')
            .matches(/^(0)[1-9][0-9]{8,9}$/, "Số điện thoại không hợp lệ!"),
        providerAddress: Yup
            .string()
            .required('Vui lòng nhập địa chỉ!'),

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
                        name: warehouse.name,
                        quantity: warehouse.quantity.$numberDecimal,
                        unit: warehouse.unit,
                        providerName: warehouse.providerName,
                        providerPhoneNumber: warehouse.providerPhoneNumber,
                        providerAddress: warehouse.providerAddress
                    }}
                    validationSchema={CheckFormAddDinnerTable}
                    // validateOnChange={false}
                    onSubmit={(values, { resetForm }) => {
                        axios({
                            method: 'post',
                            url: '/admin/editWarehouse',
                            data: {
                                name: values.name,
                                quantity: values.quantity,
                                unit: values.unit,
                                providerName: values.providerName,
                                providerPhoneNumber: values.providerPhoneNumber,
                                providerAddress: values.providerAddress,
                                slug: slug
                            }
                        })
                            .then(response => {
                                if (response.data === "ok") showToast("Cập nhật sản phẩm thành công")
                                else showToast("Cập nhật sản phẩm thất bại")
                                resetForm()
                                navigation.navigate('AdminListWarehouse')
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
                                    placeholder="Tên sản phẩm"
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                                {errors.name && touched.name ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.name}</Text>
                                ) : null}


                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Đơn vị tính"
                                    onChangeText={handleChange('unit')}
                                    onBlur={handleBlur('unit')}
                                    value={values.unit}
                                />
                                {errors.unit && touched.unit ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.unit}</Text>
                                ) : null}

                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Số lượng"
                                    onChangeText={handleChange('quantity')}
                                    onBlur={handleBlur('quantity')}
                                    value={values.quantity}
                                />
                                {errors.quantity && touched.quantity ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.quantity}</Text>
                                ) : null}

                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Tên nhà cung cấp"
                                    onChangeText={handleChange('providerName')}
                                    onBlur={handleBlur('providerName')}
                                    value={values.providerName}
                                />
                                {errors.providerName && touched.providerName ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.providerName}</Text>
                                ) : null}

                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Số điện thoại nhà cung cấp"
                                    onChangeText={handleChange('providerPhoneNumber')}
                                    onBlur={handleBlur('providerPhoneNumber')}
                                    value={values.providerPhoneNumber}
                                />
                                {errors.providerPhoneNumber && touched.providerPhoneNumber ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.providerPhoneNumber}</Text>
                                ) : null}

                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Địa chỉ nhà cung cấp"
                                    onChangeText={handleChange('providerAddress')}
                                    onBlur={handleBlur('providerAddress')}
                                    value={values.providerAddress}
                                />
                                {errors.providerAddress && touched.providerAddress ? (
                                    <Text style={{ color: 'red', textAlign: "center" }}>{errors.providerAddress}</Text>
                                ) : null}


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



export default AdminEditWarehouse;