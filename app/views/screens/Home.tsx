import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AuthController from "../../controllers/AuthController";
import RestaurantController from "../../controllers/RestaurantController";
import { Restaurant } from "../../models/Restaurant";
import { HomeScreenProps } from "./types";

export default function HomeScreen({ navigation }: HomeScreenProps) {

  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const verifyUserType = async () => {
      const user = await AuthController.getCurrentUser()
      if (user && user.type === "admin") {
        setIsAdmin(true)
      }
    }

    const searchRestaurants = async () => {
      const restaurants = await RestaurantController.getAll();
      setRestaurants(restaurants);
    }

    verifyUserType()
    searchRestaurants();
  }, [])

  const openMenu = (restaurantId: string) => {
    navigation.navigate("Menu", { restaurantId });
  };

  const openRestaurantsScreen = () => {
    navigation.navigate("Restaurant");
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Tela de Menu Principal</Text>

      <View style={{ width: '80%', marginBottom: 20 }}>
        <Text style={{ marginBottom: 5 }}>Selecione um restaurante:</Text>
        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
          {restaurants.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              onPress={() => setSelectedRestaurant(restaurant.id ?? null)}
              style={{
                padding: 12,
                backgroundColor: selectedRestaurant === restaurant.id ? '#e0e0e0' : 'white',
              }}
            >
              <Text>{restaurant.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => openMenu(selectedRestaurant ?? '')}
        style={{ backgroundColor: 'green', padding: 15, borderRadius: 5 }}
        disabled={!selectedRestaurant}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Ver Cardápio</Text>
      </TouchableOpacity>

      {isAdmin && (
        <TouchableOpacity
          onPress={() => navigation.navigate("Product", { restaurantId: selectedRestaurant ?? '' })}
          style={{ backgroundColor: 'blue', padding: 15, borderRadius: 5, marginTop: 20 }}
          disabled={!selectedRestaurant}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>📋 Ir para o Cadastro de Prato</Text>
        </TouchableOpacity>
      )}

      {isAdmin && (
        <TouchableOpacity
          onPress={() => openRestaurantsScreen()}
          style={{
            backgroundColor: "darkblue",
            padding: 15,
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            👨‍🍳 Ir para Cadastro de Restaurante
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};