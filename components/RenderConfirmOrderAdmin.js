
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Text, View, Button } from 'react-native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import moment from 'moment';
import styles from './styles';
import Navigation from '../Navigation';

const RenderConfirmOrderAdmin = ({ item, btnCancel, btnConfirm,NavigationDetail }) => {
    return (
        <>
            <View style={styles.adminOrder}>
                <View style={[styles.flexBetweenRow]}>
                    <Text style={[styles.textInfoCustomer]}>{item.dinnerTableName}</Text>
                    <Text style={[styles.textInfoCustomer]}>{item.orderId}</Text>
                </View>
                <View style={[styles.flexBetweenRow, { marginVertical: 6 }]}>
                    <CurrencyFormat
                        value={item.total}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' đ'}
                        renderText={value => <Text style={{ fontWeight: "bold" }}>{value}</Text>}
                    />
                    <Text>{moment(item.updatedAt).format("LT,L")}</Text>
                </View>
                <View style={[styles.flexBetweenRow]}>
                    <TouchableOpacity
                        style={styles.btnDetail}
                        onPress={NavigationDetail}
                    >
                        <Text>Chi Tiết</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity
                            style={[styles.btnCancel,{marginRight: 10}]}
                            onPress={btnCancel}
                        >
                            <Text>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnConfirm}
                            onPress={btnConfirm}
                        >
                            <Text>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </>
    )
}
export default RenderConfirmOrderAdmin