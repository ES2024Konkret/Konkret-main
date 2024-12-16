import React from "react";
import { View, Text } from "react-native";
import { projects_styles } from "@/src/styles/dashboard_styles";

export default function Projects() {
    return (
      <View style={projects_styles.container}>
        <Text style={projects_styles.header}>Projetos:</Text>
        <Text style={projects_styles.subHeader}>Em aberto</Text>
      </View>
    );
}
