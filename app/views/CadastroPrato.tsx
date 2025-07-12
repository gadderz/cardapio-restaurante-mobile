import * as ImagePicker from 'expo-image-picker'
import { useSearchParams } from 'expo-router/build/hooks'
import React, { useState } from 'react'
import {
  Alert,
  Button, Image,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  View
} from 'react-native'
import { v4 } from 'uuid'
import { cadastrarPrato } from '../controllers/CadastroPratoController'
import { Prato } from '../models/Prato'

const CadastroPrato = () => {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagem, setImagem] = useState('')
  const [erros, setErros] = useState({
    nome: false,
    descricao: false,
    preco: false,
    imagem: false
  })
  
  const [searchParams] = useSearchParams();
  const restauranteId = searchParams[1] as string;
  console.log("Restaurante ID recebido:", restauranteId);

  const validarCampos = (): boolean => {
    const camposVazios = {
      nome: nome.trim() === '',
      descricao: descricao.trim() === '',
      preco: preco.trim() === '',
      imagem: imagem.trim() === '',
    };
  
    console.log("Erros detectados:", camposVazios); // Log para depuração
    setErros(camposVazios);
    return !Object.values(camposVazios).some((v) => v);
  };

  const escolherImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })
    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri)
      setErros((prev) => ({ ...prev, imagem: false }))
    }
  }

  const salvarPrato = async () => {
    console.log('Salvando prato:', { nome, descricao, preco, imagem })
    if (!validarCampos()) {
      Alert.alert('⚠️ Campos obrigatórios', 'Preencha todos os campos.')
      return
    }

    const novoPrato: Prato = {
      id: v4() as string,
      nome,
      descricao,
      preco: parseFloat(preco),
      imagem,
      restaurantId: restauranteId
    }

    try {
      await cadastrarPrato(novoPrato)
      console.log("Prato salvo com sucesso!");
      Alert.alert('✅ Sucesso', 'Prato cadastrado com sucesso!')
      setNome('')
      setDescricao('')
      setPreco('')
      setImagem('') 
    } catch (error) {
      Alert.alert('❌ Erro', 'Não foi possível salvar o prato.')
      console.error(error)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro de Prato</Text>
  
      <TextInput
        placeholder="Nome do Prato"
        value={nome}
        onChangeText={setNome}
        style={[styles.input, erros.nome && styles.inputError]}
      />
      {erros.nome && <Text style={styles.errorText}>O nome do prato é obrigatório.</Text>}

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, erros.descricao && styles.inputError]}
      />
      {erros.descricao && <Text style={styles.errorText}>A descrição é obrigatória.</Text>}

      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        style={[styles.input, erros.preco && styles.inputError]}
      />
      {erros.preco && <Text style={styles.errorText}>O preço é obrigatório.</Text>}
  
      {imagem ? (
        <Image source={{ uri: imagem }} style={styles.imagem} />
      ) : null}
      {erros.imagem && <Text style={styles.errorText}>A imagem é obrigatória.</Text>}
  
      <View style={styles.buttonContainer}>
        <Button title="Escolher Imagem" onPress={escolherImagem} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Salvar Prato" onPress={salvarPrato} />
      </View>
    </ScrollView>
  );
}

export default CadastroPrato

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '100%',
  },
  inputError: {
    borderColor: 'red', // Define a borda vermelha para campos com erro
  },
  imagem: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});