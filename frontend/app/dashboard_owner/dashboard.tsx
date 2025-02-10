import React from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/src/styles/dashboard_styles";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      <Pressable onPress={() => router.push("/dashboard_owner/projects")}>
        <Image source={require("../../assets/images/home_icon.png")} style={styles.icon} />
      </Pressable>
      <Pressable onPress={() => router.push("/dashboard_owner/arquivated_projects")}>
        <Image source={require("../../assets/images/pasta_icon.png")} style={styles.icon} />
      </Pressable>
      <Pressable onPress={() => router.push("/dashboard_owner/new_project")}>
        <Image source={require("../../assets/images/add_icon.png")} style={styles.icon} />
      </Pressable>
      <Pressable onPress={() => router.push("/dashboard_owner/user")}>
        <Image source={require("../../assets/images/user_icon.png")} style={styles.icon} />
      </Pressable>
    </View>
  );
}
