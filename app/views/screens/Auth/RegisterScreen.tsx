import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { AuthController } from "../../../controllers/AuthController";

export const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"client" | "admin">("client");
  const navigation = useNavigation();

  const handleRegister = async () => {
    await AuthController.register(name, email, password, type);
    navigation.navigate("Login");
  };

  return (
    <View>
      <Text>Cadastro</Text>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={type === "client" ? "Cliente" : "Admin"}
        onPress={() => setType(type === "client" ? "admin" : "client")}
      />
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
};