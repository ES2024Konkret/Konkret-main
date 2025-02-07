import { employee_styles, styles } from "@/src/styles/employee_styles";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Text, ImageBackground, View, TextInput, ScrollView, Pressable } from "react-native";
import ArrowSVG from "@/assets/svg/chevron-left.svg"
import SearchSVG from "@/assets/svg/search.svg";
import EditSVG from "@/assets/svg/material-edit.svg";
import PlusSVG from "@/assets/svg/plus.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/src/api/ApiClient";
import { useEffect, useState } from "react";

interface MaterialData {
    id: string;
    type: string;
    quantity: number;
}

export default function ViewMaterials() {
    const router = useRouter();
    const { projectId } = useLocalSearchParams();

    const [materials, setMaterial] = useState<MaterialData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");


    async function getMaterials() {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
            apiClient.material
                .getallMaterialsMaterialGet({
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response && response.status === 200) {
                        const fetchedMaterial = response.data;
                        setMaterial(fetchedMaterial.map((material: any) => ({
                            id: material.id,
                            type: material.type,
                            quantity: material.quantity,
                        })));
                    }
                })
                .catch((error) => console.error("Erro ao buscar meteriais:", error));
        }
    }

    useEffect(() => {
        getMaterials();
    }, []);

    const filteredMaterials = materials.filter((material) =>
        material.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}></ImageBackground>
            <Link href={`/project/${projectId}/resume`} style={styles.subButton}>
                <ArrowSVG width={51} height={51} fill="#fff"></ArrowSVG>
            </Link>
            <View style={[styles.employeeContainer]}>
                <View style={styles.textIconContainer}>
                    <View>
                        <Text style={styles.textTitle}>Materiais</Text>
                        <Text style={styles.textSubtitle}>{new Date().toLocaleDateString("pt-BR")}</Text>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <SearchSVG />
                    <TextInput
                        style={styles.textSearch}
                        placeholder="Pesquisar Material"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <ScrollView style={{ width: '100%' }}>
                    <View style={{
                        width: '100%',
                        alignItems: "center",
                        minHeight: '100%'
                    }}>
                        <Pressable style={[employee_styles.employeeBox, {
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingTop: 5,
                            paddingBottom: 5
                        }]} onPress={() => { router.push(`/project/${projectId}/new_material`) }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: "center",
                                gap: 15,
                            }}>
                                <View style={[employee_styles.roundImage]}>
                                    <PlusSVG></PlusSVG>
                                </View>
                                <Text style={[employee_styles.employeeName, { color: 'black' }]}>RECEBER MATERIAL</Text>
                            </View>
                        </Pressable>
                        {filteredMaterials.map((material) => (
                            <View key={material.id} style={employee_styles.employeeBox}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    gap: 15,
                                }}>
                                    <View>
                                        <Text style={employee_styles.employeeName}>{material.type}</Text>
                                        <Text style={employee_styles.employeeRole}>Quantidade: {material.quantity}</Text>
                                    </View>
                                </View>
                                <EditSVG />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}