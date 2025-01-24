import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, TextInput, View, Text, ImageBackground, ViewBase } from "react-native";
import { styles } from '@/src/styles/login_styles';
import { useState} from "react";
import apiClient from "@/src/api/ApiClient";
import AsyncStorage from '@react-native-async-storage/async-storage';


async function saveToken(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Erro", error)
  }
}

export default function RootLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function login(email: string, password: string) {
    apiClient.user.loginUserLoginPost({username: email, password }).then(async (response) => {
      const data = response.data
      if (response && response.status === 200) {
        console.log('Login bem-sucedido, redirecionando...');
        const token = data.access_token;
        await saveToken("authToken", token);
        router.push("/dashboard/projects")
      }

    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/indexBackground.png')}
        resizeMode='cover'
        style={styles.background}>
        <View style={styles.contentContainer}>
          <View
            style={{ alignItems: "flex-start", justifyContent: "flex-start", width: '90%' }}
          >
            <Text
              style={[styles.formTitle, {
                color: "#2E2E2E",
                fontSize: 44,
                fontWeight: 900,
              }]}
            >
              Bem<br></br>Vindo
            </Text>
          </View>
          <View style={styles.loginBox}>
            <View style={{
              width: '90%',
              alignItems: 'center'
            }}>
              <View style={{
                width: '100%',
                alignItems: 'flex-start',
                height: '40%',
                justifyContent: 'center',
              }}>
                <Text style={[styles.formSubTitle, {
                  alignItems: 'flex-start'
                }]}>Login</Text>
              </View>
              <TextInput
                style={styles.formInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="E-Mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              <TextInput
                style={styles.formInput}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Senha"
                autoCapitalize="none"
                secureTextEntry
              />
              <View style={{
                width: '100%',
                alignItems: 'flex-end'
              }}>
                <Pressable style={styles.subButton}>
                  <Text style={styles.compText}>Esqueceu a senha?</Text>
                </Pressable>
              </View>
              <View style={{
                width: '100%',
                height: '70%',
                justifyContent: 'center'
              }}>
                <Pressable
                  style={styles.formButton}
                  onPress={() => login(email, password)}
                >
                  <Text style={styles.textButton}>Login</Text>
                </Pressable>
                <View style={{
                  width: '100%',
                  height: '30%',
                  justifyContent: 'flex-end'
                }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.compText}>Não tem uma conta? </Text>
                    <Link
                      href="/user_register/register_options"
                      style={[styles.compText, { color: "#001BCC" }]}
                    >
                      Criar conta
                    </Link>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}