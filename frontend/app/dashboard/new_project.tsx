import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { new_project_styles } from "@/src/styles/dashboard_styles";

export default function NewProject() {
  // Estados para armazenar os valores dos inputs
  const [nome, setNome] = useState("");
  const [proprietario, setProprietario] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [num, setNum] = useState("");

  // Função para enviar os dados
  const handleSubmit = () => {
    const projectData = {
      nome,
      proprietario,
      dataInicio,
      dataTermino,
      cep,
      estado,
      bairro,
      rua,
      num,
    };
    console.log("Projeto registrado:", projectData);
    // Aqui você pode fazer um POST para a API ou armazenar localmente
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
          placeholder="Proprietário:"
          value={proprietario}
          onChangeText={setProprietario}
        />
        <TextInput
          style={new_project_styles.input}
          placeholder="Data de início:"
          value={dataInicio}
          onChangeText={setDataInicio}
        />
        <TextInput
          style={new_project_styles.input}
          placeholder="Previsão de término:"
          value={dataTermino}
          onChangeText={setDataTermino}
        />
        <TextInput
          style={new_project_styles.input}
          placeholder="Cep:"
          value={cep}
          onChangeText={setCep}
        />
        <TextInput
          style={new_project_styles.input}
          placeholder="Estado - Cidade"
          value={estado}
          onChangeText={setEstado}
        />
        <TextInput
          style={new_project_styles.input}
          placeholder="Bairro"
          value={bairro}
          onChangeText={setBairro}
        />
        <TextInput
          style={[new_project_styles.input, new_project_styles.halfInput]}
          placeholder="Rua/Avenida"
          value={rua}
          onChangeText={setRua}
        />
        <TextInput
          style={[new_project_styles.input, new_project_styles.halfInput]}
          placeholder="Núm:"
          value={num}
          onChangeText={setNum}
        />

        {/* Botão de Adicionar */}
        <Pressable style={new_project_styles.button} onPress={handleSubmit}>
          <Text style={new_project_styles.buttonText}>Adicionar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
