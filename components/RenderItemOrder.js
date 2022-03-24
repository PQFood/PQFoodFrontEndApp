
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import CurrencyFormat from 'react-currency-format';

const RenderItemOrder = ({ item }) => {
    return (
        <SafeAreaView style={styles.item}>
            <View>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: item.image
                    }}
                />
            </View>
            <View style={styles.infoItem}>
                <View style={styles.groupInfo}>
                    <View><Text style={{ fontWeight: "bold" }}>{item.name}</Text></View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        <View><Text style={{ marginLeft: 10 }}>{item.quantity}</Text></View>
                    </View>
                </View>
                <View style={styles.groupInfo}>
                    <View>
                        <CurrencyFormat
                            value={item.price}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' đ'}
                            renderText={value => <Text>{value}</Text>}
                        />
                    </View>
                    <View>
                        <CurrencyFormat
                            value={item.price * item.quantity}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' đ'}
                            renderText={value => <Text>{value}</Text>}
                        />
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tinyLogo: {
      width: 80,
      height: 80,
    },
    item: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
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
      width: windowWidth * 0.6
    },
  });
  

export default RenderItemOrder