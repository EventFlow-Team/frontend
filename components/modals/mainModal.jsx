import { KeyboardAvoidingView, Modal as RNModal, View, StyleSheet } from "react-native";

export default function MainModal({ isOpen, withInput, children, ...rest }) {
    const content = withInput ? (
        <KeyboardAvoidingView style={styles.modal} behavior="padding">{children}</KeyboardAvoidingView>
    ) : (
        <View style={styles.modal}>{children}</View>
    );

    return (
        <RNModal
            visible={isOpen}
            transparent
            animationType="fade"
            statusBarTranslucent
            {...rest}
        >
            {content}
        </RNModal>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.22)",
    },
});
