import { styles } from "../../src/styles/login_styles";
import { Link } from "expo-router";
import { Text, View, Image, ImageBackground, Pressable} from "react-native";

export default function NewUser(){
    return(
        <View style={styles.container}> 
            <ImageBackground
                source={require('@/assets/images/defaultBackground.png')}
                style={styles.background}
                resizeMode="cover">
            <View style={[styles.loginBox, {backgroundColor: '#11ffaa00', shadowOpacity: 0, marginTop: 100}]}>
                <Text style={styles.formSubTitle}>Criar conta como:</Text>
                <Image 
                    source={require('@/assets/images/management-amico.png')} 
                    style={{ width: 244, height: 239, marginTop: 27}} 
                />
                <Pressable href="/user_register/pessoa_fisica" style={[styles.formButton, {marginTop: 27}]}>
                    <Text style={styles.textButton}>Pessoa Física</Text>
                </Pressable>
                <Pressable href="/user_register/pessoa_juridica" style={[styles.formButton, {backgroundColor: "#FDB834", marginTop: 27}]}>
                    <Text style={styles.textButton}>Pessoa Jurídica</Text>
                </Pressable>
            </View>
            </ImageBackground>
        </View>
    )
}


// export default function NewUser() {
//     return (
//         <View style={styles.container}>
//             <View style={styles.loginBox}>
//                 <Text style={styles.formTitle}>Criar novo usuário</Text>
//                 <Link href="/user_register/pessoa_fisica" style={styles.formButton}>
//                     <Text style={styles.textButton}>Pessoa física</Text>
//                 </Link>
//                 <Link href="/user_register/pessoa_juridica" style={styles.formButton}>
//                     <Text style={styles.textButton}>Pessoa jurídica</Text>
//                 </Link>
//                 <Link href="/" style={styles.subButton}>
//                     <Text style={styles.subTextButton}>Voltar para o Login</Text>
//                 </Link>
//             </View>
//         </View>
//     )
// }