import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground, Pressable, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/src/api/ApiClient";
import { useRouter } from "expo-router";
import SearchSVG from "@/assets/svg/search.svg";
import ArrowSVG from "@/assets/svg/chevron-left.svg";
import { notification_styles } from "@/src/styles/dashboard_styles";

export default function Notifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const response = await apiClient.reportsNotifications.getNotificationsReportsNotificationsGet({
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response && response.status === 200) {
            if (Array.isArray(response.data)) {
              setNotifications(response.data);
            } else {
              setNotifications([JSON.stringify(response.data)]);
            }
          } else {
            setNotifications([`Erro: Status inesperado ${response?.status}`]);
          }
        } else {
          setNotifications(["Erro: Token de autenticação não encontrado."]);
        }

      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setNotifications([`Erro: ${(error as Error).message || 'Erro desconhecido'}`]);
      }
    }

    fetchNotifications();
  }, []);

  // Filtra as notificações com base na pesquisa
  const filteredNotifications = notifications.filter((notification) =>
    notification.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <View style={notification_styles.header}>
        <Text style={notification_styles.textTitle}>Notificações</Text>
      </View>
      <View style={[notification_styles.notificationsContainer]}>
      </View>
      <View>
        <FlatList
          data={filteredNotifications}
          renderItem={({ item }) => (
            <View style={notification_styles.notificationBox}>
              <Text style={notification_styles.text}>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
