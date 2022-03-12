import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';

function Login() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.content}>
                <Text style={styles.inHi}>Đăng nhập</Text>

            </View>

            <View style={styles.form}>
            <FontAwesome5 name="lock" size={24} color="black" style={styles.iconLock} />
            <FontAwesome5 name="user-alt" size={24} color="black" style={styles.iconUser}/>
                <TextInput
                    style={styles.inputText}
                    placeholder="Tên đăng nhập"
                    autoFocus={true}
                />

                <TextInput
                    style={styles.inputText}
                    placeholder="Mật khẩu"
                    // keyboardType="numeric"
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.buttonLogin}
                >
                    <Text style={{ ...TEXT }}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.action}>
                <TouchableOpacity
                    style={styles.buttonAction}
                >
                    <Text style={{ ...TEXT }}>Quên mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonAction}
                >
                    <Text style={{ ...TEXT }}>Thoát tài khoản</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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