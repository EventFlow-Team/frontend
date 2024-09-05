import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const globalColors = {
    main: "#0766CF",
    secundary: "#FF9500",
    darkBlue: "#007BFF",
}

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingBottom: 20,
    },
    roundedInput: {
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 100,
        borderColor: "rgba(0, 0, 0, 0.37)",
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: "800"
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: globalColors.main,
        textShadowColor: 'rgba(92, 99, 255, 0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4
    },
    bannerText: {
        fontSize: 14,
        textAlign: "justify",
        fontWeight: "400",
        lineHeight: 20
    },
    button: {
        backgroundColor: globalColors.main,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff"
    },
    authContent: {
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    backgroundLogo: {
        width: "100%",
        height: width * 0.7,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: globalColors.main,
    },
    signupText: {
        fontSize: 16,
        color: globalColors.main,
    },
    footerText: {
        fontSize: 14,
        color: globalColors.main,
        marginBottom: 10,
    },
})