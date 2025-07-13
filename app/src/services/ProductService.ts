// src/services/ProductService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../models/Product';

const PRODUCTS_STORAGE_KEY = '@restaurantApp:products';

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    name: 'Pizza de Calabresa Especial',
    description: 'Molho de tomate da casa, queijo mussarela, calabresa e azeitonas pretas.',
    price: 52.50,
    image: 'https://cdn0.tudoreceitas.com/pt/posts/9/8/3/pizza_calabresa_e_mussarela_4389_600.jpg',
    restaurantId: 'mock-restaurant-id',
  },
  {
    id: 'prod2',
    name: 'Hambúrguer Duplo Cheddar',
    description: 'Dois hambúrgueres de 150g, pão brioche, cheddar duplo e bacon crocante.',
    price: 38.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1hjwGWSge5Ocd9N9l1qlAAkbpANqAwvhh7A&s',
    restaurantId: 'mock-restaurant-id',
  },
  {
    id: 'prod3',
    name: 'Porção de Batata Frita',
    description: 'Batatas fritas crocantes com cheddar e bacon.',
    price: 25.00,
    image: 'https://www.tendaatacado.com.br/dicas/wp-content/webp-express/webp-images/uploads/2022/06/como-fazer-batata-frita-topo.jpg.webp',
    restaurantId: 'mock-restaurant-id',
  },
];

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

  // CORREÇÃO APLICADA AQUI
  async getByRestaurant(restaurantId: string): Promise<Product[]> {
    // Adiciona uma lógica para retornar os dados mockados em modo de desenvolvimento
    if (restaurantId === 'mock-restaurant-id') {
      console.log('--- USANDO DADOS MOCKADOS (MODO DESENVOLVIMENTO) ---');
      return MOCK_PRODUCTS;
    }

    // Se não for o ID mockado, busca os produtos reais
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