import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './Navigation'


import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.1.19:8000';

export default function App() {



  return (
    <Navigation />

  );
}
