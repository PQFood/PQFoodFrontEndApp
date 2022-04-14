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
    flexBetweenRow: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        width: windowWidth * 0.9,
        borderRadius: 10,
    },
    textBold: {
        fontWeight: "bold"
    },
    textSize: {
        fontSize: 17
    }

});

export default styles