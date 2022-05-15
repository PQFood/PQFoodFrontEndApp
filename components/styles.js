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
    btnFooter3Item: {
        lineHeight: windowHeight * 0.05,
        backgroundColor: "#ffcc66",
        width: windowWidth * 0.33,
        textAlign: "center",
    },
    noteStyle: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        paddingVertical: 4
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
    },
    infoCustomer: {
        backgroundColor: "#ffffff",
        width: windowWidth * 0.9,
        marginVertical: 8,
        padding: 10,
        borderRadius: 10
    },
    btnFooterOneElement: {
        lineHeight: windowHeight * 0.05,
        backgroundColor: "#ffcc66",
        width: windowWidth,
        textAlign: "center",
    },



    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#ff6600",
    },
    buttonConfirm: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        color: "red",
        fontSize: 16
    },
    textInputReason: {
        backgroundColor: "#f2f2f2",
        borderRadius: 30,
        height: 50,
        marginBottom: 15,
        paddingLeft: 20,
        width: windowWidth * 0.8
    },
    adminOrder: {
        width: windowWidth * 0.9,
        backgroundColor: "#e6fff2",
        marginVertical: 6,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    btnDetail: {
        backgroundColor: "#ffff33",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10
    },
    btnCancel: {
        backgroundColor: "#ff6600",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10
    },
    btnConfirm: {
        backgroundColor: "#ffcc00",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10
    },
    inputText: {
        width: windowWidth*0.85,
        borderRadius: 30,
        backgroundColor: "white",
        height: 50,
        marginHorizontal: 50,
        marginVertical: 10,
        textAlign: "center"
    },
    btnConfirmForm: {
        marginHorizontal: windowWidth*0.12,
        marginTop: 10,
        paddingVertical: 15,
        borderRadius: 30,
        backgroundColor: "#ff6600",
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
    },
    iconShowHidden: {
        position: "absolute",
        top: 20,
        left: windowWidth * 0.8,
        zIndex: 100,
    },
    pickerPositon: {
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: windowWidth*0.12,
        backgroundColor: "white",
        borderRadius: 30,
        marginVertical: 10,
    },
    textHeader: {
        textAlign: "center",
        marginVertical: 10,
        fontSize: 17,
        fontWeight: "bold",
        color: "#ff3300"
    },
    uploadImage:{
        width: windowWidth*0.85,
        borderRadius: 30,
        backgroundColor: "white",
        height: 50,
        marginHorizontal: 50,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    }

});

export default styles