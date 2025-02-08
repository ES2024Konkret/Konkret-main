import React from "react";
import { View, Text } from "react-native";
import { arquivated_projects_styles } from "@/src/styles/dashboard_styles";

export default function Projects() {
    return (
      <View style={arquivated_projects_styles.container}>
        <Text style={arquivated_projects_styles.header}>Projetos Arquivados:</Text>
      </View>
    );
}

