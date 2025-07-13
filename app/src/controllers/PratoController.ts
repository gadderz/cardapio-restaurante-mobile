import { Prato } from "../models/Prato";
import { PratoService } from "../services/PratoService";

export const PratoController = {
  async create(Prato: Omit<Prato, "id">): Promise<Prato> {
    return PratoService.create(Prato);
  },

  async getAll(): Promise<Prato[]> {
    return PratoService.getAll();
  },

  async getByRestaurant(restaurantId: string): Promise<Prato[]> {
    return PratoService.getByRestaurant(restaurantId);
  },
};
