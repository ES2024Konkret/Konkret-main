import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, ImageBackground } from "react-native";
import apiClient from "@/src/api/ApiClient";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowSVG from "@/assets/svg/chevron-left.svg"

export default function NewEmployee() {
    const router = useRouter();
    const { projectId } = useLocalSearchParams();

    // Estados para armazenar os valores dos inputs
    const [name, setName] = useState("");
    const [rg, setRg] = useState("");
    const [cpf, setCpf] = useState("");
    const [role, setRole] = useState("");
    const [contractStart, setContractStart] = useState("");
    const [contractEnd, setContractEnd] = useState("");

    const stringToDateString = (dateString: string) => {
        const [day, month, year] = dateString.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        // Formatando para yyyy-mm-dd, que é o formato aceito pela API
        return date.toISOString().split('T')[0];
    };

    // Função para criar um novo funcionário
    async function createEmployee(name: string, rg: string, cpf: string, role: string, contract_start: string, contract_end: string) {
        const token = await AsyncStorage.getItem("authToken");
        apiClient.employee
            .addEmployeeEmployeePost({
                name,
                rg,
                cpf,
                role,
                contract_start,
                contract_end
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then((response) => {
                if (response && response.status === 200) {
                    router.push(`/project/${projectId}/add_employees`);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Função para enviar os dados
    const handleSubmit = () => {
        if (!name || !rg || !cpf || !role || !contractStart || !contractEnd) {
            console.log("Por favor, preencha todos os campos!");
            return;
        }

        // Converter as datas para strings no formato correto
        const start_date = stringToDateString(contractStart);
        const end_date = stringToDateString(contractEnd);

        createEmployee(name, rg, cpf, role, start_date, end_date);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}></ImageBackground>
            <Pressable style={styles.subButton} onPress={() => router.push(`/project/${projectId}/view_employees`)}>
                <ArrowSVG width={51} height={51} fill="#fff" />
            </Pressable>
            <View style={[styles.employeeContainer]}>
                <Text style={styles.title}>Adicionar</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="RG"
                    value={rg}
                    onChangeText={setRg}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cargo"
                    value={role}
                    onChangeText={setRole}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Data de Início (dd/mm/aaaa)"
                    value={contractStart}
                    onChangeText={setContractStart}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Data de Término (dd/mm/aaaa)"
                    value={contractEnd}
                    onChangeText={setContractEnd}
                />

                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </Pressable>
                </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#0028FF",
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#0028FF",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#0028FF",
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    subButton: {
        padding: 10,
    },
    background: {
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
});