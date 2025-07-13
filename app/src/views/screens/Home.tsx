// app/menu.tsx

import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthController } from "../../controllers/AuthController";
import { RestaurantController } from "../../controllers/RestaurantController";
import { Restaurante } from "../../models/Restaurante";
import { HomeScreenProps } from "./types";

// ALTERADO: para export default
export default function HomeScreen({ navigation } : HomeScreenProps) {

  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurante[]>([]);

  useEffect(() => {
    const verificarUsuario = async () => {
      const user = await AuthController.getCurrentUser()
      if (user && user.type === "admin") {
        setIsAdmin(true)
      }
    }

    const searchRestaurants = async () => {
      const restaurants = await RestaurantController.searchRestaurants();
      setRestaurants(restaurants);
    }

    verificarUsuario()
    searchRestaurants();
  }, [])

  // Função para simular a escolha de um restaurante e ir para o cardápio dele
  const openCardapio = (restaurantId: string) => {
    navigation.navigate("Menu", { restaurantId });
  };

  const openCadastroRestaurante = () => {
    navigation.navigate("Restaurant"); // Navegando para a tela de cadastro de restaurante
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Tela de Menu Principal</Text>
      <Text style={{ marginBottom: 10 }}>Aqui você listaria os restaurantes.</Text>

      <View style={{ width: '80%', marginBottom: 20 }}>
        <Text style={{ marginBottom: 5 }}>Selecione um restaurante:</Text>
        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
          {restaurants.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              onPress={() => setSelectedRestaurant(restaurant.id)}
              style={{
                padding: 12,
                backgroundColor: selectedRestaurant === restaurant.id ? '#e0e0e0' : 'white',
              }}
            >
              <Text>{restaurant.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <TouchableOpacity 
        onPress={() => openCardapio(selectedRestaurant ?? '')}
        style={{ backgroundColor: 'green', padding: 15, borderRadius: 5 }}
        disabled={!selectedRestaurant}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Ver Cardápio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Product", { restaurantId: selectedRestaurant ?? '' })}
        style={{ backgroundColor: 'blue', padding: 15, borderRadius: 5, marginTop: 20 }}
        disabled={!selectedRestaurant}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>📋 Ir para o Cadastro de Prato</Text>
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