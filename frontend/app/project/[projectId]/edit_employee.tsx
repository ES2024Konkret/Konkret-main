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
    const [cpf, setCpf] = useState("");
    const [role, setRole] = useState("");
    const [contract_star, setContract_start] = useState("");
    const [contract_en, setContract_end] = useState("");
    useEffect(() => {
        if (employeeId) {
            getEmployeeByID();
        }
    }, [employeeId]);
    
    const stringToDate = (dateString: string): Date => {
        console.log(dateString);
        const [year, month, day] = dateString.split("-").map(Number);
        console.log(year, month, day);
        return new Date(year, month - 1, day);
      };
    

    async function getEmployeeByID() {
        const token = await AsyncStorage.getItem("authToken");
        apiClient.employee.getEmployeeEmployeeIdGet(employeeId.toString(), {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            if (response.status === 200) {
                const fetchedEmployee = response.data;
                setName(fetchedEmployee.name!);
                setRole(fetchedEmployee.role!);
                setContract_start(fetchedEmployee.contract_start!.toString());
                setContract_end(fetchedEmployee.contract_end!.toString());
            }
        }).catch(error => {
            console.error("Erro ao buscar employee:", error);
        });
    }
    
    async function editEmployee(name: string, rg: string, cpf: string, role: string, contract_start: Date, contract_end: Date) {
        const token = await AsyncStorage.getItem("authToken");
        const response1 = await apiClient.employee.getEmployeeEmployeeIdGet(employeeId.toString(), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response1.data);
        await apiClient.employee
        .updateEmployeeEmployeeIdUpdatePut(employeeId.toString(), {name, role, contract_start, contract_end}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response && response.status === 200) {
                router.push(`/project/${projectId}/add_employees`);
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    
    const handleSubmit = () => {
        if (!name || !role || !contract_star || !contract_en) {
            console.log("Por favor, preencha todos os campos!");
            return;
        }
        const start_date = stringToDate(contract_star);
        const end_date = stringToDate(contract_en);
        
        editEmployee(name, rg, cpf, role, start_date, end_date);
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
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}>
                        </TextInput>
                        <TextInput
                            style={material_styles.inputContainer}
                            placeholder="Role"
                            value={role}
                            onChangeText={(text) => setRole(text)}>
                        </TextInput>
                        <TextInput
                            style={material_styles.inputContainer}
                            placeholder="Contract start"
                            value={contract_star}
                            onChangeText={(text) => setContract_start(text)}>
                        </TextInput>
                        <TextInput
                            style={material_styles.inputContainer}
                            placeholder="Contract end"
                            value={contract_en}
                            onChangeText={(text) => setContract_end(text)}>
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
