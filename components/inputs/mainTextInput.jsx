import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { globalColors } from '../../styles/globalStyles';
import { TextInputMask } from 'react-native-masked-text';
import { TextInput } from 'react-native';

export default function MainTextInput({ 
  placeholder, 
  placeholderTextColor = "#000", 
  value, 
  onChange, 
  hideText = false, 
  keyboardType = "default", 
  maskType, 
  maskOptions = {} 
}) {
  const [hide, setHide] = useState(true);

  return (
    <View style={styles.inputarea}>
      {maskType ? (
        <TextInputMask
          type={maskType} 
          options={maskOptions} 
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType} 
        />
      ) : (
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChange}
          secureTextEntry={hideText ? hide : false}
          keyboardType={keyboardType}
        />
      )}

      {hideText && (
        <TouchableOpacity onPress={() => setHide(!hide)}>
          <Feather name={hide ? "eye-off" : "eye"} size={24} color="#593C9D" />
        </TouchableOpacity>
      )}
    </View>
  );
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
});
