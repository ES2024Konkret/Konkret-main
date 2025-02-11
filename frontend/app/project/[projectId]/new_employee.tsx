import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, ImageBackground } from "react-native";
import apiClient from "@/src/api/ApiClient";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowSVG from "@/assets/svg/chevron-left.svg"
import { styles } from "@/src/styles/login_styles"

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
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}>
                <Pressable style={styles.subButton} onPress={() => router.push(`/project/${projectId}/add_employees`)}>
                    <ArrowSVG width={51} height={51} fill="#fff" />
                </Pressable>
                <View style={[styles.loginBox, { width: '100%', height: '100%' }]}>
                    <View style={[styles.contentContainer, {
                        justifyContent: "flex-start",
                        alignItems: 'center',
                        width: '100%'
                    }]}>

                        

                        <View style={{
                            width: '90%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                width: '100%',
                                alignItems: 'center',
                                height: '120%',
                                justifyContent: 'flex-end'
                            }}>
                                <TextInput
                                    style={styles.formInput}
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                    placeholder="Nome"
                                    autoCapitalize="words"
                                />
                                <TextInput
                                    style={styles.formInput}
                                    value={rg}
                                    onChangeText={(text) => setRg(text)}
                                    placeholder="RG"
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={styles.formInput}
                                    value={cpf}
                                    onChangeText={(text) => setCpf(text)}
                                    placeholder="CPF"
                                    keyboardType="numeric"
                                />

                                <TextInput
                                    style={styles.formInput}
                                    value={role}
                                    onChangeText={(text) => setRole(text)}
                                    placeholder="Role"
                                    autoCapitalize="none"
                                />
                                <TextInput
                                    style={styles.formInput}
                                    value={contractStart}
                                    onChangeText={(text) => setContractStart(text)}
                                    placeholder="Início do Contrato"
                                    autoCapitalize="none"
                                />
                                <TextInput
                                    style={styles.formInput}
                                    value={contractEnd}
                                    onChangeText={(text) => setContractEnd(text)}
                                    placeholder="Fim do Contrato"
                                    autoCapitalize="none"
                                />
                                <Pressable style={[styles.formButton, { marginTop: 50 }]} onPress={() => handleSubmit()}>

                                    <Text style={styles.textButton}>Criar Funcionário</Text>
                                </Pressable>

                                <View style={{
                                    width: '100%',
                                    margin: 20,
                                    alignItems: 'center'
                                }}>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </ImageBackground>
        </View>
    );
}
