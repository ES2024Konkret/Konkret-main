import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { new_project_styles } from "@/src/styles/dashboard_styles";
import apiClient from "@/src/api/ApiClient";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from 'react-native-date-picker';

export default function NewProject() {
  // Estados para armazenar os valores dos inputs
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [num, setNum] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState(""); // Corrigido o estado de fim
  
  const stringToDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day); // O mês começa do índice 0
  };

  // Função para criar um novo projeto
  async function createProject(
    name: string,
    zip_code: string,
    state: string,
    public_place: string,
    neighborhood: string,
    number_addres: number,
    start_date: Date,
    end_date: Date
  ) {
    const token = await AsyncStorage.getItem("authToken")
    apiClient.work
      .addWorkWorkPost({
        name,
        zip_code,
        state,
        neighborhood,
        public_place,
        number_addres,
        start_date,
        end_date,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        if (response && response.status === 200) {
          router.push("/dashboard/projects");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Função para enviar os dados
  const handleSubmit = () => {
    if (!nome || !cep || !estado || !rua || !bairro || !num || !dataInicio || !dataFim) {
      console.log("Por favor, preencha todos os campos!");
      return;
    }
    const start_date = stringToDate(dataInicio);
    const end_date = stringToDate(dataFim);

    createProject(
      nome,
      cep,
      estado,
      rua,
      bairro,
      Number(num), // Convertendo o número
      start_date,
      end_date
    );
  };

  return (
    <ScrollView style={new_project_styles.container}>
      <Text style={new_project_styles.title}>Novo Projeto</Text>
      <Text style={new_project_styles.subtitle}>Adicionar</Text>

      {/* Formulário */}
      <View style={new_project_styles.form}>
        <TextInput
          style={new_project_styles.input}
          placeholder="Nome:"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={new_project_styles.input}
          placeholder="Data de início"
          value={dataInicio}
          onChangeText={setDataInicio}
        />
        <TextInput
          style={new_project_styles.input}
          placeholder="Previsão de término"
          value={dataFim}
          onChangeText={setDataFim}
        />
        <TextInput
          style={new_project_styles.input}
          placeholder="Cep:"
          value={cep}
          onChangeText={setCep}
        />
        <TextInput
          style={new_project_styles.input}
          placeholder="Estado - Cidade:"
          value={estado}
          onChangeText={setEstado}
        />
        <TextInput
          style={new_project_styles.input}
          placeholder="Bairro:"
          value={bairro}
          onChangeText={setBairro}
        />
        <TextInput
          style={[new_project_styles.input, new_project_styles.halfInput]}
          placeholder="Rua/Avenida:"
          value={rua}
          onChangeText={setRua}
        />
        <TextInput
          style={[new_project_styles.input, new_project_styles.halfInput]}
          placeholder="Núm:"
          value={num}
          onChangeText={setNum}
          keyboardType="numeric" // Input numérico
        />

        {/* Botão de Adicionar */}
        <Pressable style={new_project_styles.button} onPress={handleSubmit}>
          <Text style={new_project_styles.buttonText}>Adicionar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
