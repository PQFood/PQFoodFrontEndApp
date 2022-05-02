import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import showToast from '../components/ShowToast';
import { useToast } from "react-native-toast-notifications";
import styles from '../components/styles';
import AdminUseGetDinnerTable from '../hooks/AdminUseGetDinnerTable';

function AdminEditDinnerTable(props) {


    const { navigation, route } = props;
    const [loading,setLoading] = useState(true)
    const [dinnerTable,setDinnerTable] = useState(true)
    const slug = route.params.slug

    const toast = useToast();
    useEffect(()=>{
        AdminUseGetDinnerTable({setLoading, setDinnerTable, slug})
        // console.log(typeof(dinnerTable.quantity+''))
    },[])


    const CheckFormAddDinnerTable = Yup.object().shape({
        name: Yup
            .string()
            .required('Vui lòng nhập tên bàn ăn!'),
        description: Yup
            .string()
            .required('Vui lòng nhập mô tả bàn ăn!'),

    });

    return (
        <ScrollView>
            <Text style={styles.textHeader}>Thêm bàn ăn</Text>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: dinnerTable.name,
                    quantity: dinnerTable.quantity+'',
                    description: dinnerTable.description,
                }}
                validationSchema={CheckFormAddDinnerTable}
                // validateOnChange={false}
                onSubmit={(values, { resetForm }) => {
                    axios({
                        method: 'post',
                        url: '/admin/editDinnerTable',
                        data: {
                            name: values.name,
                            quantity: values.quantity,
                            description: values.description,
                            slug: slug
                        }
                    })
                        .then(response => {
                            if (response.data === "ok") showToast("Cập nhật bàn ăn thành công")
                            else showToast("Cập nhật bàn ăn thất bại")
                            resetForm()
                            navigation.navigate('AdminListDinnerTable')
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
                                placeholder="Tên bàn ăn"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            {errors.name && touched.name ? (
                                <Text style={{ color: 'red', textAlign: "center" }}>{errors.name}</Text>
                            ) : null}

                            <View style={styles.pickerPositon}>
                                <Picker
                                    selectedValue={values.quantity}
                                    style={{ width: 150, }}
                                    onValueChange={handleChange('quantity')}
                                >
                                    <Picker.Item label="1" value="1" />
                                    <Picker.Item label="2" value="2" />
                                    <Picker.Item label="3" value="3" />
                                    <Picker.Item label="4" value="4" />

                                </Picker>
                            </View>

                            <TextInput
                                style={styles.inputText}
                                placeholder="Mô tả"
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />
                            {errors.description && touched.description ? (
                                <Text style={{ color: 'red', textAlign: "center" }}>{errors.description}</Text>
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



export default AdminEditDinnerTable;