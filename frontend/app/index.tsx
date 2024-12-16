import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, TextInput, View, Text, ImageBackground } from "react-native";
import { styles } from '@/src/styles';
import React from "react";
import apiClient from "@/src/api/ApiClient";

export default function RootLayout() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function login(email: string, password: string) {
    apiClient.user.loginUserLoginPost({ username: email, password }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/indexBackground.png')}
        style={styles.background}
        resizeMode="cover">
        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Text style={[styles.formTitle, { color: '#2E2E2E', fontSize: 44, fontWeight: 900 }]}>Bem<br></br>Vindo</Text>
        </View>
        <View style={styles.loginBox}>
          <Text style={styles.formSubTitle}>Login</Text>
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
          <Pressable style={styles.subButton}>
            <Text style={styles.compText}>Esqueceu a senha?</Text>
          </Pressable>
          <Pressable style={styles.formButton} onPress={() => login(email, password)}>
            <Text style={styles.textButton}>Login</Text>
          </Pressable>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.compText}>Não tem uma conta? </Text>
            <Text href='/user_register/register_options' style={[styles.compText, { color: '#001BCC' }]}>Criar conta</Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}