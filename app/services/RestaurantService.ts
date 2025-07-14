import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateId } from "../helpers/utils";
import { Restaurant } from "../models/Restaurant";

const RESTAURANTS_STORAGE_KEY = '@restaurantApp:restaurants';

export const RestaurantService = {
  async create(restaurant: Omit<Restaurant, "id">): Promise<Restaurant> {
    const restaurants = await this.getAll();
    const newRestaurant: Restaurant = {
      id: generateId(),
      ...restaurant,
    };
    const updatedRestaurants = [...restaurants, newRestaurant];
    await AsyncStorage.setItem(RESTAURANTS_STORAGE_KEY, JSON.stringify(updatedRestaurants));
    return newRestaurant;
  },

  async getAll(): Promise<Restaurant[]> {
    try {
      const storedRestaurants = await AsyncStorage.getItem(RESTAURANTS_STORAGE_KEY);
      return storedRestaurants ? JSON.parse(storedRestaurants) : [];
    } catch (error) {
      console.error('Error fetching restaurants from AsyncStorage:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Restaurant | null> {
    const restaurants = await this.getAll();
    const restaurant = restaurants.find((r) => r.id === id);
    return restaurant || null;
  }
}