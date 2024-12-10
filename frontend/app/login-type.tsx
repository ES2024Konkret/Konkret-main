import { styles } from "@/src/styles";
import { View, Text, Image, Pressable } from "react-native";

export default function loginType(){
    return(
        <View style={styles.container}>
            <View style={{alignItems: "center"}}>
                <Text style={styles.formSubTitle}>Criar conta como:</Text>
                <Image 
                source={require('../assets/images/management-amico.png')} 
                style={{ width: 244, height: 239, marginTop: 27}} 
                />
                <Pressable style={[styles.formButton, {marginTop: 27}]}>
                    <Text style={styles.textButton}>Pessoa Física</Text>
                </Pressable>
                <Pressable style={[styles.formButton, {backgroundColor: "#FDB834", marginTop: 27}]}>
                    <Text style={styles.textButton}>Pessoa Jurídica</Text>
                </Pressable>
            </View>
        </View>
    )
}