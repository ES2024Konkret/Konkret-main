import { styles } from "@/src/styles/employee_styles";
import { View, ImageBackground, Text } from "react-native";
import UserSVG from "@/assets/svg/user-plus.svg";
import SearchSVG from "@/assets/svg/search.svg";
import EditSVG from "@/assets/svg/resume-edit.svg";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { employee_styles } from "@/src/styles/employee_styles";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/src/api/ApiClient";

interface EmployeeData {
    id: string;
    name: string;
    role: string;
}

export default function ViewEmployees() {
    const [employees, setEmployees] = useState<EmployeeData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    async function getEmployees() {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
            apiClient.employee
                .getallEmployeesEmployeeGet({ headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    if (response && response.status === 200) {
                        const fetchedEmployee = response.data;
                        setEmployees(fetchedEmployee.map((employee: any) => ({
                            id: employee.id,
                            name: employee.name,
                            role: employee.role
                        })));
                    }
                })
                .catch((error) => console.error("Erro ao buscar funcionários:", error));
        }
    }

    useEffect(() => {
        getEmployees();
    }, []);

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}></ImageBackground>
            <View style={[styles.employeeContainer]}>
                <View style={styles.textIconContainer}>
                    <View>
                        <Text style={styles.textTitle}>Funcionários</Text>
                        <Text style={styles.textSubtitle}>dd/mm/aaaa</Text>
                    </View>
                    <UserSVG />
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
                                        <Text style={employee_styles.employeeRole}>{employee.role}</Text>
                                    </View>
                                </View>
                                <EditSVG />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
