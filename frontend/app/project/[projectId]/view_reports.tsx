import { styles } from "@/src/styles/employee_styles";
import { View, ImageBackground, Text, Pressable, Alert } from "react-native";
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
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    try {
      // Download CSV usando o mesmo padrão do apiClient
      
      const csvResponse = await apiClient.report.getCsvReportIdCsvGet(
        reportId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          }
        ).then((csvResponse) => csvResponse.blob());

        if (Platform.OS === 'web') {
          // Abordagem para web
          const url = window.URL.createObjectURL(csvResponse);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `report_${reportId}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          Alert.alert(
            'Sucesso',
            'Relatório gerado e CSV baixado com sucesso!',
            [{ text: 'OK' }]
          );
        } else {
          // Abordagem para dispositivos móveis
          const downloadDir = FileSystem.documentDirectory + 'downloads/';
          const dirInfo = await FileSystem.getInfoAsync(downloadDir);
          if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(downloadDir, { intermediates: true });
          }

          const filename = `report_${reportId}_${new Date().getTime()}.csv`;
          const fileUri = downloadDir + filename;

          // Converter o blob para um formato que o FileSystem possa salvar
          const reader = new FileReader();
          reader.onload = async () => {
            try {
              await FileSystem.writeAsStringAsync(fileUri, reader.result, {
                encoding: FileSystem.EncodingType.UTF8,
              });
              
              Alert.alert(
                'Sucesso',
                'Relatório gerado e CSV baixado com sucesso!\nArquivo salvo em: ' + fileUri,
                [{ text: 'OK' }]
              );
            } catch (error) {
              console.error('Erro ao salvar arquivo:', error);
              Alert.alert(
                'Erro',
                'Ocorreu um erro ao salvar o arquivo CSV.',
                [{ text: 'OK' }]
              );
            }
          };
        }
      } catch (csvError) {
        console.error('Erro ao baixar CSV:', csvError);
        Alert.alert(
          'Aviso',
          'Relatório gerado com sucesso, mas não foi possível baixar o CSV.',
          [{ text: 'OK' }]
        );
      }
    }
}

async function downloadPDF() {
  try {
    const token = await AsyncStorage.getItem("authToken");
    const response = await apiClient.reportsDownload.getReportPDF({
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob", // <- Isso é importante!
    });

    if (!response || response.status !== 200) {
      console.error("Erro ao baixar PDF: Status inesperado", response?.status);
      return;
    }

    // Confirma que response.data é um Blob
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });

    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erro ao baixar PDF:", error);
  }
}

async function deleteReport(reportId: string) {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    apiClient.report.deleteReportReportIdDelete(reportId, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      if (response && response.status === 200) {
        Alert.alert(
          'Sucesso',
          'Relatório deletado com sucesso!',
          [{ text: 'OK' }]
        );
        window.location.reload();
      }
    }).catch((error) => {
      console.error('Erro ao deletar relatório:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao deletar o relatório.',
        [{ text: 'OK' }]
      );
    })
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
