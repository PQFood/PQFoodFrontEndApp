import React, { useState, useEffects } from 'react';
import { Text, View, Button } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import CurrencyFormat from 'react-currency-format';
import styles from './styles';
import moment from 'moment';

const RenderHistoryOrder = ({ item }) => {
  return (
    <View >
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
        <Text>{moment(item.updatedAt).format("LT,DD/MM/YYYY")}</Text>
      </View>
    </View>

  )
}

export default RenderHistoryOrder