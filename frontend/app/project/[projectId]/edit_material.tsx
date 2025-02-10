import { material_styles, styles } from "@/src/styles/employee_styles";
import { Text, ImageBackground, Pressable, View } from "react-native";
import ArrowSVG from "@/assets/svg/chevron-left.svg"
import { useLocalSearchParams, useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/src/api/ApiClient";

export default function NewMaterial() {
    const router = useRouter();
    const { projectId, materialId } = useLocalSearchParams();

    const [type, setType] = useState("");
    const [cust, setCust] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        if (materialId) {
            getMaterialByID();
        }
    }, [materialId]);

    async function getMaterialByID() {
        const token = await AsyncStorage.getItem("authToken");
        apiClient.material.getMaterialMaterialIdGet(materialId.toString(), {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            if (response.status === 200) {
                const fetchedMaterial = response.data;
                setType(fetchedMaterial.type!);
                setCust(formatCurrency((parseFloat(String(fetchedMaterial.cust)) * 100).toString()));
                setQuantity(fetchedMaterial.quantity!.toString());
            }
        }).catch(error => {
            console.error("Erro ao buscar material:", error);
        });
    }

    // Função para formatar o valor 
    function formatCurrency(value: string) {
        const numericValue = value.replace(/\D/g, "");

        if (!numericValue) return "";

        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        }).format(parseFloat(numericValue) / 100); // Para lidar com centavos corretamente

        return formattedValue;
    }

    async function editMaterial(type: string, cust: number, quantity: number) {
        const token = await AsyncStorage.getItem("authToken");
        apiClient.material
            .updateMaterialMaterialIdPut(materialId.toString(), {
                type,
                cust,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (response && response.status === 200) {
                    router.push(`/project/${projectId}/view_materials`);
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    const handleSubmit = () => {
        if (!type || !cust || !quantity) {
            console.log("Por favor, preencha todos os campos!");
            return;
        }

        const numericCust = parseFloat(cust.replace(/\D/g, "")) / 100;
        editMaterial(type, numericCust, parseFloat(quantity));
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}>
                <Pressable style={styles.subButton} onPress={() => router.push(`/project/${projectId}/view_materials`)}>
                    <ArrowSVG width={51} height={51} fill="#fff" />
                </Pressable>
                <View style={styles.employeeContainer}>
                    <View style={styles.textIconContainer}>
                        <View>
                            <Text style={styles.textTitle}>Editar</Text>
                            <Text style={styles.textSubtitle}>Material</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: 'center', gap: 20, height: '100%' }}>
                        <TextInput
                            style={material_styles.inputContainer}
                            placeholder="Material"
                            value={type}
                            onChangeText={(text) => setType(text)}>
                        </TextInput>
                        <View style={{ width: '90%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Text style={material_styles.inputDescription}>Valor unitário:</Text>
                                <TextInput
                                    style={[material_styles.inputContainer]}
                                    value={cust}
                                    placeholder="R$0,00"
                                    onChangeText={(text) => setCust(formatCurrency(text))}
                                    keyboardType="numeric">
                                </TextInput>
                                <Text style={material_styles.inputDescription}>Quantidade:</Text>
                                <TextInput
                                    style={[material_styles.inputContainer, { width: '50%' }]}
                                    value={quantity}
                                    onChangeText={(text) => setQuantity(text)}
                                    keyboardType="numeric">
                                </TextInput>
                            </View>
                        </View>
                    </View>
                    <Pressable style={[material_styles.formButton]} onPress={handleSubmit}>
                        <Text style={material_styles.textButton}>Confirmar Alteração</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
}
