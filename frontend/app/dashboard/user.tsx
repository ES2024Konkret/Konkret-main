import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { user_styles } from "@/src/styles/dashboard_styles";

export default function User() {
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
            <Text style={user_styles.statsNumber}>teste</Text> {/* mudar aqui o número de projetos*/}
            <Text style={user_styles.statsLabel}>PROJETOS</Text>
          </View>
          <View style={user_styles.statsBox}>
            <Text style={user_styles.statsNumber}>teste</Text> {/* mudar aqui o número de relatórios*/}
            <Text style={user_styles.statsLabel}>RELATÓRIOS</Text>
          </View>
        </View>
      </View>

      {/* Informações do Usuário */}
      <View style={user_styles.infoContainer}>
        <Text style={user_styles.label}>Nome completo</Text> 
        <Text style={user_styles.info}>teste</Text> {/* mudar aqui o nome do user*/}

        <Text style={user_styles.label}>Número de telefone</Text>
        <Text style={user_styles.info}>teste</Text> {/* mudar aqui o número de telefone do user*/}

        <Text style={user_styles.label}>E-mail</Text>
        <Text style={user_styles.info}>teste</Text> {/* mudar aqui o email do user*/}
      </View>

      {/* Botões */}
      <View style={user_styles.buttonContainer}>
        <Pressable style={user_styles.editButton}>
          <Text style={user_styles.editButtonText}>Editar</Text>
        </Pressable>
        <Pressable style={user_styles.saveButton}>
          <Text style={user_styles.saveButtonText}>Salvar</Text>
        </Pressable>
      </View>
    </View>
  );
}
