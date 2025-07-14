import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

// Lembre-se de corrigir os caminhos se necessário
import AuthController from '../../controllers/AuthController';
import RestaurantController from '../../controllers/RestaurantController';
import { Restaurant } from '../../models/Restaurant';
import { HomeScreenProps } from './types';


interface StyledButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const StyledButton = ({ title, onPress, style, textStyle, disabled }: StyledButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonBase,
        style,
        disabled && styles.buttonDisabled,
        // isHovered && !disabled && styles.buttonHover, // Remove hover effect for mobile
      ]}
    >
      <Text style={[styles.buttonTextBase, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};



export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const verifyUserType = async () => {
      const user = await AuthController.getCurrentUser();
      if (user && user.type === "admin") {
        setIsAdmin(true);
      }
    };

    const searchRestaurants = async () => {
      const fetchedRestaurants = await RestaurantController.getAll();
      setRestaurants(fetchedRestaurants);
       if (fetchedRestaurants.length > 0) {
        setSelectedRestaurant(fetchedRestaurants[0].id ?? null);
      }
    };

    verifyUserType();
    searchRestaurants();
  }, []); 

  const openMenu = (restaurantId: string) => {
    navigation.navigate("Menu", { restaurantId });
  };

  const openRestaurantRegistration = () => {
    navigation.navigate("Restaurant");
  };

  const openProductRegistration = (restaurantId: string) => {
    navigation.navigate("Product", { restaurantId });
  };

  const renderRestaurantItem = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => setSelectedRestaurant(item.id ?? null)}
      style={[
        styles.restaurantItem,
        selectedRestaurant === item.id && styles.restaurantItemSelected
      ]}
    >
      <Text
        style={[
          styles.restaurantItemText,
          selectedRestaurant === item.id && styles.restaurantItemSelectedText
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Menu Principal</Text>
        <Text style={styles.subtitle}>Selecione um restaurante para começar</Text>

        <FlatList
          data={restaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item.id ?? ''}
          style={styles.restaurantList}
          ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum restaurante cadastrado.</Text>}
        />

        <StyledButton
          title="Ver Cardápio"
          onPress={() => openMenu(selectedRestaurant ?? '')}
          style={styles.buttonPrimary}
          disabled={!selectedRestaurant}
        />

        {isAdmin && (
          <View style={styles.adminContainer}>
            <Text style={styles.adminTitle}>Painel do Administrador</Text>
            <StyledButton
              title="📋 Cadastrar Prato"
              onPress={() => openProductRegistration(selectedRestaurant ?? '')}
              style={styles.buttonSecondary}
              disabled={!selectedRestaurant}
            />
            <StyledButton
              title="👨‍🍳 Cadastrar Restaurante"
              onPress={openRestaurantRegistration}
              style={styles.buttonSecondary}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  restaurantList: {
    marginBottom: 24,
  },
  restaurantItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  restaurantItemSelected: {
    backgroundColor: '#2d6a4f',
    borderColor: '#2d6a4f',
  },
  restaurantItemText: {
    fontSize: 16,
    color: '#333',
  },
  restaurantItemSelectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyListText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  adminContainer: {
    marginTop: 'auto',
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonBase: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    opacity: 0.85,
    transform: [{ scale: 1 }],
    transitionDuration: '200ms',
  },
  buttonHover: {
    opacity: 1,
    transform: [{ scale: 1.03 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5.0,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#a9a9a9',
    opacity: 0.7,
  },
  buttonTextBase: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPrimary: {
    backgroundColor: '#2a9d8f',
  },
  buttonSecondary: {
    backgroundColor: '#457b9d',
  },
});