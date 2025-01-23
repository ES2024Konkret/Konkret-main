import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

export default function Relatorio() {
  // Exemplo de dados fictícios para exibir no relatório
  const projectDetails = {
    name: "Construção Residencial",
    startDate: "2025-01-15",
    endDate: "2025-06-30",
    status: "Em andamento",
    zipCode: "12345-678",
    state: "São Paulo",
    neighborhood: "Centro",
    publicPlace: "Rua Exemplo, 123",
    description:
      "Este projeto envolve a construção de um condomínio residencial de alto padrão, com infraestrutura completa, incluindo piscina, academia e salão de festas.",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Relatório do Projeto</Text>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Nome do Projeto:</Text>
        <Text style={styles.value}>{projectDetails.name}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Data de Início:</Text>
        <Text style={styles.value}>{projectDetails.startDate}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Data de Término:</Text>
        <Text style={styles.value}>{projectDetails.endDate}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, styles.status]}>{projectDetails.status}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>CEP:</Text>
        <Text style={styles.value}>{projectDetails.zipCode}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{projectDetails.state}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Bairro:</Text>
        <Text style={styles.value}>{projectDetails.neighborhood}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Logradouro:</Text>
        <Text style={styles.value}>{projectDetails.publicPlace}</Text>
      </View>

      <View style={styles.descriptionBox}>
        <Text style={styles.label}>Descrição do Projeto:</Text>
        <Text style={styles.value}>{projectDetails.description}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => alert("Voltando ao dashboard...")}>
        <Text style={styles.buttonText}>Voltar ao Dashboard</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  detailBox: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  status: {
    color: "#007bff",
    fontWeight: "bold",
  },
  descriptionBox: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
