// src/services/PratoService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Prato } from '../models/Prato';

const PratoS_STORAGE_KEY = '@restaurantApp:Pratos';

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const MOCK_PratoS: Prato[] = [
  {
    id: 'prod1',
    nome: 'Pizza de Calabresa Especial',
    descricao: 'Molho de tomate da casa, queijo mussarela, calabresa e azeitonas pretas.',
    preco: 52.50,
    imagem: 'https://cdn0.tudoreceitas.com/pt/posts/9/8/3/pizza_calabresa_e_mussarela_4389_600.jpg',
    restaurantId: 'mock-restaurant-id',
  },
  {
    id: 'prod2',
    nome: 'Hambúrguer Duplo Cheddar',
    descricao: 'Dois hambúrgueres de 150g, pão brioche, cheddar duplo e bacon crocante.',
    preco: 38.00,
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1hjwGWSge5Ocd9N9l1qlAAkbpANqAwvhh7A&s',
    restaurantId: 'mock-restaurant-id',
  },
  {
    id: 'prod3',
    nome: 'Porção de Batata Frita',
    descricao: 'Batatas fritas crocantes com cheddar e bacon.',
    preco: 25.00,
    imagem: 'https://www.tendaatacado.com.br/dicas/wp-content/webp-express/webp-images/uploads/2022/06/como-fazer-batata-frita-topo.jpg.webp',
    restaurantId: 'mock-restaurant-id',
  },
];

export const PratoService = {
  async create(PratoData: Omit<Prato, 'id'>): Promise<Prato> {
    const allPratos = await this.getAll();
    const newPrato: Prato = {
      id: generateId(),
      ...PratoData,
    };
    const updatedPratos = [...allPratos, newPrato];
    await AsyncStorage.setItem(PratoS_STORAGE_KEY, JSON.stringify(updatedPratos));
    return newPrato;
  },

  async getAll(): Promise<Prato[]> {
    try {
      const storedPratos = await AsyncStorage.getItem(PratoS_STORAGE_KEY);
      return storedPratos ? JSON.parse(storedPratos) : [];
    } catch (error) {
      console.error('Erro ao buscar produtos no AsyncStorage:', error);
      return [];
    }
  },

  // CORREÇÃO APLICADA AQUI
  async getByRestaurant(restaurantId: string): Promise<Prato[]> {
    // Adiciona uma lógica para retornar os dados mockados em modo de desenvolvimento
    if (restaurantId === 'mock-restaurant-id') {
      console.log('--- USANDO DADOS MOCKADOS (MODO DESENVOLVIMENTO) ---');
      return MOCK_PratoS;
    }

    // Se não for o ID mockado, busca os produtos reais
    try {
      const allPratos = await this.getAll();
      const filteredPratos = allPratos.filter(
        (Prato) => Prato.restaurantId === restaurantId
      );
      return filteredPratos;
    } catch (error) {
      console.error('Erro ao filtrar produtos por restaurante:', error);
      return [];
    }
  },
};