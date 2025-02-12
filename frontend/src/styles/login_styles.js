import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    loginBox: {
        height: 482,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, 
        alignItems: 'center',
        width: '90%',
        padding: 20,
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
        fontFamily: 'Inter',
        borderColor: '#2E2E2E',
        borderWidth: 1,
        borderRadius: 12,
        fontSize: 12,
        width: '100%',
        padding: 12,
        margin: 10,
        fontWeight: 400,
    },
    textTitle: {
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: 600,
        color: '#001bcc',
        letterSpacing: 1.8,
    },
    textSubtitle: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 600,
        color: '#001bcc',
        letterSpacing: 1.44,
    },
    formButton: {
        width: '100%',
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
        fontFamily: 'Inter',
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 1.44,
    },
    compText: {
        color: '#2F2F2F',
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 12,
        letterSpacing: 1.08,
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