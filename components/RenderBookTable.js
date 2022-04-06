import React from 'react';
import { Text, View, Button } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import styles from './styles';

const RenderBookTable = ({ item, nameBtn,cancelBook, confirmBook }) => {
    return (
      <View style={[styles.bookTableConfirm,{width: windowWidth*0.9}]}>
        <View style={styles.flexBetweenRow}>
          <Text style={[styles.textConfirmBookTable,{fontWeight: "bold"}]}>
            {item.name}
          </Text>
          <Text style={[styles.textConfirmBookTable]}>
            {item.time}
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
        </View>
        <View style={styles.flexBetweenRow}>
          <Text style={[styles.textConfirmBookTable]}>
            <Button
              onPress={confirmBook}
              title={nameBtn}
              color="#00cc00"
            />
          </Text>
          <Text style={[styles.textConfirmBookTable]}>
          <Button
              onPress={cancelBook}
              title="Hủy"
              color="#ff3333"
            />
          </Text>
        </View>
      </View>
    )
  }

  export default RenderBookTable