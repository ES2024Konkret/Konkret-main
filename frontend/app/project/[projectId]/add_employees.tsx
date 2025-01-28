import { styles } from "@/src/styles/employee_styles";
import { View, ImageBackground, Text, Pressable } from "react-native";
import SearchSVG from "@/assets/svg/search.svg";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { employee_styles } from "@/src/styles/employee_styles";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/src/api/ApiClient";
import { useLocalSearchParams, useRouter } from "expo-router";
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
    const router = useRouter();
    const { projectId } = useLocalSearchParams();

    const [employees, setEmployees] = useState<EmployeeData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    apiClient.jobs.deleteJobJobsIdDelete

    async function getEmployees() {
        const token = await AsyncStorage.getItem("authToken");
        if (!token || !projectId) return;
    
        try {
            const response = await apiClient.employee.getallEmployeesEmployeeGet({
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (response.status !== 200) return;
    
            const fetchedEmployees = response.data;
    
            const jobsResponse = await apiClient.jobs.getallJobsJobsGet({
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (jobsResponse.status !== 200) return;
    
            const jobs = jobsResponse.data;
    
            const projectJobs = jobs.filter((job: any) => job.work_id === projectId);
    
            const employeesWithJob = new Set(projectJobs.map((job: any) => job.employee_id));
    
            setEmployees(
                fetchedEmployees.map((employee: any) => ({
                    id: employee.id,
                    name: employee.name,
                    role: employee.role,
                    contract_start: new Date(employee.contract_start),
                    contract_end: new Date(employee.contract_end),
                    checked: employeesWithJob.has(employee.id), // Apenas se o funcionário estiver no Set do projectId
                }))
            );
        } catch (error) {
            console.error("Erro ao buscar funcionários ou jobs:", error);
        }
    }

    useEffect(() => {
        getEmployees();
    }, []);

    const handleCheckboxToggle = async (id: string) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
                employee.id === id ? { ...employee, checked: !employee.checked } : employee
            )
        );
    
        const token = await AsyncStorage.getItem("authToken");
    
        try {
            const employee = employees.find(emp => emp.id === id);
            if (!employee) return;
    
            if (!employee.checked) { // Se não estava marcado, significa que agora será adicionado
                await apiClient.jobs.addJobJobsPost({
                    work_id: String(projectId),
                    employee_id: id,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else { // Se estava marcado antes, precisamos encontrar o ID do job antes de deletar
                const jobsResponse = await apiClient.jobs.getallJobsJobsGet({
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                if (jobsResponse.status !== 200) return;
    
                const jobs = jobsResponse.data;
                const jobToDelete = jobs.find((job: any) => job.work_id === projectId && job.employee_id === id);
    
                if (!jobToDelete) {
                    console.error("Job não encontrado para o funcionário:", id);
                    return;
                }
    
                await apiClient.jobs.deleteJobJobsIdDelete(jobToDelete.id, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
        } catch (error) {
            console.error("Erro ao adicionar funcionário:", error);
        }
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
            <Pressable style={styles.subButton} onPress={() => router.push(`/project/${projectId}/view_employees`)}>
                <ArrowSVG width={51} height={51} fill="#fff" />
            </Pressable>
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
                        <Pressable style={[employee_styles.employeeBox, {
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingTop: 5,
                            paddingBottom: 5
                        }]} onPress={() => {router.push(`/emploey/adicionar`)}}>
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
                        </Pressable>
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

