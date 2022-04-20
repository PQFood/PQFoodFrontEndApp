import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, FlatList, RefreshControl, Modal, Pressable } from 'react-native';
import styles from './styles';

const ReasonCancelOrder = ({ modalVisible, setModalVisible, setReason, reason, cancelOrder }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Điền lý do hủy</Text>
                    <TextInput
                        style={styles.textInputReason}
                        placeholder="Lý do hủy"
                        autoFocus={true}
                        onChangeText={(text) => {
                            setReason(text)
                        }}
                        value={reason}
                    />
                    <View style={{ flexDirection: "row" }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose, { marginRight: 10 }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hủy</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonConfirm]}
                            onPress={() => {
                                if (reason === "")
                                    Alert.alert(
                                        "Thông báo",
                                        "Vui lòng điền vào lý do hủy!",
                                        [
                                            {
                                                text: "OK",
                                                style: "cancel"
                                            },
                                        ]
                                    );
                                else cancelOrder()
                            }}
                        >
                            <Text style={styles.textStyle}>Xác nhận</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default ReasonCancelOrder