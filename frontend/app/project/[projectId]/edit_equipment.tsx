import { material_styles, styles } from "@/src/styles/employee_styles";
import { Text, ImageBackground, Pressable, View } from "react-native";
import ArrowSVG from "@/assets/svg/chevron-left.svg"
import { useLocalSearchParams, useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/src/api/ApiClient";

export default function NewEquipment() {
    const router = useRouter();
    const { projectId, equipmentId } = useLocalSearchParams();

    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        if (equipmentId) {
            getEquipmentByID();
        }
    }, [equipmentId]);

    async function getEquipmentByID() {
        const token = await AsyncStorage.getItem("authToken");
        apiClient.equipment.getEquipmentEquipmentIdGet(equipmentId.toString(), {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            if (response.status === 200) {
                const fetchedEquipment = response.data;
                setType(fetchedEquipment.type!);
                setBrand(fetchedEquipment.brand!);
                setDescription(fetchedEquipment.description!);
                setQuantity(fetchedEquipment.quantity!.toString());
            }
        }).catch(error => {
            console.error("Erro ao buscar equipment:", error);
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

    async function editEquipment(brand: string, type: string, description: string, quantity_string: number) {
        const token = await AsyncStorage.getItem("authToken");
        apiClient.equipment
            .updateEquipmentEquipmentIdPut(equipmentId.toString(), {
                brand,
                type,
                description,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (response && response.status === 200) {
                    router.push(`/project/${projectId}/add_equipment`);
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    const handleSubmit = () => {
        if (!brand || !type || !quantity) {
            console.log("Por favor, preencha todos os campos!");
            return;
        }
        
        editEquipment(brand, type, description, quantity );
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}>
                <Pressable style={styles.subButton} onPress={() => router.push(`/project/${projectId}/view_equipments`)}>
                    <ArrowSVG width={51} height={51} fill="#fff" />
                </Pressable>
                <View style={styles.employeeContainer}>
                    <View style={styles.textIconContainer}>
                        <View>
                            <Text style={styles.textTitle}>Editar</Text>
                            <Text style={styles.textSubtitle}>Equipment</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: 'center', gap: 20, height: '100%' }}>
                        <TextInput
                            style={material_styles.inputContainer}
                            placeholder="Equipment"
                            value={brand}
                            onChangeText={(text) => setBrand(text)}>
                        </TextInput>
                        <TextInput
                            style={material_styles.inputContainer}
                            placeholder="Equipment"
                            value={type}
                            onChangeText={(text) => setType(text)}>
                        </TextInput>
                        <TextInput
                            style={material_styles.inputContainer}
                            placeholder="Equipment"
                            value={description}
                            onChangeText={(text) => setDescription(text)}>
                        </TextInput>
                        <TextInput
                            style={material_styles.inputContainer}
                            placeholder="Equipment"
                            value={quantity}
                            onChangeText={(text) => setQuantity(text)}>
                        </TextInput>

                    </View>
                    <Pressable style={[material_styles.formButton]} onPress={handleSubmit}>
                        <Text style={material_styles.textButton}>Confirmar Alteração</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
}
