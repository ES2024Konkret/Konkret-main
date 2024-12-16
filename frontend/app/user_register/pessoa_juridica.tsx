import { styles } from "../../src/styles/login_styles";
import { Link, useRouter } from "expo-router";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import React from "react";
import apiClient from "@/src/api/ApiClient";
import { UserType } from "@/src/api/Api";




export default function NewUser() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [cnpj, setCnpj] = React.useState("");
    const router = useRouter();

    function createUser(name: string, email: string, password: string, cnpj: string) {
        apiClient.user.addUserUserPost({
        name,
        email,
        password,
        cpf: "",
        user_type: UserType.PJ,
        cnpj
        }).then((response) => {
            console.log(response);
            if (response && response.status === 200){
                router.push("/")
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <View style={styles.container}>
            <View style={styles.loginBox}>
                <Text style={styles.formTitle}>Pessoa Jurídica</Text>
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
                    value={cnpj}
                    onChangeText={(text) => setCnpj(text)}
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
                <Pressable style={styles.formButton} onPress={() => createUser(name, email, password, cnpj)}>
                    <Text style={styles.textButton}>Criar conta</Text>
                </Pressable>
                <Link href="/user_register/register_options" style={styles.subButton}>
                    <Text style={styles.subTextButton}>Voltar</Text>
                </Link>
            </View>
        </View>
    )
}