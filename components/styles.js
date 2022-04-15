import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 20,
        color: "#ff6600",
        marginVertical: 6
    },
    ul: {
        fontSize: 18,
        color: "#ff6600",
        textAlign: "center"
    },
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
    footer: {
        height: windowHeight * 0.13,
    },
    footerOneElement: {
        height: windowHeight * 0.08,
    },
    footer2: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 6,
        backgroundColor: "#ccffcc"
    }
    ,
    textBold: {
        fontWeight: "bold",
        fontSize: 20
    },
    textChangeQuantity: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    changeQuantity: {
        backgroundColor: "#ff6600",
        marginLeft: 10,
        paddingHorizontal: 15,
        paddingVertical: 4,
        borderRadius: 10
    },
    footerPage: {
        alignItems: "center",
        height: windowHeight * 0.05,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    btnFooter: {
        lineHeight: windowHeight * 0.05,
        backgroundColor: "#ffcc66",
        width: windowWidth * 0.495,
        textAlign: "center",
    },
    noteStyle: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20
    },
    flexBetweenRow: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    bookTableConfirm: {
        backgroundColor: "#99d6ff",
        marginVertical: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6
    },
    textConfirmBookTable: {
        fontSize: 16,
        marginVertical: 4
    },
    orderHistory: { 
        width: windowWidth * 0.9, 
        marginHorizontal: 6,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 6
    },
    textInfoCustomer: {
        color: "black",
        marginVertical: 2,
        fontSize: 15
    }
});

export default styles