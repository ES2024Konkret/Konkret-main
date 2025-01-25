import { styles } from "@/src/styles/employee_styles";
import { View, ImageBackground, Text } from "react-native";
import SearchSVG from "@/assets/svg/search.svg";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { employee_styles } from "@/src/styles/employee_styles";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/src/api/ApiClient";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import ArrowSVG from "@/assets/svg/chevron-left.svg"
import PlusSVG from "@/assets/svg/plus.svg"
import { Checkbox } from "react-native-paper";

interface EmployeeData {
    id: string;
    name: string;
    role: string;
    contract_start: Date;
    contract_end: Date;
    checked: boolean;
}

export default function ViewEmployees() {
    const { projectId } = useLocalSearchParams();

    const [employees, setEmployees] = useState<EmployeeData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    async function getEmployees() {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
            apiClient.employee
                .getallEmployeesEmployeeGet({
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response && response.status === 200) {
                        const fetchedEmployee = response.data;
                        setEmployees(fetchedEmployee.map((employee: any) => ({
                            id: employee.id,
                            name: employee.name,
                            role: employee.role,
                            contract_start: new Date(employee.contract_start),
                            contract_end: new Date(employee.contract_end),
                            checked: false, // Adiciona um estado 'checked' inicial para cada funcionário
                        })));
                    }
                })
                .catch((error) => console.error("Erro ao buscar funcionários:", error));
        }
    }

    useEffect(() => {
        getEmployees();
    }, []);

    const handleCheckboxToggle = (id: string) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
                employee.id === id ? { ...employee, checked: !employee.checked } : employee
            )
        );
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}></ImageBackground>
            <Link style={styles.subButton} href={`/employee_management/${projectId}/view_employees`}>
                <ArrowSVG width={51} height={51} fill="#fff" />
            </Link>
            <View style={[styles.employeeContainer]}>
                <View style={styles.textIconContainer}>
                    <View>
                        <Text style={styles.textTitle}>Seus Funcionários</Text>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <SearchSVG />
                    <TextInput
                        style={styles.textSearch}
                        placeholder="Pesquisar Funcionário"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <ScrollView style={{ width: '100%' }}>
                    <View style={{
                        width: '100%',
                        alignItems: "center"
                    }}>
                        <Link href={`/employee_management/new_employee?projectId=${projectId}`} style={[employee_styles.employeeBox, {
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingTop: 5,
                            paddingBottom: 5
                        }]}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: "center",
                                gap: 15,
                            }}>
                                <View style={[employee_styles.roundImage]}>
                                    <PlusSVG></PlusSVG>
                                </View>
                                <Text style={[employee_styles.employeeName, { color: 'black' }]}>CADASTRAR NOVO</Text>
                            </View>
                        </Link>
                        {filteredEmployees.map((employee) => (
                            <View key={employee.id} style={employee_styles.employeeBox}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    gap: 15,
                                }}>
                                    <View style={[employee_styles.roundImage, { backgroundColor: 'grey' }]}></View>
                                    <View>
                                        <Text style={employee_styles.employeeName}>{employee.name}</Text>
                                        <Text style={employee_styles.employeeRole}>{
                                            employee.contract_start.toLocaleDateString('pt-BR')}-{employee.contract_end.toLocaleDateString('pt-BR')}
                                        </Text>
                                    </View>
                                </View>
                                <Checkbox
                                    status={employee.checked ? "checked" : "unchecked"}
                                    onPress={() => handleCheckboxToggle(employee.id)}
                                    color="blue"
                                    uncheckedColor="gray"
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

