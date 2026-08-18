import {StyleSheet} from 'react-native';

export const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e5e5e5",
        width: '100%',
        height: '100%',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    avatar: {
        backgroundColor: "#e5e5e5",
        flex: 1,
        width: "100%",
        height: "100%"
    },
    month: {},
    dayName: {
        fontSize: 25,
        alignSelf: 'center',
        letterSpacing: 13.5,
        paddingLeft: 0,
    },
    numbers: {
        fontSize: 30,
        alignSelf: "center",
        padding: 8,
    },
    texts: {},
    modalCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 55,
        fontWeight: "bold",
        alignSelf: "center",
    },
    subheaderText: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        color: "green",
    },
    cancelText: {
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "flex-start",
        paddingLeft: 20,
        color: "green",
    },
    addText: {
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "flex-end",
        paddingRight: 20,
        color: "green",
    },
    rowBorder: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 15
        
    },
    rowSelectBorder: {
        flexDirection: "row",
        alignSelf: "center",
        height: 30,
        width: 100,
        margin: 0,
        backgroundColor: "#d8d8d8",
        borderRadius: 15
        
    },
    yearText: {
        fontSize: 40,
        padding: 20,
        fontWeight: "bold",
        alignSelf: "center",
    },
    boxFlex: {
        justifyContent: "center",
        flexDirection: "row",
    },
    eventBox: {
        alignSelf: "center",
        height: 800,
        width: 400,
        borderRadius: 15,
        backgroundColor: '#d4d4d4',
    },
    box1: {
        justifyContent: "space-between",
        alignSelf: "center",
        height: 50,
        width: 50,
        borderRadius: 15,
        backgroundColor: '#b4b4b4',
    },
    box2: {
        justifyContent: "space-between",
        alignSelf: "center",
        height: 50,
        width: 50,
        borderRadius: 15,
        backgroundColor: '#ff6464',
    },
    box3: {
        justifyContent: "space-between",
        alignSelf: "center",
        height: 50,
        width: 50,
        borderRadius: 15,
        backgroundColor: '#3ab973',
    },
    box4: {
        justifyContent: "space-between",
        alignSelf: "center",
        height: 50,
        width: 50,
        borderRadius: 15,
        backgroundColor: '#ff8e51',
    },
    days: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    scrollViewWindow: {
        height: 400,           
        borderWidth: 0,
    },
    scrollableContent: {
        paddingVertical: 0,
        flexGrow: 1,            
    },
    
});