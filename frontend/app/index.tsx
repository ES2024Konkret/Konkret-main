import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, TextInput, View, Text } from "react-native";
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
      <View style={styles.loginBox}>
        <Text style={styles.formTitle}>Login no Sistema</Text>
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
          placeholder="Informe a Senha"
          autoCapitalize="none"
          secureTextEntry
        />
        <Pressable style={styles.formButton} onPress={() => login(email, password)}>
          <Text style={styles.textButton}>Logar</Text>
        </Pressable>
        <View style={styles.subContainer}>
          <Pressable style={styles.subButton}>
            <Text style={styles.subTextButton}>Esqueci a senha</Text>
          </Pressable>
          <Link href="/user_register/register_options" style={styles.subButton}>
            <Text style={styles.subTextButton}>Novo usuário</Text>
            
          </Link>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}