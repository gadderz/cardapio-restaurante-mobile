// app/index.tsx

import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthController } from "../../../controllers/AuthController";
import { LoginScreenProps } from '../types';

// ALTERADO: para export default
export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const user = await AuthController.login(email, password);
    if (user) {
      // ALTERADO: navegando para a rota de menu
      // No seu _layout, a tela "MenuScreen" chama-se "menu"
      navigation.navigate("Home"); // Redireciona para a tela de menu após o login
    } else {
      alert("Credenciais inválidas!");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>Login</Text>
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 8, marginBottom: 10 }} />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 8, marginBottom: 20 }}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
        <Text style={{ textAlign: 'center', color: 'blue' }}>Não possui conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};