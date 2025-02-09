import React from "react";
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import Dashboard from "./dashboard";

export default function Layout() {
  return (
    <View style={styles.container}>
      {/* Conteúdo da página atual */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* Barra de navegação fixa */}
      <Dashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    flex: 1,
    marginBottom: 60, // Garante que o conteúdo não fique coberto pela barra
  },
});
