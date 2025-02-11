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
import EditSVG from "@/assets/svg/material-edit.svg";

interface EquipmentData {
    id: string;
    type: string;
    start_time: Date;
    end_time: Date;
    checked: boolean;
}

export default function ViewEquipments() {
    const router = useRouter();
    const { projectId } = useLocalSearchParams();

    const [equipments, setEquipments] = useState<EquipmentData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    apiClient.jobs.deleteJobJobsIdDelete

    async function getEquipments() {
        const token = await AsyncStorage.getItem("authToken");
        if (!token || !projectId) return;
    
        try {
            const response = await apiClient.equipment.getallEquipmentsEquipmentGet({
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (response.status !== 200) return;
    
            const fetchedEquipments = response.data;
    
            const rentsResponse = await apiClient.rentequipment.getallRentEquipmentsRentequipmentGet({
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (rentsResponse.status !== 200) return;
    
            const rents = rentsResponse.data;
    
            const projectRents = rents.filter((rent: any) => rent.work_id === projectId);
    
            const equipmentsWithRents = new Set(projectRents.map((rent: any) => rent.equipment_id));
            
    
            setEquipments(
                fetchedEquipments.map((equipment: any) => ({
                    id: equipment.id,
                    type: equipment.type,
                    start_time: new Date(
                        projectRents.find((rent: any) => rent.equipment_id === equipment.id)?.start_time || 0),
                    end_time: new Date(
                        projectRents.find((rent: any) => rent.equipment_id === equipment.id)?.end_time || 0),
                    checked: equipmentsWithRents.has(equipment.id), // Apenas se o funcionário estiver no Set do projectId
                }))
            );
        } catch (error) {
            console.error("Erro ao buscar equipamentos ou alugueis:", error);
        }
    }

    useEffect(() => {
        getEquipments();
    }, []);

    const handleCheckboxToggle = async (id: string) => {
        setEquipments((prevEquipments) =>
            prevEquipments.map((equipments) =>
                equipments.id === id ? { ...equipments, checked: !equipments.checked } : equipments
            )
        );
    
        const token = await AsyncStorage.getItem("authToken");
    
        try {
            const equipment = equipments.find(emp => emp.id === id);
            if (!equipment) return;
    
            if (!equipment.checked) { // Se não estava marcado, significa que agora será adicionado
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
    

    const filteredEmployees = equipments.filter((equipment) =>
        equipment.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}></ImageBackground>
            <Pressable style={styles.subButton} onPress={() => router.push(`/project/${projectId}/view_equipment`)}>
                <ArrowSVG width={51} height={51} fill="#fff" />
            </Pressable>
            <View style={[styles.employeeContainer]}>
                <View style={styles.textIconContainer}>
                    <View>
                        <Text style={styles.textTitle}>Todos Equipamentos</Text>
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
                        }]} onPress={() => {router.push(`/project/${projectId}/new_equipment`)}}>
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
                        {filteredEmployees.map((equipment) => (
                            <View key={equipment.id} style={employee_styles.employeeBox}>
                                
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    gap: 15,
                                }}>
                                     <Pressable onPress={() => {
                                            router.push({
                                            pathname: './edit_equipment',
                                            params: { equipmentId: equipment.id },
                                            });
                                            }}>
                                            <EditSVG />
                                        </Pressable>
                                    <View>
                                        
                                        <Text style={employee_styles.employeeName}>{equipment.type}</Text>
                                        <Text style={employee_styles.employeeRole}>{
                                            equipment.start_time.toLocaleDateString('pt-BR')}-{equipment.end_time.toLocaleDateString('pt-BR')}
                                        </Text>
                                    </View>
                                </View>
                                <Checkbox
                                    status={equipment.checked ? "checked" : "unchecked"}
                                    onPress={() => handleCheckboxToggle(equipment.id)}
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

