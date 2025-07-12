import AsyncStorage from '@react-native-async-storage/async-storage'
import { Restaurante } from '../models/Restaurante'

export async function cadastrarRestaurante(restaurante: Restaurante) {
    const dados = await AsyncStorage.getItem('restaurantes')
    const lista = dados ? JSON.parse(dados) : []
    lista.push(restaurante)
    await AsyncStorage.setItem('restaurantes', JSON.stringify(lista))
    console.log('Foi Salvo')
}