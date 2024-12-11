import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, TextInput, View, Text } from "react-native";
import { styles } from '../src/styles';
import apiClient from "@/src/api/ApiClient";
import React from "react";

export default function RootLayout() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function UserLogin(email: string, password: string) {
    apiClient.user.loginUserLoginPost({
      username: email,
      password: password,
    })};
    

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.formTitle}>Login no Sistema</Text>
        <TextInput
          style={styles.formInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Informe o E-Mail"
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
        <Pressable style={styles.formButton} onPress={() => UserLogin(email, password)}>
          <Text style={styles.textButton}>Logar</Text>
        </Pressable>
        <View style={styles.subContainer}>
          <Pressable style={styles.subButton}>
            <Text style={styles.subTextButton}>Esqueci a senha</Text>
          </Pressable>
          <Link href="/new-user" style={styles.subButton}>
            <Text style={styles.subTextButton}>Novo usuário</Text>
          </Link>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
