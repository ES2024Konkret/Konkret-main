import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, Share, Alert } from "react-native";
import { user_styles } from "@/src/styles/dashboard_styles";
import apiClient from "@/src/api/ApiClient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStatusBarBackgroundColor } from "expo-status-bar";

interface UserData {
  name: string;
  email: string;
  projects: string;
  reports: string;
  phone: string;
  id: string;
}

export default function User() {
  const [userData, setUserData] = useState<UserData>({
    name: "Carregando...",
    email: "Carregando...",
    projects: "0",
    reports: "0",
    phone: "no phone",
    id: "Carregando..."
  });

  async function getUser(id: string) {
    const token = await AsyncStorage.getItem("authToken");
    apiClient.user
      .getUserUserIdGet(id, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (response && response.status === 200) {
          const user = response.data;
          setUserData({
            name: user.name || "N/A",
            email: user.email || "N/A",
            projects: "0",
            reports: "0",
            phone: user.phone,
            id: user.id
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error);
      });
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `ID do Usuário: ${userData.id}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Compartilhado com o tipo de atividade:', result.activityType);
        } else {
          console.log('Compartilhado com sucesso');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartilhamento cancelado');
      }
    } catch (error) {
      Alert.alert('Erro ao compartilhar', error.message);
    }
  };

  useEffect(() => {
    const userId = "123"; // Substitua pelo ID real do usuário logado
    getUser(userId);
  }, []);

  return (
    <View style={user_styles.container}>
      {/* Cabeçalho */}
      <View style={user_styles.header}>
        <View style={user_styles.imageContainer}>
          <Image
            source={require("../../assets/images/user_icon.png")}
            style={user_styles.profileImage}
          />
        </View>
        <View style={user_styles.statsContainer}>
          <View style={user_styles.statsBox}>
            <Text style={user_styles.statsNumber}>{userData.projects}</Text>
            <Text style={user_styles.statsLabel}>PROJETOS</Text>
          </View>
          <View style={user_styles.statsBox}>
            <Text style={user_styles.statsNumber}>{userData.reports}</Text>
            <Text style={user_styles.statsLabel}>RELATÓRIOS</Text>
          </View>
        </View>
      </View>

      {/* Informações do Usuário */}
      <View style={user_styles.infoContainer}>
        <Text style={user_styles.label}>Nome completo</Text>
        <Text style={user_styles.info}>{userData.name}</Text>

        <Text style={user_styles.label}>Número de telefone</Text>
        <Text style={user_styles.info}>{userData.phone}</Text>

        <Text style={user_styles.label}>E-mail</Text>
        <Text style={user_styles.info}>{userData.email}</Text>

        <Text style={user_styles.label}>ID</Text>
        <Text style={user_styles.info}>{userData.id}</Text>

       
      </View>

      {/* Botões */}
      <View style={user_styles.buttonContainer}>
        <Pressable style={user_styles.editButton}>
          <Text style={user_styles.editButtonText}>Editar</Text>
        </Pressable>
         {/* Botão de Compartilhamento */}
         <Pressable style={user_styles.saveButton} onPress={onShare}>
          <Text style={user_styles.saveButtonText}>Compartilhar ID</Text>
        </Pressable>
        <Pressable style={user_styles.saveButton}>
          <Text style={user_styles.saveButtonText}>Salvar</Text>
        </Pressable>
      </View>
    </View>
  );
}