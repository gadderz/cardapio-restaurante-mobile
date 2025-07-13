// app/menu.tsx

import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// ALTERADO: para export default
export default function MenuScreen() {
  const router = useRouter();

  // Função para simular a escolha de um restaurante e ir para o cardápio dele
  const openCardapio = (restaurantId: string) => {
    router.push({
      pathname: "../cardapio", // Caminho para a tela de cardápio
      params: { restaurantId: restaurantId }, // Passando o ID mockado para a próxima tela
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
    </View>
  );
};