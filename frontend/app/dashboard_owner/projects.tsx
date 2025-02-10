import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable , TouchableOpacity} from "react-native";
import { projects_styles } from "@/src/styles/dashboard_styles";
import apiClient from "@/src/api/ApiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";

interface ProjectData {
  id: string;
  name: string;
  start_date: string;
  zip_code?: string;
  state?: string;
  neighborhood?: string;
  public_place?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const router = useRouter(); // Hook usado aqui no nível do componente


  // Função para buscar os projetos
  async function getProjects() {
    try {
        const token = await AsyncStorage.getItem("authToken");
        const ownerId = await AsyncStorage.getItem("ownerId");
        console.log("OwnerId recuperado:", ownerId);


        if (!token) {
            throw new Error("Token não encontrado");
        }

        if (!ownerId) {
            throw new Error("OwnerId não encontrado");
        }

        console.log("Owner ID:", ownerId);

        const response = await apiClient.work.getWorksByOwnerIdWorkProprietaryOwnerIdWorksGet(ownerId, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
            const fetchedProjects = response.data;
            setProjects(fetchedProjects.map((project) => ({
                id: project.id,  // Certificando que o id está correto
                name: project.name,
                start_date: project.start_date,
                zip_code: project.zip_code || "Não informado",
                state: project.state || "Não informado",
                neighborhood: project.neighborhood || "Não informado",
                public_place: project.public_place || "Não informado",
            })));
        } else {
            console.error(`Erro ao buscar projetos: Status ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao buscar projetos:", error);
    }
}
  // UseEffect para carregar os projetos quando o componente for montado
  useEffect(() => {
    getProjects();
  }, []);

  const handleProjectPress = (project: ProjectData) => {
    router.push({
      pathname: `/project/${project.id}/resume_owner`,
      params: project, // Passando todos os dados do projeto
    });
  };


  // Renderizar cada projeto em um quadrado
  const renderProject = ({ item }: { item: ProjectData }) => {
    return (
      <Pressable
        style={styles.projectBox}
        onPress={() => handleProjectPress(item)} // Navegação com o router
      >
        <Text style={styles.projectName}>Nome: {item.name}</Text>
        <Text style={styles.projectInfo}>Data de Início: {item.start_date}</Text>
        <Text style={styles.projectInfo}>CEP: {item.zip_code}</Text>
        <Text style={styles.projectInfo}>Estado: {item.state}</Text>
        <Text style={styles.projectInfo}>Bairro: {item.neighborhood}</Text>
        <Text style={styles.projectInfo}>Logradouro: {item.public_place}</Text>
      </Pressable>
    );
  };

  return (
    <View style={projects_styles.container}>
      <Text style={projects_styles.header}>Projetos:</Text>
      <Text style={projects_styles.subHeader}>Em aberto</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}  // Usando o id do projeto como chave
        renderItem={renderProject}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

// Estilos adicionais
const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  projectBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  projectName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  projectInfo: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
});