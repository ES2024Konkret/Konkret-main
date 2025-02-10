import { styles } from "../../src/styles/login_styles";
import { Link, useRouter } from "expo-router";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { Text, View, ImageBackground } from "react-native";
import React from "react";
import apiClient from "@/src/api/ApiClient";
import { UserType, ResponsabilityType } from "@/src/api/Api";
import ArrowSVG from "@/assets/svg/chevron-left.svg"
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function NewUser() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [responsability_type, setResponsabilityType] = React.useState<ResponsabilityType>(ResponsabilityType.Engenheiro);
    const router = useRouter();

    function createUser(name: string, email: string, password: string, cpf: string, phone: string, responsability_type: ResponsabilityType) {
        console.log("Enviando requisição para API...");
        console.log({
            name,
            email,
            phone,
            password,
            cpf,
            responsability_type,
            user_type: UserType.PF,
            cnpj: ""
        });
        apiClient.user.addUserUserPost({
            name,
            email,
            phone,
            password,
            cpf,
            responsability_type,
            user_type: UserType.PF,
            cnpj: ""
        }).then((response) => {
            console.log("Resposta da API:", response);
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
                <View style={[styles.loginBox, {width: '100%', height: '100%'}]}>
                    <View style={[styles.contentContainer, {
                        justifyContent: "flex-start",
                        alignItems: 'center',
                        width: '100%'
                    }]}>

                        <Text style={[styles.formTitle, {marginTop: 50}]}>Criar Conta</Text>
                        <Text style={styles.formText}>Física</Text>
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
                                    value={cpf}
                                    onChangeText={(text) => setCpf(text)}
                                    placeholder="CPF"
                                    autoCapitalize="none"
                                />
                                <TextInput
                                    style={styles.formInput}
                                    value={phone}
                                    onChangeText={(text) => setPhone(text)}
                                    placeholder="Telefone"
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

                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}>
                                    <Pressable style={[styles.formButton, {width: 100, marginHorizontal: 50, backgroundColor: "#fdb834", opacity: responsability_type === ResponsabilityType.Proprietario ? 1 : 0.7}]}  onPress={() => setResponsabilityType(ResponsabilityType.Proprietario)}>
                                        <Text style={styles.textButton}>Proprietario</Text>
                                    </Pressable>
                                    <Pressable style={[styles.formButton, { width: 100, marginHorizontal: 60, backgroundColor: "#009ccc", opacity: responsability_type === ResponsabilityType.Engenheiro ? 1 : 0.7 }]} onPress={() => setResponsabilityType(ResponsabilityType.Engenheiro)}>
                                        <Text style={styles.textButton}>Engenheiro</Text>
                                    </Pressable>
                                </View> 
                                <Pressable style={[styles.formButton, {marginTop: 50}]} onPress={() => createUser(name, email, password, cpf, phone, responsability_type)}>
                                    <Text style={styles.textButton}>Criar conta</Text>
                                </Pressable>

                                <View style={{
                                    width: '100%',
                                    margin: 20,
                                    alignItems: 'center'
                                }}>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </ImageBackground>
        </View>
    )
}