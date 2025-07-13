// app/register.tsx

import { useRouter } from 'expo-router'; // REMOVIDO: @react-navigation/native
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { AuthController } from "./src/controllers/AuthController";

// ALTERADO: para export default
export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"client" | "admin">("client");
  const router = useRouter(); // NOVO: usando o hook do Expo Router

  const handleRegister = async () => {
    await AuthController.register(name, email, password, type);
    // ALTERADO: navegando para a rota de login, que é a principal "/"
    router.push("/"); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>Cadastro</Text>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}/>
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}/>
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 8, marginBottom: 20 }}
      />
      <Button
        title={`Tipo: ${type === "client" ? "Cliente" : "Admin"}`}
        onPress={() => setType(type === "client" ? "admin" : "client")}
      />
      <View style={{ marginTop: 20 }}>
        <Button title="Cadastrar" onPress={handleRegister} />
      </View>
    </View>
  );
};