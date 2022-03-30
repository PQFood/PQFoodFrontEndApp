import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, RefreshControl } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Constants from 'expo-constants';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Formik } from 'formik';

import Login from './screens/Login'
import HomeShipper from './screens/HomeShipper'
import HomeChef from './screens/HomeChef'
import HomeWaiter from './screens/HomeWaiter'
import HomeAdmin from './screens/HomeAdmin'
import WaiterAddOrder from './screens/WaiterAddOrder'
import WaiterDetailOrder from './screens/WaiterDetailOrder'
import WaiterPayOrder from './screens/WaiterPayOrder'
import Test from './screens/Test'
import WaiterCompleteFood from './screens/WaiterCompleteFood';
import WaiterEditOrder from './screens/WaiterEditOrder'
import ChefPayOrder from './screens/ChefPayOrder'

function Navigation(props) {

    const Stack = createNativeStackNavigator();
    const WaiterDrawer = createDrawerNavigator();

    const HomeWaiterDrawer = () => {
        return (
            <WaiterDrawer.Navigator initialRouteName="Home">
                <WaiterDrawer.Screen name="Home" component={HomeWaiter} options={{ title: "Home", headerStyle: { backgroundColor: '#ffcc66',}, headerTitleAlign: "center",  }}/>
                <WaiterDrawer.Screen name="Test" component={Test} />
            </WaiterDrawer.Navigator>
        );
    }

    const HomeChefDrawer = () => {
        return (
            <WaiterDrawer.Navigator initialRouteName="Home">
                <WaiterDrawer.Screen name="Home" component={HomeChef} options={{ title: "Home", headerStyle: { backgroundColor: '#ffcc66',}, headerTitleAlign: "center",  }}/>
                <WaiterDrawer.Screen name="Test" component={Test} />
            </WaiterDrawer.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="HomeAdmin" component={HomeAdmin} options={{ headerShown: false }} />
                <Stack.Screen name="HomeShipper" component={HomeShipper} options={{ headerShown: false }} />
                <Stack.Screen name="HomeWaiter" component={HomeWaiterDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="HomeChef" component={HomeChefDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="WaiterDetailOrder" component={WaiterDetailOrder} options={{ title: "Chi Tiết Hóa Đơn", headerStyle: { backgroundColor: '#ffcc66' }, headerTitleAlign: "center" }} />
                <Stack.Screen name="WaiterPayOrder" component={WaiterPayOrder} options={{ title: "Thanh Toán Hóa Đơn", headerStyle: { backgroundColor: '#99ff66' }, headerTitleAlign: "center" }} />
                <Stack.Screen name="WaiterAddOrder" component={WaiterAddOrder} options={{ title: "Thêm Hóa Đơn", headerTitleAlign: "center" }} />
                <Stack.Screen name="WaiterCompleteFood" component={WaiterCompleteFood} options={{ title: "Hoàn thành món", headerTitleAlign: "center" }} />
                <Stack.Screen name="WaiterEditOrder" component={WaiterEditOrder} options={{ title: "Cập nhật phiếu gọi món", headerTitleAlign: "center" }} />
                <Stack.Screen name="ChefPayOrder" component={ChefPayOrder} options={{ title: "Chờ thanh Toán", headerTitleAlign: "center" }} />

            </Stack.Navigator>
        </NavigationContainer>

    )
}



export default Navigation;