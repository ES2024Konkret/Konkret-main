import { styles } from "../../src/styles/login_styles";
import { Link, useRouter } from "expo-router";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { Text, View, ImageBackground } from "react-native";
import React from "react";
import apiClient from "@/src/api/ApiClient";
import { UserType } from "@/src/api/Api";
import ArrowSVG from "@/assets/svg/chevron-left.svg"

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
            if (response && response.status === 200) {
                router.push("/")
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}>
                <Link href="/user_register/register_options" style={styles.subButton}>
                    <ArrowSVG width={51} height={51} fill="#fff"></ArrowSVG>
                </Link>
                <View style={[styles.contentContainer, {
                    justifyContent: "flex-end"
                }]}>
                    <View style={[styles.loginBox, {
                        width: '100%',
                        height: '80%',
                    }]}>
                        <Text style={styles.formTitle}>Criar Conta</Text>
                        <Text style={styles.formText}>Jurídica</Text>
                        <View style={{
                            width: '90%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                width: '100%',
                                alignItems: 'center',
                                height: '120%',
                                justifyContent: 'flex-end'
                            }}>
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
                                <View style={{
                                    width: '100%',
                                    margin: 20,
                                    alignItems: 'center'
                                }}>
                                    <Pressable style={styles.formButton} onPress={() => createUser(name, email, password, cnpj)}>
                                        <Text style={styles.textButton}>Criar conta</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground >
        </View >
    )
}