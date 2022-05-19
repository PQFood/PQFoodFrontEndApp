import React from 'react';
import Navigation from './Navigation'
import 'react-native-gesture-handler'
import axios from 'axios';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { MaterialIcons } from '@expo/vector-icons';
axios.defaults.baseURL = 'http://192.168.1.7:8002';
import { ToastProvider } from 'react-native-toast-notifications'
import Constants from 'expo-constants';

export default function App() {

  return (
    <ToastProvider
    swipeEnabled={true}
    icon={<MaterialIcons name="restaurant" size={24} color="black" />}
    offsetTop={Constants.statusBarHeight}
    textStyle={{ 
      fontSize: 15,
      paddingHorizontal: windowWidth*0.06
     }}
     successColor="#00e64d"
     normalColor="gray"
    >
      <Navigation />
    </ToastProvider>
  );
}
