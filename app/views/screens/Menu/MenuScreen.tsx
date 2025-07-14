import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';


import ProductController from '../../../controllers/ProductController';
import { Product } from '../../../models/Product';
import { MenuScreenProps } from '../types';

export default function MenuScreen({ route }: MenuScreenProps) {
  const restaurantId = route.params.restaurantId;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <View>
        <Image source={{ uri: item.image }} style={styles.image} />
        <TouchableOpacity style={styles.favoriteButton}>
          <AntDesign name="heart" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.itemPrice}>{`R$ ${item.price.toFixed(2).replace('.', ',')}`}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id ?? item.name}
          numColumns={2} 
          columnWrapperStyle={styles.row}
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


// StyleSheet final com imagem destacada
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 200, 
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo branco translúcido
    padding: 7,
    borderRadius: 30,
  },
  textContainer: {
    padding: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
    height: 32, 
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
    textAlign: 'right',
  },
});