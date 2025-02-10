import React, { act } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, FlatList, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { projects_styles } from "@/src/styles/dashboard_styles";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import apiClient from "@/src/api/ApiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { new_project_styles } from "@/src/styles/dashboard_styles";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { report } from "@/src/styles/dashboard_styles";
import { LocaleConfig, Calendar } from "react-native-calendars"
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

export default function Relatorio() {
  const today = new Date();
  const item = useLocalSearchParams();
  const work_id = item?.id ? (Array.isArray(item.id) ? item.id[0] : item.id) : '';
  const [manhã, setManhã] = useState("");
  const [tarde, setTarde] = useState("");
  const [noite, setNoite] = useState("");
  const [observations, setObservations] = useState("");
  const [photos, setPhotos] = useState([]);
  const [reportId, setReportId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { projectId } = useLocalSearchParams();

  LocaleConfig.locales['br'] = {
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março',
      'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro',
      'Outubro', 'Novembro', 'Dezembro',
    ],
    monthNamesShort: [
      'Jan', 'Fev', 'Mar',
      'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set',
      'Out', 'Nov', 'Dez',
    ],
    dayNames: [
      'Domingo', 'Segunda', 'Terça',
      'Quarta', 'Quinta', 'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje',
  };
  LocaleConfig.defaultLocale = 'br';
  months = [
    'Janeiro', 'Fevereiro', 'Março',
    'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro',
    'Outubro', 'Novembro', 'Dezembro',
  ],
    month_index = today.getMonth();
  const [currentMonth, setCurrentMonth] = useState(months[month_index]);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  //const today = new Date();
  //setCurrentMonth(today.getMonth()+1);
  //setCurrentYear(today.getFullYear());

  const handleAddPhoto = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });

      if (!result.didCancel) {
        setPhotos([...photos, { uri: result.assets[0].uri }]);
      }
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  const handleSubmitReport = async () => {
    if (!work_id) {
      Alert.alert('Erro', 'ID do trabalho não encontrado');
      return;
    }

    if (!observations.trim()) {
      Alert.alert('Aviso', 'Por favor, adicione observações ao relatório');
      return;
    }

    setIsLoading(true);
    const reportId = await newReport(work_id, photos, observations, manhã, tarde, noite);
    setIsLoading(false);

    if (reportId) {
      Alert.alert('Sucesso', 'Relatório gerado com sucesso!');
      setReportId(reportId); // Armazena o reportId
      router.push("/dashboard/projects");
    } else {
      Alert.alert('Erro', 'Houve um erro ao gerar o relatório.');
    }
  };

  async function newReport(work_id: string, photos: Array<string>, observations: string, manhã: string, tarde: string, noite: string) {
    try {
      const activities = [manhã, tarde, noite].filter(activity => activity.trim() !== '');
      const token = await AsyncStorage.getItem("authToken");
      const photoUrls = photos.map(photo => photo.uri);

      const reportData = {
        work_id: projectId,
        photos: photoUrls,
        observations,
        activities: activities
      };

      const response = await apiClient.report.addReportReportPost(
        reportData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response && response.status === 200) {
        const reportId = response.data.id;
        return reportId;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao enviar relatório:', error);
      Alert.alert(
        'Erro',
        'Houve um erro ao gerar o relatório. Por favor, tente novamente.'
      );
      return null;
    }
  }

  return (
    <ScrollView style={report.container}>

      <View style={[report.section, report.whiteBackground]}>
        <Text style={[projects_styles.header, { color: '#001bcc', textAlign: 'left', fontSize: 18 }, { marginTop: 30 }]}>Fotos</Text>

        <ScrollView
          contentContainerStyle={[report.photoList, { marginTop: 15 }]}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity style={report.addButton} onPress={handleAddPhoto}>
            <Text style={report.addText}>+</Text>
          </TouchableOpacity>
          {photos.map((photo, index) => (
            <View key={index} style={report.photoContainer}>
              <Image source={{ uri: photo.uri }} style={report.photo} />
            </View>
          ))}
        </ScrollView>
        <TextInput
          style={[new_project_styles.input, { height: 200 }, { textAlignVertical: 'top', textAlign: 'left' }, { marginTop: 40 }]}
          placeholder="Anotações gerais:"
          multiline={true}
          value={observations}
          onChangeText={setObservations}
        />
        <Text style={[projects_styles.header, { color: '#001bcc', textAlign: 'left', fontSize: 18 }, { marginTop: 30 }]}>Atividades</Text>
        <TextInput
          style={[new_project_styles.input, { marginTop: 30 }]}
          placeholder="Manhã:"
          value={manhã}
          onChangeText={setManhã}
        />
        <TextInput
          style={new_project_styles.input}
          placeholder="Tarde:"
          value={tarde}
          onChangeText={setTarde}
        />
        <TextInput style={new_project_styles.input} placeholder="Noite:" value={noite} onChangeText={setNoite} />
      </View>
      <Pressable onPress={() => {
        console.log("Botão pressionado!");
        newReport(work_id, photos, observations, manhã, tarde, noite);
        router.push(`/project/${projectId}/resume`);
      }} disabled={isLoading} style={({ pressed }) => [report.button, { backgroundColor: isLoading ? '#cccccc' : pressed ? '#e5a730' : '#fdb834', opacity: isLoading ? 0.7 : 1 }]} >
        <Text style={[report.label, { color: '#000000', textAlign: 'center', fontSize: 18 }]}>
          {isLoading ? 'Gerando Relatório...' : 'Gerar Relatório'}
        </Text>
      </Pressable>
    </ScrollView>);
};