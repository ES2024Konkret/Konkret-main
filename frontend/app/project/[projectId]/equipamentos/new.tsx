import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, ImageBackground } from "react-native";
import apiClient from "@/src/api/ApiClient";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowSVG from "@/assets/svg/chevron-left.svg"
import { styles } from "@/src/styles/login_styles"
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

export default function NewEmployee() {
    const router = useRouter();
    const { projectId } = useLocalSearchParams();


    // brand: Annotated[str, Query()] | None
    // type: Annotated[str, Query()]
    // description: Annotated[str, Query()] | None
    // quantity: Annotated[int, Query()]
    // class RentEquipmentSchema(BaseModel):
    // work_id: Annotated[str, Query()]
    // equipment_id: Annotated[str, Query()]
    // comments: Annotated[str, Query()]
    // start_time: Annotated[datetime, Query()] | None
    // end_time: Annotated[datetime, Query()]

    // Estados para armazenar os valores dos inputs
    const [brand, setBrand] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [quantity_string, setQuantity] = useState("");
    const [contractStart, setContractStart] = useState("");
    const [contractEnd, setContractEnd] = useState("");

    const stringToDateString = (dateString: string) => {
        const [day, month, year] = dateString.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        //Formatando para yyyy-mm-dd, que é o formato aceito pela API
        return date.toISOString().split('T')[0];
    };

    // Função para criar um novo funcionário
    async function createEquipment(brand: string, type: string, description: string, quantity_string: string, ) {  // Add Data
        const token = await AsyncStorage.getItem("authToken");
        let quantity = Number(quantity_string)
        apiClient.equipment.addEquipmentEquipmentPost({
                brand,
                type,
                quantity,
                description,
                //contract_start,
                // contract_end
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then((response) => {
                if (response && response.status === 200) {
                    router.push(`/project/${projectId}/equipamentos/add`);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    } 

    // Função para enviar os dados
    const handleSubmit = () => {
        if (!brand|| !type || !description || !quantity_string) { //add data
            console.log("Por favor, preencha todos os campos!");
            return;
        }

        //Converter as datas para strings no formato correto
        const start_date = stringToDateString(contractStart);
        const end_date = stringToDateString(contractEnd);

        createEquipment(brand, type, description, quantity_string); //add data
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}>
                <Link href="/dashboard/new_project" style={styles.subButton}>
                    <ArrowSVG width={51} height={51} fill="#fff"></ArrowSVG>
                </Link>
                <View style={[styles.loginBox, { width: '100%', height: '100%' }]}>
                    <View style={[styles.contentContainer, {
                        justifyContent: "flex-start",
                        alignItems: 'center',
                        width: '100%'
                    }]}>

                        <Text style={[styles.formTitle, { marginTop: 50 }]}>Adicionar Equipamento</Text>

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
                                    value={type}
                                    onChangeText={(text) => setType(text)}
                                    placeholder="Nome"
                                    autoCapitalize="words"
                                />
                                <TextInput
                                    style={styles.formInput}
                                    value={brand}
                                    onChangeText={(text) => setBrand(text)}
                                    placeholder="Empresa"
                                />

                                <TextInput
                                    style={styles.formInput}
                                    value={quantity_string}  // Garantir que seja uma string
                                    onChangeText={(text) => setQuantity(text)}
                                    placeholder="Quantidade"
                                    keyboardType="numeric"
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

                                <TextInput
                                    style={styles.formInput}
                                    value={description}
                                    onChangeText={(text) => setDescription(text)}
                                    placeholder="Descrição"
                                    keyboardType="numeric"
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
