import { Product } from "../models/Product";
import { ProductService } from "../services/ProductService";

export const ProductController = {
  async create(product: Omit<Product, "id">): Promise<Product> {
    return ProductService.create(product);
  },

  async getAll(): Promise<Product[]> {
    return ProductService.getAll();
  },

  async getByRestaurant(restaurantId: string): Promise<Product[]> {
    return ProductService.getByRestaurant(restaurantId);
  },
};
