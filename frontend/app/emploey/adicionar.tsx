import React from "react";
import { styles } from "../../src/styles/login_styles";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { Pressable, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, ImageBackground } from "react-native";
import apiClient from "@/src/api/ApiClient";
import ArrowSVG from "@/assets/svg/chevron-left.svg"

export default function NewEmployee() {
    const [name, setName] = React.useState(""); //nome
    const [rg, setRg] = React.useState(""); //Rg
    const [cpf, setCpf] = React.useState(""); //CPF
    const [role, setRole] = React.useState(""); //Cargo
    const [contract_start, setStart] = React.useState(""); //Periodo inicio
    const [contract_end, setEnd] = React.useState(""); //Periodo FIm
    const router = useRouter();
    const { projectId } = useLocalSearchParams();

    async function createEmployee(
        name: string,
        rg: number,
        cpf: number,
        role: string,
        contract_start: string,
        contract_end: string
    ) {
        try {
            const token = await AsyncStorage.getItem("authToken"); // Obter o token armazenado
            if (!token) {
                console.error("Token não encontrado!");
                return;
            }
    
            const response = await apiClient.employee.addEmployeeEmployeePost(
                {
                    name,
                    rg,
                    cpf,
                    role,
                    contract_start,
                    contract_end,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }, // Cabeçalho correto
                }
            );
    
            // Verificar se a resposta foi bem-sucedida
            if (response && response.status === 200) {
                console.log("Funcionário criado com sucesso:", response.data);
                router.push(`/project/${projectId}/add_employees`); // Redirecionar para a página inicial
            } else {
                console.error("Erro ao criar o funcionário:", response);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
    
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}>
                <Link href="/dashboard/new_project" style={styles.subButton}>
                    <ArrowSVG width={51} height={51} fill="#fff"></ArrowSVG>
                </Link>
                <View style={[styles.loginBox, {width: '100%', height: '100%'}]}>
                    <View style={[styles.contentContainer, {
                        justifyContent: "flex-start",
                        alignItems: 'center',
                        width: '100%'
                    }]}>

                        <Text style={[styles.formTitle, {marginTop: 50}]}>Criar Trabalhador</Text>
                    
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
                                    value={contract_start}
                                    onChangeText={(text) => setStart(text)}
                                    placeholder="Início do Contrato"
                                    autoCapitalize="none"
                                />
                                <TextInput
                                    style={styles.formInput}
                                    value={contract_end}
                                    onChangeText={(text) => setEnd(text)}
                                    placeholder="Fim do Contrato"
                                    autoCapitalize="none"
                                />
                                <Pressable style={[styles.formButton, {marginTop: 50}]} onPress={() => createEmployee(name, rg, cpf, role, contract_start, contract_start) }>
                                    
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
    )
}