import React from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/src/styles/dashboard_styles";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      <Pressable onPress={() => router.push("/dashboard/projects")}>
        <Image source={require("../../assets/images/home_icon.png")} style={styles.icon} />
      </Pressable>
      <Pressable onPress={() => router.push("/dashboard/notifications")}>
        <Image source={require("../../assets/images/bell_icon.png")} style={styles.icon} />
      </Pressable>
      <Pressable onPress={() => router.push("/dashboard/new_project")}>
        <Image source={require("../../assets/images/add_icon.png")} style={styles.icon} />
      </Pressable>
      <Pressable onPress={() => router.push("/dashboard/user")}>
        <Image source={require("../../assets/images/user_icon.png")} style={styles.icon} />
      </Pressable>
    </View>
  );
}
