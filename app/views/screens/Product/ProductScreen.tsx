import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Button, Image,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  View
} from 'react-native';
import 'react-native-get-random-values';
import { TextInputMask } from 'react-native-masked-text';
import ProductController from '../../../controllers/ProductController';
import { Product } from '../../../models/Product';
import { ProductScreenProps } from '../types';

export default function ProductScreen({ navigation, route }: ProductScreenProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    price: false,
    image: false
  })

  const restaurantId = route.params.restaurantId as string;
  console.log("Restaurante ID recebido:", restaurantId);

  const validateFields = (): boolean => {
    const emptyFields = {
      name: name.trim() === '',
      description: description.trim() === '',
      price: price.trim() === '',
      image: image.trim() === '',
    };

    console.log("Erros detectados:", emptyFields); // Log para depuração
    setErrors(emptyFields);
    return !Object.values(emptyFields).some((v) => v);
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setErrors((prev) => ({ ...prev, image: false }))
    }
  }

  const saveProduct = async () => {
    console.log('Salvando prato:', { nome: name, descricao: description, preco: price, imagem: image })
    if (!validateFields()) {
      Alert.alert('⚠️ Campos obrigatórios', 'Preencha todos os campos.')
      return
    }

    const cleanPrice = price.replace('R$ ', '').replace('.', '').replace(',', '.');

    const newProduct: Product = {
      name: name,
      description: description,
      price: parseFloat(cleanPrice),
      image: image,
      restaurantId: restaurantId
    }

    try {
      await ProductController.create(newProduct)
      console.log("Prato salvo com sucesso!");
      Alert.alert('✅ Sucesso', 'Prato cadastrado com sucesso!')
      setName('')
      setDescription('')
      setPrice('')
      setImage('')
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
        value={name}
        onChangeText={setName}
        style={[styles.input, errors.name && styles.inputError]}
      />
      {errors.name && <Text style={styles.errorText}>O nome do prato é obrigatório.</Text>}

      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, errors.description && styles.inputError]}
      />
      {errors.description && <Text style={styles.errorText}>A descrição é obrigatória.</Text>}

      <TextInputMask
        type={'money'}
        value={price}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$ ',
          suffixUnit: ''
        }}
        onChangeText={(text) => setPrice(text)}
        style={[styles.input, errors.price && styles.inputError]}
        placeholder="Preço"
      />
      {errors.price && <Text style={styles.errorText}>O preço é obrigatório.</Text>}

      {image ? (
        <Image source={{ uri: image }} style={styles.imagem} />
      ) : null}
      {errors.image && <Text style={styles.errorText}>A imagem é obrigatória.</Text>}

      <View style={styles.buttonContainer}>
        <Button title="Escolher Imagem" onPress={selectImage} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Salvar Prato" onPress={saveProduct} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Voltar para o menu" onPress={() => navigation.navigate('Home')} />
      </View>
    </ScrollView>
  );
}

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
    borderColor: 'red',
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