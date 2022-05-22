import React from 'react';
import { Text, View, Button } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import styles from './styles';
import moment from 'moment';


const RenderHistoryBookTable = ({ item }) => {
  return (
    <View style={[styles.bookTableConfirm, { width: windowWidth * 0.9 }]}>
      <View style={styles.flexBetweenRow}>
        <Text style={[styles.textConfirmBookTable, { fontWeight: "bold" }]}>
          {item.name}
        </Text>
        <Text style={[styles.textConfirmBookTable]}>
          {moment(item.time).format("LT,L")}
        </Text>
      </View>
      <View style={styles.flexBetweenRow} >
        <Text style={[styles.textConfirmBookTable]}>
          {item.phoneNumber}
        </Text>
        <Text style={[styles.textConfirmBookTable]}>
          {item.quantity} người
        </Text>
      </View>
      <View style={styles.flexBetweenRow}>
        <Text style={[styles.textConfirmBookTable]}>
          Ghi chú: {item.note}
        </Text>
        {item.state === "Hủy" ? (<Text style={[styles.textConfirmBookTable,{color: "red", fontWeight: "bold", fontSize: 20}]}>
          {item.state}
        </Text>) : (<Text style={[styles.textConfirmBookTable,{color: "green", fontWeight: "bold", fontSize: 20}]}>
          {item.state}
        </Text>)}

      </View>
    </View>
  )
}

export default RenderHistoryBookTable