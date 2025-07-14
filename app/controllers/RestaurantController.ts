import { Restaurant } from '../models/Restaurant'
import RestaurantService from '../services/RestaurantService'

const RestaurantController = {
    async create (restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant> {
        return RestaurantService.create(restaurant)
    },

    async getAll(): Promise<Restaurant[]> {
        return RestaurantService.getAll()
    },
}

export default RestaurantController;