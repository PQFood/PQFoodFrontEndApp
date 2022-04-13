
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import CurrencyFormat from 'react-currency-format';
import { TouchableOpacity } from 'react-native-gesture-handler';



const RenderWarehouse = ({ item, updateWarehouse }) => {
  return (
    <View style={styles.item}>
      <View style={[styles.groupInfo]}>
        <Text style={styles.textBold}>{item.name}</Text>

        <CurrencyFormat
          value={item.quantity.$numberDecimal}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' ' + item.unit}
          renderText={value => <Text style={styles.textBold}>{value}</Text>}
        />
      </View>
      <View style={styles.groupInfo}>
        <Text>{item.providerName}</Text>
        <Text>{item.providerPhoneNumber}</Text>

      </View>
      <View style={styles.groupInfo}>
        <Text>{item.providerAddress}</Text>
        <TouchableOpacity
        onPress={updateWarehouse}
        style={styles.btn}
        >
          <Text style={styles.textBold}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: windowWidth * 0.9,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10
  },
  groupInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginVertical: 4
  },
  btn: {
    backgroundColor: "#ffcc00",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10
  },
  textBold: {
    fontWeight: "bold", 
    fontSize: 16
  },
});


export default RenderWarehouse