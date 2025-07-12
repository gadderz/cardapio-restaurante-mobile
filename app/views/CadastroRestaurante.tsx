import { router } from "expo-router"
import React, { useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import { cadastrarRestaurante } from '../controllers/CadastroRestauranteController'
import { Restaurante } from '../models/Restaurante'
import { TextInputMask } from 'react-native-masked-text';

const CadastroRestaurante = () => {
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: '',
    latitude: '',
    longitude: '',
  })
  

  const handleCadastro = () => {

    console.log({ nome, cnpj, endereco })
    const restaurante : Restaurante = {
        id: uuidv4(),
        nome: nome,
        cnpj: cnpj,
        endereco: endereco
    }

    cadastrarRestaurante(restaurante)

    // Redireciona para a tela de cadastro de prato, passando o ID:
    router.push({
        pathname: "/views/CadastroPrato",
        params: { restauranteId: restaurante.id }
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro de Restaurante</Text>
      
      <TextInput placeholder="Nome Restaurante" value={nome} 
      onChangeText={
        setNome
        } style={styles.input} />
        
        <TextInputMask
        type={'cnpj'}
        value={cnpj}
        onChangeText={setCnpj}
        style={styles.input}
        placeholder="CNPJ"
      />

      <Text style={styles.subtitulo}>Endereço</Text>
      {Object.keys(endereco).map((campo) => (
        <TextInput
          key={campo}
          placeholder={campo}
          value={endereco[campo as keyof typeof endereco]}
          onChangeText={(text) =>
            setEndereco({ ...endereco, [campo]: text })
          }
          style={styles.input}
        />
      ))}

      <Button title="Cadastrar Restaurante" onPress={handleCadastro} />
    </ScrollView>
  )
}

export default CadastroRestaurante

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitulo: { fontSize: 18, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginVertical: 5 },
})
