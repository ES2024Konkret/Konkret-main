import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import apiClient from "@/src/api/ApiClient";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        <ScrollView>
            <View>
                <TextInput
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    placeholder="RG"
                    value={rg}
                    onChangeText={setRg}
                    keyboardType="numeric"
                />
                <TextInput
                    placeholder="CPF"
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numeric"
                />
                <TextInput
                    placeholder="Cargo"
                    value={role}
                    onChangeText={setRole}
                />
                <TextInput
                    placeholder="Data de Início (dd/mm/aaaa)"
                    value={contractStart}
                    onChangeText={setContractStart}
                />
                <TextInput
                    placeholder="Data de Término (dd/mm/aaaa)"
                    value={contractEnd}
                    onChangeText={setContractEnd}
                />

                <Pressable onPress={handleSubmit}>
                    <Text>Adicionar</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
