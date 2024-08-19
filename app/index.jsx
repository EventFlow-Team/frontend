import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native"

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: "700", color: "#0766CF", marginBottom: 40 }}>Event Flow</Text>
            <Link href={""} style={styles.button}>Ana</Link>
            <Link href={""} style={styles.button}>Luana</Link>
            <Link href={""} style={styles.button}>Lucas</Link>
            <Link href={""} style={styles.button}>Mateus</Link>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        gap: 10
    },
    button: {
        backgroundColor: "#0766CF",
        borderRadius: 10,
        padding: 20,
        width: "100%",
        fontWeight: "600",
        color: "#fff",
        textAlign: "center",
        fontSize: 18
    }
})