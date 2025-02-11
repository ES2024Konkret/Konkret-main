import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground, Pressable, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/src/api/ApiClient";
import { useRouter } from "expo-router";
import SearchSVG from "@/assets/svg/search.svg";
import ArrowSVG from "@/assets/svg/chevron-left.svg";

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
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/defaultBackground.png')}
        resizeMode='cover'
        style={styles.background}>
      </ImageBackground>
      <Pressable style={styles.subButton} onPress={() => router.back()}>
        <ArrowSVG width={51} height={51} fill="#fff" />
      </Pressable>
      <View style={[styles.notificationContainer]}>
        <View style={styles.textIconContainer}>
          <Text style={styles.textTitle}>Notificações</Text>
        </View>
        <FlatList 
          data={filteredNotifications}
          renderItem={({ item }) => (
            <View style={styles.notificationBox}>
              <Text style={styles.notificationText}>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.notificationList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  subButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  notificationContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
  },
  textIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  textSearch: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  notificationBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationText: {
    fontSize: 16,
    color: '#000',
  },
  notificationList: {
    flex: 1,
  },
});