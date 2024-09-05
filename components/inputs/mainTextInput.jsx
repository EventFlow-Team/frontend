import { TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function MainTextInput({ placeholder, placeholderTextColor = "#000" }) {
  return (
    <TextInput 
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
    />
  )
}

const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#0766CF",
        padding: 13,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 14,
    },
})