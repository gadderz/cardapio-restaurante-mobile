import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../models/Product";

const PRODUCTS_KEY = "@RestaurantApp:Products";

export const ProductService = {
  async create(product: Omit<Product, "id">): Promise<Product> {
    const products = await this.getAll();
    const newProduct = { ...product, id: Date.now().toString() };
    await AsyncStorage.setItem(
      PRODUCTS_KEY,
      JSON.stringify([...products, newProduct])
    );
    return newProduct;
  },

  async getAll(): Promise<Product[]> {
    const productsJson = await AsyncStorage.getItem(PRODUCTS_KEY);
    return productsJson ? JSON.parse(productsJson) : [];
  },

  async getByRestaurant(restaurantId: string): Promise<Product[]> {
    const products = await this.getAll();
    return products.filter((p) => p.restaurantId === restaurantId);
  },
};
