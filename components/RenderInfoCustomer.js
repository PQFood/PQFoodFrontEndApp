
import React from 'react';
import { Text, View, Button } from 'react-native';

import styles from './styles';


const RenderInfoCustomer = ({ bookShip }) => {
    return (
        <>
            <Text style={styles.ul}>Thông tin khách hàng</Text>
            <View>
                <View style={[styles.flexBetweenRow]}>
                    <Text style={[styles.textInfoCustomer]}>{bookShip.name}</Text>
                    <Text style={[styles.textInfoCustomer]}>{bookShip.phoneNumber}</Text>
                </View>
                <View style={[styles.flexBetweenRow]}>
                    <Text style={[styles.textInfoCustomer]}>Địa chỉ: {bookShip.address}</Text>
                    <Text style={[styles.textInfoCustomer]}>Ghi chú: {bookShip.note}</Text>
                </View>
            </View>

        </>
    )
}
export default RenderInfoCustomer