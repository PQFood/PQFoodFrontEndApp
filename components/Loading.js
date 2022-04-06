import React,{useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, RefreshControl } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/styles';

const LoadingComponent = ()=>{
    return (
        <View style={styles.container}>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#ff6600"
          }}>Đang tải...</Text>
        </View>
    
      )
}
export default LoadingComponent