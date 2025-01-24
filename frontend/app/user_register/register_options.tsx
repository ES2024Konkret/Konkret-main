import { styles } from "../../src/styles/login_styles";
import { Link } from "expo-router";
import { Text, View, Image, ImageBackground, Pressable } from "react-native";
import ArrowSVG from "@/assets/svg/chevron-left.svg"



export default function NewUser() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                resizeMode='cover'
                style={styles.background}>
                <Link href="/" style={styles.subButton}>
                    <ArrowSVG width={51} height={51} fill="#fff"></ArrowSVG>
                </Link>
                <View style={styles.contentContainer}>
                    <View style={{
                        alignItems: "center", justifyContent: "center", width: '90%'
                    }}>
                        <View style={{
                            width: '90%',
                            alignContent: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={[styles.formSubTitle, {
                                alignItems: 'center',
                                textAlign: 'center',
                            }]}>Criar conta como:</Text>
                            <View style={{
                                margin: 30,
                                justifyContent: "center",
                                alignItems: 'center',
                            }}>
                                <Image
                                    source={require('@/assets/images/management-amico.png')}
                                    style={{ width: 244, height: 239 }}
                                />
                            </View>
                            <Link href="/user_register/pessoa_fisica">
                                <Pressable style={[styles.formButton, { marginTop: 27 }]}>
                                    <Text style={styles.textButton}>Pessoa Física</Text>
                                </Pressable>
                            </Link>
                            <Link href="/user_register/pessoa_juridica">
                                <Pressable style={[styles.formButton, { backgroundColor: "#FDB834", marginTop: 27 }]}>
                                    <Text style={styles.textButton}>Pessoa Jurídica</Text>
                                </Pressable>
                            </Link>
                        </View>
                    </View>
                </View>
            </ImageBackground >
        </View >
    )
}
