import React, { useState } from 'react'
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';

import { globalColors } from '../../styles/globalStyles';

export default function MainTextInput({ placeholder, placeholderTextColor = "#000", value, onChange, hideText = false }) {
  const [hide, setHide] = useState(true);

  return (
    <View style={styles.inputarea}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChange}
        secureTextEntry={hideText ? hide : false}
      />

      {hideText &&
        <TouchableOpacity onPress={() => setHide(!hide)}>
          <Feather name={hide ? "eye-off" : "eye"} size={24} color="#593C9D" />
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  inputarea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: globalColors.main,
    justifyContent: 'space-between',

  },
  textInput: {
    width: "90%",
    fontSize: 14,
  },
})