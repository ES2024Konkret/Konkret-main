import { styles } from "@/src/styles/login_styles";
import { Link } from "expo-router";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import React from "react";
import apiClient from "@/src/api/ApiClient";
import { UserType } from "@/src/api/Api";

export default function NewUser() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpf, setCpf] = React.useState("");

  function createUser(
    name: string,
    email: string,
    cpf: string,
    password: string
  ) {
    apiClient.user.addUserUserPost({
      name: name,
      email: email,
      password: password,
      user_type: UserType.PF,
      cpf: cpf,
      cnpj: "",
    }).then((response) => {
        console.log(response);
        }).catch((error) => {
        console.log(error);
  })};
  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.formTitle}>Criar novo usuário</Text>
        <TextInput
          style={styles.formInput}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Nome"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.formInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <TextInput
          style={styles.formInput}
          value={cpf}
          onChangeText={(text) => setCpf(text)}
          placeholder="CPF"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.formInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Senha"
          autoCapitalize="none"
          secureTextEntry
        />
        <Pressable
          style={styles.formButton}
          onPress={() => createUser(name, email, cpf, password)}
        >
          <Text style={styles.textButton}>Criar conta</Text>
        </Pressable>
        <Link href="/" style={styles.subButton}>
          <Text style={styles.subTextButton}>Voltar para o Login</Text>
        </Link>
      </View>
    </View>
  );
}
