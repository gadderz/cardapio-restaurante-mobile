// app/menu.tsx

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthController } from "./src/controllers/AuthController";

// ALTERADO: para export default
export default function MenuScreen() {
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const verificarUsuario = async () => {
      const user = await AuthController.getCurrentUser()
      if (user && user.type === "admin") {
        setIsAdmin(true)
      }
    }

    verificarUsuario()
  }, [])// Simulando que o usuário é um admin.

  // Função para simular a escolha de um restaurante e ir para o cardápio dele
  const openCardapio = (restaurantId: string) => {
    router.push({
      pathname: "../cardapio", // Caminho para a tela de cardápio
      params: { restaurantId: restaurantId }, // Passando o ID mockado para a próxima tela
    });
  };

  const openCadastroRestaurante = () => {
    router.push({
      pathname: "../restaurante", // Caminho para a tela de cadastro de restaurante
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Tela de Menu Principal</Text>
      <Text style={{ marginBottom: 10 }}>Aqui você listaria os restaurantes.</Text>
      
      {/* Exemplo de como navegar para o seu cardápio de teste */}
      <TouchableOpacity 
        onPress={() => openCardapio('mock-restaurant-id')}
        style={{ backgroundColor: 'green', padding: 15, borderRadius: 5 }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Ver Cardápio de Teste</Text>
      </TouchableOpacity>

      {isAdmin && (
        <TouchableOpacity
          onPress={() => openCadastroRestaurante()}
          style={{
            backgroundColor: "darkblue",
            padding: 15,
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            👨‍🍳 Ir para Cadastro de Restaurante (Admin)
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};