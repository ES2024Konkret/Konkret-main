import { StyleSheet } from "react-native";
import { user_styles } from "./dashboard_styles";


export const styles = StyleSheet.create({
    background: {
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
    employeeContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignItems: 'center',
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
    textIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginTop: 40,
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    inputContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#001bcc',
        borderRadius: 12,
        padding: 12,
        gap: 10,
        margin: 15
    },
    textSearch: {
        fontFamily: 'Inter',
        color: '#001bcc',
        fontSize: 12,
        width: '100%',
        fontWeight: 400,
        letterSpacing: 1.08,
        borderWidth: 0
    },
    subButton: {
        padding: 10,
    },
})

export const employee_styles = StyleSheet.create({
    employeeBox: {
        backgroundColor: 'white',
        width: '90%',
        shadowColor: 'black',
        shadowRadius: 50,
        shadowOpacity: 0.10,
        margin: 6,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
    },
    employeeName: {
        color: '#001bcc',
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 1.08
    },
    employeeRole: {
        color: '#2e2e2e',
        fontFamily: 'Inter',
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 0.9
    },
    roundImage: {
        width: 63, 
        height: 63,
        borderRadius: 50, 
        overflow: 'hidden',
        alignItems: "center",
        justifyContent: "center"
    },
})