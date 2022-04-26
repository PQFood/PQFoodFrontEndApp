
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Text, View, Button } from 'react-native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import moment from 'moment';
import styles from './styles';

const RenderStaffAdmin = ({ item, btnCancel, NavigationEditStaff }) => {
    return (
        <>
            <View style={styles.adminOrder}>
                <View style={[styles.flexBetweenRow]}>
                    <Text style={[styles.textInfoCustomer]}>{item.name}</Text>
                    <Text style={[styles.textInfoCustomer]}>{item.position}</Text>
                </View>
                <View style={[styles.flexBetweenRow, { marginVertical: 6 }]}>
                    <Text style={[styles.textInfoCustomer]}>{item.address}</Text>
                    <Text style={[styles.textInfoCustomer]}>{item.phoneNumber}</Text>
                </View>
                <View style={[styles.flexBetweenRow]}>
                    <TouchableOpacity
                        style={styles.btnDetail}
                        onPress={NavigationEditStaff}
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
export default RenderStaffAdmin