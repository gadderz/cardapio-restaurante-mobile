import AsyncStorage from '@react-native-async-storage/async-storage'
import { Prato } from '../models/Prato'

export async function cadastrarPrato(prato: Prato) {
    console.log('Cadastrando prato:', prato)
    const dados = await AsyncStorage.getItem('pratos')
    const lista = dados ? JSON.parse(dados) : []
    lista.push(prato)
    await AsyncStorage.setItem('restaurantes', JSON.stringify(lista))
    console.log('Foi Salvo')
}