import { styles } from "@/src/styles/employee_styles";
import { View, ImageBackground, Text, Pressable, Alert  } from "react-native";
import UserSVG from "@/assets/svg/user-plus.svg";
import SearchSVG from "@/assets/svg/search.svg";
import EditSVG from "@/assets/svg/resume-edit.svg";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { employee_styles } from "@/src/styles/employee_styles";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/src/api/ApiClient";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import ArrowSVG from "@/assets/svg/chevron-left.svg";
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';


interface ReportData {
    id: string;
    photos: [string];
    observations: string;
    activities: [string];
    created_at: any;
}

async function downloadCSV(reportId: string) {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      Alert.alert('Erro', 'Token de autenticação não encontrado.');
      return;
    }

    const csvResponse = await apiClient.report.getCsvReportIdCsvGet(
      reportId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Configura o responseType como 'blob'
      }
    );

    if (Platform.OS === 'web') {
      // Abordagem para web
      const blob = new Blob([csvResponse.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${reportId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      Alert.alert('Sucesso', 'Relatório gerado e CSV baixado com sucesso!', [{ text: 'OK' }]);
    } else {
      // Abordagem para dispositivos móveis
      const downloadDir = FileSystem.documentDirectory + 'downloads/';
      const dirInfo = await FileSystem.getInfoAsync(downloadDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(downloadDir, { intermediates: true });
      }

      const filename = `report_${reportId}_${new Date().getTime()}.csv`;
      const fileUri = downloadDir + filename;

      await FileSystem.writeAsStringAsync(fileUri, csvResponse.data, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      Alert.alert('Sucesso', 'Relatório gerado e CSV baixado com sucesso!\nArquivo salvo em: ' + fileUri, [{ text: 'OK' }]);
    }
  } catch (error) {
    console.error('Erro ao baixar CSV:', error);
    Alert.alert('Erro', 'Ocorreu um erro ao baixar o CSV.', [{ text: 'OK' }]);
  }
}
async function downloadPDF(reportId: string) {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      Alert.alert('Erro', 'Token de autenticação não encontrado.');
      return;
    }

    // URL correta para a API
    const apiUrl = `http://localhost:8001/report/${reportId}/pdf`;
    console.log('URL da requisição:', apiUrl);

    const pdfResponse = await fetch(
      apiUrl,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/pdf',
        },
      }
    );

    // Log detalhado da resposta
    console.log('Status da resposta:', pdfResponse.status);
    const contentType = pdfResponse.headers.get('content-type');
    console.log('Content-Type da resposta:', contentType);

    if (!pdfResponse.ok) {
      const errorBody = await pdfResponse.text();
      console.error('Corpo da resposta de erro:', errorBody);
      throw new Error(`Erro na requisição: ${pdfResponse.status} - ${pdfResponse.statusText}`);
    }

    const pdfBlob = await pdfResponse.blob();
    console.log('Tamanho do PDF recebido:', pdfBlob.size, 'bytes');

    if (pdfBlob.size === 0) {
      throw new Error('PDF recebido está vazio');
    }

    if (Platform.OS === 'web') {
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      Alert.alert('Sucesso', 'Relatório PDF gerado e baixado com sucesso!', [{ text: 'OK' }]);
    } else {
      const downloadDir = FileSystem.documentDirectory + 'downloads/';
      const dirInfo = await FileSystem.getInfoAsync(downloadDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(downloadDir, { intermediates: true });
      }

      const filename = `report_${reportId}_${new Date().getTime()}.pdf`;
      const fileUri = downloadDir + filename;

      // Converter Blob para Base64
      const blobData = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(pdfBlob);
      });

      const base64Data = String(blobData).split(',')[1];
      
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      console.log('Arquivo criado:', fileInfo);

      Alert.alert(
        'Sucesso', 
        'Relatório PDF gerado e baixado com sucesso!\nArquivo salvo em: ' + fileUri, 
        [{ 
          text: 'Abrir PDF', 
          onPress: async () => {
            try {
              const contentUri = await FileSystem.getContentUriAsync(fileUri);
              if (contentUri) {
                await Linking.openURL(contentUri);
              }
            } catch (error) {
              console.error('Erro ao abrir PDF:', error);
              Alert.alert('Erro', 'Não foi possível abrir o PDF.');
            }
          }
        }]
      );
    }
  } catch (error) {
    console.error('Erro completo:', error);
    console.error('Stack trace:', error.stack);
    Alert.alert(
      'Erro', 
      `Ocorreu um erro ao baixar o PDF: ${error.message}`, 
      [{ text: 'OK' }]
    );
  }
}
export default function Viewreports() {
  const router = useRouter();
  const { projectId } = useLocalSearchParams();
  
    const [reports, setReports] = useState<ReportData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    
    async function getReports() {
      const token = await AsyncStorage.getItem("authToken");
        if (token) {
          apiClient.work
          .getReportsWorkIdReportsGet(String(projectId), {
            headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                  if (response && response.status === 200) {
                    const fetchedReport = response.data;
                    setReports(fetchedReport.map((report: any) => ({
                      id: report.id,
                      photos: report.photos,
                      observations: report.observations,
                            activities: report.activities,
                            created_at: report.created_at
                          })));
                        }
                      })
                      .catch((error) => console.error("Erro ao buscar relatórios:", error));
                    }
    }
    
    useEffect(() => {
        getReports();
      }, []);
      
      const filteredReports = reports.filter((report) =>
        report.created_at.includes(searchQuery)
    );

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}></ImageBackground>
            <Link href={`/project/${projectId}/resume`} style={styles.subButton}>
                <ArrowSVG width={51} height={51} fill="#fff"></ArrowSVG>
            </Link>
            <View style={[styles.employeeContainer]}>
                <View style={styles.textIconContainer}>
                    <View>
                        <Text style={styles.textTitle}>Relatórios</Text>
                        <Text style={styles.textSubtitle}>{new Date().toLocaleDateString("pt-BR")}</Text>
                    </View>
                    <Pressable style={styles.subButton} onPress={() => {
                      router.push(`/project/${projectId}/new_report`)
                    }}>
                        <UserSVG />
                    </Pressable>
                </View>
                <View style={styles.inputContainer}>
                    <SearchSVG />
                    <TextInput
                        style={styles.textSearch}
                        placeholder="Pesquisar Relatório"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        />
                </View>
                <ScrollView style={{ width: '100%' }}>
                    <View style={{
                      width: '100%',
                      alignItems: "center",
                      minHeight: '100%'
                    }}>
                        {filteredReports.map((report) => (
                          <View key={report.id} style={employee_styles.employeeBox}>
                                <View style={{
                                  flexDirection: 'row',
                                  alignItems: "center",
                                  gap: 15,
                                }}>
                                    <View>
                                        <Text style={employee_styles.employeeName}>{report.created_at}</Text>
                                        <Pressable onPress={() => downloadCSV(report.id)}>
                                            <Text style={employee_styles.employeeRole}>Baixar CSV</Text>
                                        </Pressable>
                                        <Pressable onPress={() => downloadPDF(report.id)}>
                                            <Text style={employee_styles.employeeRole}>Baixar PDF</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <Pressable onPress={() => deleteReport(report.id)}>
                                  <EditSVG />
                                </Pressable>
                                
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View >
    );
}