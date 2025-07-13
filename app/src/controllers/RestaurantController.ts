import AsyncStorage from '@react-native-async-storage/async-storage'
import { Restaurante } from '../models/Restaurante'

export const RestaurantController = {
    async cadastrarRestaurante(restaurante: Restaurante) {
        const dados = await AsyncStorage.getItem('restaurantes')
        const lista = dados ? JSON.parse(dados) : []
        lista.push(restaurante)
        await AsyncStorage.setItem('restaurantes', JSON.stringify(lista))
        console.log('Foi Salvo')
    },

    async searchRestaurants(): Promise<Restaurante[]> {
        const dados = await AsyncStorage.getItem('restaurantes')
        if (dados) {
            return JSON.parse(dados)
        }
        return []
    }
}