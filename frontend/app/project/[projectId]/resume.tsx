import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, View, Text } from "react-native";

export default function ProjectResume() {
    const router = useRouter();
    const { projectId } = useLocalSearchParams();

    return (
        <View style={{
            alignItems: "center",
            flex: 1
        }}>
            <Pressable style={{
                display: "flex",
                backgroundColor: "#009CCC",
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 10
            }}
                onPress={() => router.push(`/project/${projectId}/view_employees`)}>
                <Text style={{ color: "white" }}>+ Funcionários</Text>
            </Pressable>
            <Link href={"/dashboard/projects"}>voltar</Link>
        </View>
    );
}
