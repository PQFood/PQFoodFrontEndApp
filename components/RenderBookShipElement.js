import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import styles from './stylesShipper';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
const RenderBookShipElement = ({ item, onPress, backgroundColor }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <View style={styles.flexBetweenRow}>
                <Text style={[styles.textBold, styles.textSize]}>{item.orderId}</Text>
                <CurrencyFormat
                    value={item.total}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' đ'}
                    renderText={value => <Text style={[styles.textBold, styles.textSize]}>{value}</Text>}
                />
            </View>
            <View style={styles.flexBetweenRow}>
                <Text style={styles.textSize}>{item.name}</Text>
                <Text style={styles.textSize}>{item.phoneNumber}</Text>
            </View>
            <View style={styles.flexBetweenRow}>
                <Text style={styles.textSize}>Địa chỉ: {item.address}</Text>
                <Text>{moment(item.updatedAt).format("LT,DD/MM/YYYY")}</Text>
            </View>

        </TouchableOpacity>
    )
}
export default RenderBookShipElement