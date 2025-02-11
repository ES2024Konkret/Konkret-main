import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, ImageBackground } from "react-native";
import apiClient from "@/src/api/ApiClient";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowSVG from "@/assets/svg/chevron-left.svg"
import { styles } from "@/src/styles/login_styles" 
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

export default function RelatarEquipamentoNaObra() {
    const router = useRouter();
    const { projectId } = useLocalSearchParams();
    const { equipmentId } = useLocalSearchParams();
    const [equipment, setEquipment] = useState(null);
    const [nome, setNome] = useState("");
    useEffect(() => {
        if (equipmentId) {
            GetEquipmentByID();
        }
    }, [equipmentId]);
    async function GetEquipmentByID(){
        const token = await AsyncStorage.getItem("authToken"); 
        const resposta = await apiClient.equipment.getEquipmentEquipmentIdGet(
        equipmentId.toString(),
        { headers: { Authorization: `Bearer ${token}` } }
        ).then(resposta =>{
            setNome(resposta.data.type);
        });
        
    }
    const handleSubmit = () => {
        //if (!brand|| !type || !quantity_string || !contractStart ||!contractEnd) { 
            console.log("Por favor, preencha todos os campos!");
            return;
        //}

        //createEquipment(brand, type, description, quantity_string, String(projectId),"","", start_date, end_date); //add data
    };

    return (
                
                <View style={[{ width: '100%', height: '100%' }]}>
                    <View style={[styles.contentContainer, {
                        justifyContent: "flex-start",
                        alignItems: 'center',
                        width: '100%'
                    }]}>
                        <Link href= {`/project/${projectId}/equipamentos/add`} style={[styles.subButton, { alignSelf: 'flex-start' }]}>
                            <ArrowSVG width={51} height={51} fill="#00000"></ArrowSVG>
                        </Link>
                        
                        <Text style={[styles.textTitle, { alignSelf:'flex-start', marginLeft: 20, marginTop: 10}]}>Relatório</Text>
                        <br></br>
                            <Text style={[styles.textSubtitle, {alignSelf: 'flex-start', marginLeft: 20} ]}>
                                {nome}
                            </Text>
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
                                    style={[styles.formInput, {height: 200}]}
                                    multiline={true} // Permite múltiplas linhas
                                    textAlignVertical="top" // Alinha o texto ao topo
                                    //value={observacoes}
                                    //onChangeText={(text) => setObservacoes(text)}
                                    placeholder="Observações do Equipamento:"
                                />

                                <Pressable style={
                                    [styles.formButton, { marginTop: 50 }]} 
                                    onPress={() => handleSubmit()}>

                                    <Text style={styles.textButton}>Salvar</Text>
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
    );
}
