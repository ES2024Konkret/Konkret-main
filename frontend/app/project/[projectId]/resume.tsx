import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from 'react';

export default function ProjectResume() {
    const router = useRouter();
    const { projectId } = useLocalSearchParams();

    // Estado para armazenar a data e mês atuais
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // Função para obter a data e mês atuais
        const getCurrentDate = () => {
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
            const date = new Date().toLocaleDateString('pt-BR', options);
            setCurrentDate(date);
        };

        // Atualiza a data uma vez ao montar o componente
        getCurrentDate();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Link href={"/dashboard/projects"} style={styles.backLink}>
                    <Text style={styles.backLinkText}>←</Text>
                </Link>
                <Text style={styles.monthYear}>{currentDate}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable 
                    style={[styles.button, styles.funcionarioButton, styles.buttonMargin]}
                    onPress={() => router.push(`/project/${projectId}/view_employees`)}
                >
                    <Text style={styles.buttonText}>+ Funcionário</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, styles.materiaisButton, styles.buttonMargin]}
                >
                    <Text style={styles.buttonText}>+ Materiais</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, styles.equipamentoButton, styles.buttonMargin]}
                >
                    <Text style={styles.buttonText}>+ Equipamento</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    backArrow: {
        fontSize: 24,
        color: "#000",
    },
    monthYear: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#0028FF",
        alignItems: 'center',
    },
    buttonsContainer: {
        width: '100%',
        marginBottom: 24,
    },
    button: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    buttonMargin: {
        marginBottom: 16,
    },
    funcionarioButton: {
        backgroundColor: "#0028FF",
    },
    materiaisButton: {
        backgroundColor: "#FFC107",
    },
    equipamentoButton: {
        backgroundColor: "#00ACC1",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    backLink: {
        marginTop: 24,
    },
    backLinkText: {
        color: "#0028FF",
        textDecorationLine: 'underline',
        fontSize: 16,
    },
});