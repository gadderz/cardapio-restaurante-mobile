// src/services/ProductService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../models/Product';

const PRODUCTS_STORAGE_KEY = '@restaurantApp:products';

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const ProductService = {
  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    const allProducts = await this.getAll();
    const newProduct: Product = {
      id: generateId(),
      ...productData,
    };
    const updatedProducts = [...allProducts, newProduct];
    await AsyncStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));
    return newProduct;
  },

  async getAll(): Promise<Product[]> {
    try {
      const storedProducts = await AsyncStorage.getItem(PRODUCTS_STORAGE_KEY);
      return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
      console.error('Erro ao buscar produtos no AsyncStorage:', error);
      return [];
    }
  },

  async getByRestaurant(restaurantId: string): Promise<Product[]> {
    try {
      const allProducts = await this.getAll();
      const filteredProducts = allProducts.filter(
        (product) => product.restaurantId === restaurantId
      );
      return filteredProducts;
    } catch (error) {
      console.error('Erro ao filtrar produtos por restaurante:', error);
      return [];
    }
  },
};