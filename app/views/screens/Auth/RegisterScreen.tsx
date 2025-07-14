import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import AuthController from "../../../controllers/AuthController";
import { RegisterScreenProps } from "../types";

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"client" | "admin">("client");

  const handleRegister = async () => {
    await AuthController.register(name, email, password, type);
    navigation.navigate("Login");
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