import React, { useState, useEffects } from 'react';
import { Text, View, Button } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import CurrencyFormat from 'react-currency-format';
import styles from './styles';

const RenderHistoryOrder = ({ item }) => {
  return (
    <View>
      {item.state === "Đã hủy" ? (
        <View style={[styles.orderHistory, { backgroundColor: "#ff3300" }]}>
          <View style={styles.flexBetweenRow}>
            <Text>{item.dinnerTableName}</Text>
            <Text>{item.orderId}</Text>

          </View>
          <View style={{ alignItems: "center" }}>
            <CurrencyFormat
              value={item.total}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' đ'}
              renderText={value => <Text style={styles.textBold}>{value}</Text>}
            />
          </View>
        </View>
      ) : (
        <View style={[styles.orderHistory, { backgroundColor: "#66ff66" }]}>
          <View style={styles.flexBetweenRow}>
            <Text>{item.dinnerTableName}</Text>
            <Text>{item.orderId}</Text>

          </View>
          <View style={{ alignItems: "center" }}>
            <CurrencyFormat
              value={item.total}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' đ'}
              renderText={value => <Text style={styles.textBold}>{value}</Text>}
            />
          </View>
        </View>
      )}

    </View>
  )
}

export default RenderHistoryOrder