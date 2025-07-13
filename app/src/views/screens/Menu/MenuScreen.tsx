// app/cardapio.tsx

import { useLocalSearchParams } from 'expo-router'; // NOVO: para pegar parâmetros
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { ProductController } from '../../../controllers/ProductController';
import { Product } from '../../../models/Product';

export default function CardapioListScreen() {
  // NOVO: Pegando o restaurantId com o hook do Expo Router
  const params = useLocalSearchParams<{ restaurantId: string }>();
  const restaurantId = params.restaurantId ?? 'mock-restaurant-id'; // Mantém o mock como fallback

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // O useEffect e o resto do componente continuam perfeitos!
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await ProductController.getByRestaurant(restaurantId);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (restaurantId) {
      loadProducts();
    }
  }, [restaurantId]); 

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <Text style={styles.itemPrice}>
        {`R$ ${item.price.toFixed(2).replace('.', ',')}`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Nenhum produto encontrado.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginBottom: 12,
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 12,
  },
});