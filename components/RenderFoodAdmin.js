
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Text, View, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import moment from 'moment';
import styles from './styles';

const RenderFoodAdmin = ({ item, btnCancel, NavigationEditFood }) => {
    return (
        <>
            <View style={styles.adminOrder}>
                <View style={[styles.flexBetweenRow,{marginBottom: 10}]}>
                    <View style={{ alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                        <Image source={{ uri: item.image }} style={{ width: windowWidth * 0.2, height: windowWidth * 0.2 * 3 / 4 }} />
                    </View>
                    <View style={{ width: windowWidth * 0.6 }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }}>
                            <Text style={[styles.textInfoCustomer, { fontWeight: "bold" }]}>{item.name}</Text>
                            <CurrencyFormat
                                value={item.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ'}
                                renderText={value => <Text style={[styles.textInfoCustomer, { fontWeight: "bold" }]}>{value}</Text>}
                            />
                        </View>
                        <View style={{
                            marginVertical: 6,
                        }}>
                            <Text style={[styles.textInfoCustomer]}>Mô tả: {item.description}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.flexBetweenRow]}>
                    <TouchableOpacity
                        style={styles.btnDetail}
                        onPress={NavigationEditFood}
                    >
                        <Text>Cập nhật</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btnCancel, { marginRight: 10 }]}
                        onPress={btnCancel}
                    >
                        <Text>Xóa</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    )
}
export default RenderFoodAdmin