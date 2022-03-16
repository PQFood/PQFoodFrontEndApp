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
import { Formik } from 'formik';
import * as Yup from 'yup';

import LoginComponent from '../components/Login'
import HomeShipper from './HomeShipper'
import HomeChef from './HomeChef'
import HomeWaiter from './HomeWaiter'
import HomeAdmin from './HomeAdmin'


function Login(props) {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginComponent}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="HomeAdmin" component={HomeAdmin} options={{ headerShown: false }} />
                <Stack.Screen name="HomeShipper" component={HomeShipper} options={{ headerShown: false }} />
                <Stack.Screen name="HomeWaiter" component={HomeWaiter} options={{ headerShown: false }} />
                <Stack.Screen name="HomeChef" component={HomeChef} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>

    )
}



export default Login;