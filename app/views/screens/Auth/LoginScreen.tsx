import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthController } from "../../../controllers/AuthController";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    const user = await AuthController.login(email, password);
    if (user) {
      navigation.navigate("Home");
    } else {
      alert("Credenciais inválidas!");
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Não possui conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};