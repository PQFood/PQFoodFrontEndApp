import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, ScrollView, Button, Image } from 'react-native';
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
import * as ImagePicker from 'expo-image-picker';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function AdminAddFoodMenu(props) {


    const { navigation } = props;
    const isFocused = useIsFocused()
    const toast = useToast();
    const [image, setImage] = useState(null);


    const handleUpdata = (photo) => {
        const data = new FormData()
        data.append('file', photo)
        data.append("upload_preset", "name_upload_preset")
        data.append("cloud_name", "cloud_name")
        fetch("https://api.cloudinary.com/v1_1/pqshop/image/upload", {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                setImage(data.url)
            }).catch(err => {
                Alert.alert("Error While Uploading")
            })
    }



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);


        if (!result.cancelled) {
            let newFile = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test.${result.uri.split(".")[1]}`
            };
            handleUpdata(newFile)
        }
    };


    const CheckFormAddDinnerTable = Yup.object().shape({
        nameFood: Yup
            .string()
            .required('Vui lòng nhập tên thức ăn/ thức uống!'),
        price: Yup
            .number('Vui lòng nhập vào số!')
            .integer('vui lòng nhập vào số nguyên!')
            .required('Vui lòng nhập giá thức ăn/ thức uống!')
            .min(1000, 'Số quá ngắn!')
            .typeError('Vui lòng nhập vào số!'),
        description: Yup
            .string()
            .required('Vui lòng nhập mô tả!'),
    });

    return (
        <ScrollView>
            <Text style={styles.textHeader}>Thêm thực đơn</Text>
            <Formik
                enableReinitialize={false}
                initialValues={{
                    nameFood: '',
                    price: '',
                    classify: '1',
                    description: '',
                }}
                validationSchema={CheckFormAddDinnerTable}

                onSubmit={(values, { resetForm }) => {
                    axios({
                        method: 'post',
                        url: '/admin/addFoodMenu',
                        data: {
                            image: image,
                            description: values.description,
                            name: values.nameFood,
                            price: values.price,
                            classify: values.classify,
                        }
                    })
                        .then(response => {
                            if (response.data === "ok") showToast("Thêm thực đơn thành công")
                            else showToast("Thêm thực đơn thất bại")
                            resetForm()
                            navigation.navigate('AdminListFood')
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
                                placeholder="Tên thức ăn/ thức uống"
                                onChangeText={handleChange('nameFood')}
                                onBlur={handleBlur('nameFood')}
                                value={values.nameFood}
                            />
                            {errors.nameFood && touched.nameFood ? (
                                <Text style={{ color: 'red', textAlign: "center" }}>{errors.nameFood}</Text>
                            ) : null}

                            <TextInput
                                style={styles.inputText}
                                placeholder="Giá (VNĐ)"
                                onChangeText={handleChange('price')}
                                onBlur={handleBlur('price')}
                                value={values.price}
                            />
                            {errors.price && touched.price ? (
                                <Text style={{ color: 'red', textAlign: "center" }}>{errors.price}</Text>
                            ) : null}

                            <TouchableOpacity style={styles.uploadImage}
                                onPress={async () => {
                                    await pickImage()
                                }}
                            >
                                <Text>
                                    Chọn hình ảnh
                                </Text>
                            </TouchableOpacity>

                            {image && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Image source={{ uri: image }} style={{ width: windowWidth * 0.8, height: windowWidth * 0.8 * 3 / 4 }} /></View>}

                            <View style={styles.pickerPositon}>
                                <Picker
                                    selectedValue={values.classify}
                                    style={{ width: 150, }}
                                    onValueChange={handleChange('classify')}
                                >
                                    <Picker.Item label="Thức ăn" value="1" />
                                    <Picker.Item label="Thức uống" value="2" />

                                </Picker>
                            </View>

                            <TextInput
                                style={{
                                    width: windowWidth * 0.85,
                                    borderRadius: 30,
                                    backgroundColor: "white",
                                    marginHorizontal: 50,
                                    marginVertical: 10,
                                    textAlign: "center"
                                }}
                                multiline
                                numberOfLines={5}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                                placeholder="Mô tả"
                            />
                            {errors.description && touched.description ? (
                                <Text style={{ color: 'red', textAlign: "center" }}>{errors.description}</Text>
                            ) : null}


                            <TouchableOpacity
                                disabled={image ? false : true}
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



export default AdminAddFoodMenu;