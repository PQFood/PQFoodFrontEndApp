
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RenderStaff = ({ item }) => {
    return (
        <SafeAreaView style={styles.item}>
            <View>
               <Text>{item.name}</Text>
            </View>
            <View>
               <Text>{item.position}</Text>
            </View>
            <View>
               <Text>{item.act}</Text>
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
    //   width: windowWidth * 0.6
    },
  });
  

export default RenderStaff