import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Alert } from "react-native";
import { projects_styles } from "@/src/styles/dashboard_styles";
import apiClient from "@/src/api/ApiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { report } from "@/src/styles/dashboard_styles";
import { LocaleConfig, Calendar } from "react-native-calendars";
import { useLocalSearchParams } from "expo-router";

interface fetchedReports {
    id: string;
    observations: string;
    activities: string[];
    photos: string[];
    created_at: string;
}

export default function Relatorio() {
    const today = new Date();
    const project = useLocalSearchParams();
    const [reports, setReports] = useState<fetchedReports[]>([]);

    LocaleConfig.locales['br'] = {
        monthNames: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
        ],
        monthNamesShort: [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
        ],
        dayNames: [
            'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado',
        ],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        today: 'Hoje',
    };
    LocaleConfig.defaultLocale = 'br';

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ];
    const month_index = today.getMonth();
    const [currentMonth, setCurrentMonth] = useState(months[month_index]);
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    async function getReports() {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) return;

        try {
            const response = await apiClient.report.getallReportsReportGet({
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status !== 200) {
                console.error("Erro ao buscar relatórios:", response.statusText);
                return;
            }

            setReports(response.data);
        } catch (error) {
            console.error("Erro ao buscar relatórios:", error);
            Alert.alert("Erro", "Não foi possível carregar os relatórios.");
        }
    }

    useEffect(() => {
        getReports();
    }, []);

    return (
        <ScrollView contentContainerStyle={report.container}>
            <View style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>
                <View style={{ flex: 1 }}>
                    <Text style={[projects_styles.header, { color: '#001bcc', textAlign: 'left' }]}>{currentMonth}</Text>
                    <Text style={[projects_styles.subHeader, { color: '#001bcc', textAlign: 'left' }]}>{currentYear}</Text>
                </View>

                <Calendar
                    locale={'br'}
                    style={report.calendario}
                    theme={{
                        textMonthFontSize: 18,
                        dayTextColor: "009ccc",
                    }}
                    onMonthChange={(month) => {
                        const { month: monthNumber, year } = month;
                        const monthNames = [
                            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                        ];
                        setCurrentMonth(`${monthNames[monthNumber - 1]}`);
                        setCurrentYear(`${year}`);
                    }}
                    onDayPress={day => {
                        console.log('selected day', day);
                    }}
                />

                <View style={{ marginTop: 100 }}>
                    <Text style={[projects_styles.header, { color: '#001bcc', textAlign: 'left' }]}>
                        Nome da obra: {project.name}
                    </Text>
                </View>
                <Text style={{ color: '#001bcc', textAlign: 'left', marginTop: 20, fontSize: 18 }}>
                    Rua: {project.public_place}
                </Text>
                <Text style={{ color: '#001bcc', textAlign: 'left', marginTop: 20, fontSize: 18 }}>
                    Bairro: {project.neighborhood}
                </Text>
                <Text style={{ color: '#001bcc', textAlign: 'left', marginTop: 20, fontSize: 18 }}>
                    CEP: {project.zip_code}
                </Text>
                <Text style={{ color: '#001bcc', textAlign: 'left', marginTop: 20, fontSize: 18 }}>
                    Estado: {project.state}
                </Text>
                <Text style={{ color: '#001bcc', textAlign: 'left', marginTop: 20, fontSize: 18 }}>
                    Data de Início: {project.start_date}
                </Text>

                <View style={{ marginTop: 100 }}>
                    <Text style={[projects_styles.header, { color: '#001bcc', textAlign: 'left' }]}>
                        Lista de Relatórios:
                    </Text>
                </View>

                <FlatList
                    data={reports}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.projectBox}>
                            <Text style={styles.projectName}>Observações: {item.observations}</Text>
                            <Text style={styles.projectInfo}>
                                Atividades: {item.activities && Array.isArray(item.activities) ? item.activities.join(", ") : "Nenhuma atividade registrada"}
                            </Text>
                            <Text style={styles.projectInfo}>
                                Criado em: {new Date(item.created_at).toLocaleDateString()}
                            </Text>
                        </View>
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 10,
    },
    projectBox: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    projectName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    projectInfo: {
        fontSize: 14,
        color: "#555",
        marginBottom: 3,
    },
});