import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    background: {
        flex: 1 ,
        alignContent: 'center',
        justifyContent: 'center',
    },  
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBox: {
        width: 343,
        height: 482,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, 
        alignItems: 'center',
    },
    formBox: {
        maxWidth: 400,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    formTitle: {
        fontFamily: 'Inter',
        fontSize: 36,
        fontWeight: 800,
        color: '#001bcc',
        margin: 10,
        letterSpacing: 3.24,
    },
    formSubTitle: {
        fontFamily: 'Inter', 
        fontSize: 20,
        fontWeight: 600,
        color: '#001bcc',
        margin: 10,
        letterSpacing: 1.8,
    },
    formText: {
        fontFamily: 'Inter',
        fontSize: 28,
        fontWeight: 400,
        letterSpacing: 2.52,
        color: '#001bcc'
    },
    formInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 22,
        width: '80%',
        padding: 10,
        margin: 10,
    },
    formButton: {
        width: 285,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: "#001BCC",
        shadowColor: "rgba(0, 0, 0, 0.1)", 
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4, 
        elevation: 4,
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 1.44,
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    subButton: {
        padding: 10,
    },
    subTextButton: {
        color: 'blueviolet',
    }

})