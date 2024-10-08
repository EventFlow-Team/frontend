import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';

import { globalStyles } from '../../../styles/globalStyles';
import MainButton from '../../../components/buttons/mainButton';
import MainTextInput from '../../../components/inputs/mainTextInput';

const UserRegister = () => {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = async () => {
    // Validação dos dados aqui
    if (!dateOfBirth || !mobileNumber) {
      alert('Por favor, preencha todos os campos.');
      router.navigate('/auth/user/register3');
      return; 
    }

    // Lógica para enviar os dados ao servidor
    try {
      // ...
      alert('Usuário criado com sucesso!');
      
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Ocorreu um erro. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={require('../../../assets/imgs/authBackground.png')} style={globalStyles.backgroundLogo} />

        <View style={globalStyles.authContent}>
          <View style={{ marginBottom: 40, alignItems: 'center' }}>
            <Text style={globalStyles.welcomeText}>Termine seu cadastro</Text>
            <Text style={{ color: 'gray', fontWeight: 500 }}>Preencha todos os campos</Text>
          </View>

          <MainTextInput
            placeholder="Data de nascimento"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            keyboardType="numeric" // Ajustar o tipo de teclado se necessário
          />
          <MainTextInput
            placeholder="Celular"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad" // Ajustar o tipo de teclado se necessário
          />

          <View style={{ width: '100%', marginTop: 30 }}>
            <MainButton text="Continuar" onPress={handleSubmit} border={true} />
            <TouchableOpacity onPress={() => { router.navigate("/auth/user/register3")}}/>
          </View>

          <View style={{ flexDirection: 'row', gap: 5, marginTop: 15, justifyContent: 'center' }}>
            <Text style={globalStyles.footerText}>Já possui uma conta?</Text>
            <TouchableOpacity onPress={() => router.navigate('/auth/user/login')}>
              <Text style={[globalStyles.footerText, { fontWeight: 500, textDecorationLine: 'underline' }]}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 15,
  },
});

export default UserRegister;