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
import LoadingComponent from '../components/Loading';

function ChefChangeQuantityWarehouse(props) {

    const { navigation, route } = props;
    const isFocused = useIsFocused()
    const toast = useToast();
    const [warehouse, setWarehouse] = useState(null)
    const [loading, setLoading] = useState(true)

    const ChangeQuantity = Yup.object().shape({
        quantity: Yup
            .number("Vui lòng Nhập vào số!")
            .required('Vui lòng nhập vào số lượng!')
            .min(0, "Nhở hơn")
    });

    const getOneWarehouse = () => {
        axios({
            method: 'get',
            url: '/chef/getOneWarehouse',
            params: {
                slug: route.params.slug
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


    if (loading) {
        return (
            <LoadingComponent />
        )
    }
    else {
        return (
            <>
                <Formik
                    enableReinitialize={true}
                    initialValues={{ quantity: warehouse.quantity.$numberDecimal }}
                    validationSchema={ChangeQuantity}
                    onSubmit={(values) => {
                        axios({
                            method: 'post',
                            url: '/chef/changeQuantityWarehouse',
                            data: {
                                slug: warehouse.slug,
                                quantity: values.quantity
                            }
                        })
                            .then(response => {
                                alert(response.data)
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

                                <View style={{ position: "relative" }}>
                                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>{warehouse.name} ({warehouse.unit})</Text>
                                </View>
                                <View style={{ position: "relative" }}>
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
                                </View>
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.confirm}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    )}

                </Formik >
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    inputText: {
        borderRadius: 30,
        backgroundColor: "white",
        height: 50,
        marginHorizontal: 50,
        marginVertical: 10,
        textAlign: "center",
        fontWeight: "bold"
    },
    btn: {
        backgroundColor: "#ff6600",
        marginHorizontal: 50,
        marginVertical: 10,
        borderRadius: 50,
        paddingVertical: 15
    },
    confirm: {
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
    },
})

export default ChefChangeQuantityWarehouse;