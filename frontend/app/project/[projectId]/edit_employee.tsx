import { material_styles, styles } from "@/src/styles/employee_styles";
import { Text, ImageBackground, Pressable, View } from "react-native";
import ArrowSVG from "@/assets/svg/chevron-left.svg"
import { useLocalSearchParams, useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/src/api/ApiClient";

export default function NewEmployee() {
    const router = useRouter();
    const { projectId, employeeId } = useLocalSearchParams();

    const [name, setName] = useState("");
    const [rg, setRg] = useState("");
    const [cpf, setDescription] = useState("");
    const [role, setRole] = useState("");
    const [contract_start, setContract_start] = useState("");
    const [contract_end, setContract_end] = useState("");
/*class EmployeeSchema(BaseModel):
    name: Annotated[Optional[str], Query()]
    rg: Annotated[Optional[str], Query()]
    cpf: Annotated[Optional[str], Query()]
    role: Annotated[Optional[str], Query()]
    contract_start: Annotated[datetime, Query()]
    contract_end: Annotated[datetime, Query()]

class EmployeePublic(BaseModel):
    name: Annotated[Optional[str], Query()]
    id: Annotated[str, Query()]
    role: Annotated[Optional[str], Query()]
    contract_start: Annotated[datetime, Query()]
    contract_end: Annotated[datetime, Query()] */
    useEffect(() => {
        if (employeeId) {
            getEmployeeByID();
        }
    }, [employeeId]);

    async function getEmployeeByID() {
        const token = await AsyncStorage.getItem("authToken");
        apiClient.employee.getEmployeeEmployeeIdGet(employeeId.toString(), {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            if (response.status === 200) {
                const fetchedEmployee = response.data;
                setName(fetchedEmployee.name!);
                setRg(fetchedEmployee.rg!);
                setDescription(fetchedEmployee.description!);
                setQuantity(fetchedEmployee.quantity!.toString());
            }
        }).catch(error => {
            console.error("Erro ao buscar employee:", error);
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

    async function editEmployee(rg: string, name: string, description: string, quantity_string: number) {
        const token = await AsyncStorage.getItem("authToken");
        apiClient.employee
            .updateEmployeeEmployeeIdPut(employeeId.toString(), {
                rg,
                name,
                description,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (response && response.status === 200) {
                    router.push(`/project/${projectId}/add_employee`);
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    const handleSubmit = () => {
        if (!rg || !name || !quantity) {
            console.log("Por favor, preencha todos os campos!");
            return;
        }
        
        editEmployee(rg, name, description, quantity );
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}>
                <Pressable style={styles.subButton} onPress={() => router.push(`/project/${projectId}/view_employees`)}>
                    <ArrowSVG width={51} height={51} fill="#fff" />
                </Pressable>
                <View style={styles.employeeContainer}>
                    <View style={styles.textIconContainer}>
                        <View>
                            <Text style={styles.textTitle}>Editar</Text>
                            <Text style={styles.textSubtitle}>Employee</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: 'center', gap: 20, height: '100%' }}>
                        <TextInput
                            style={material_styles.inputContainer}
                            placeholder="Employee"
                            value={rg}
                            onChangeText={(text) => setRg(text)}>
                        </TextInput>
                        <TextInput
                            style={material_styles.inputContainer}
                            placeholder="Employee"
                            value={name}
                            onChangeText={(text) => setName(text)}>
                        </TextInput>
                        <TextInput
                            style={material_styles.inputContainer}
                            placeholder="Employee"
                            value={description}
                            onChangeText={(text) => setDescription(text)}>
                        </TextInput>
                        <TextInput
                            style={material_styles.inputContainer}
                            placeholder="Employee"
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
