import { Address, Restaurant } from '@/app/src/models/Restaurant'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import 'react-native-get-random-values'
import { TextInputMask } from 'react-native-masked-text'
import { RestaurantController } from '../../../controllers/RestaurantController'
import { RestaurantScreenProps } from '../types'

export default function RestaurantScreen({ navigation }: RestaurantScreenProps) {
  const [name, setName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [address, setAddress] = useState<Address>({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: '',
    longitude: '',
  })

  const [erros, setErros] = useState({
    name: false,
    cnpj: false,
    zipCode: false,
    street: false,
    number: false,
    neighborhood: false,
    city: false,
    state: false,
  });

  const validateFields = (): boolean => {
    const emptyFields = {
      name: name.trim() === '',
      cnpj: cnpj.trim() === '',
      zipCode: address.zipCode.trim() === '',
      street: address.street.trim() === '',
      number: address.number.trim() === '',
      neighborhood: address.neighborhood.trim() === '',
      city: address.city.trim() === '',
      state: address.state.trim() === '',
    };

    setErros(emptyFields); // Atualiza o estado com os erros
    return !Object.values(emptyFields).some((v) => v); // Retorna true se todos os campos forem válidos
  };

  const searchAddressByZipCode = async (zipCode: string) => {
    if (zipCode.length !== 8) {
      Alert.alert('⚠️ CEP inválido', 'O CEP deve conter 8 dígitos.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('❌ Erro', 'CEP não encontrado.');
        return;
      }

      setAddress((prev) => ({
        ...prev,
        street: data.logradouro || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        zipCode: data.uf || '',
      }));
    } catch (error) {
      Alert.alert('❌ Erro', 'Não foi possível buscar o endereço.');
      console.error(error);
    }
  };

  const handleRegister = async () => {
    if (!validateFields()) {
      Alert.alert('⚠️ Campos obrigatórios', 'Preencha todos os campos.');
      return;
    }

    const restaurant: Restaurant = {
      name: name,
      cnpj: cnpj,
      address: address,
    };

    const createdRestaurant = await RestaurantController.create(restaurant);

    navigation.navigate('Product', { restaurantId: createdRestaurant.id ?? '' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro de Restaurante</Text>

      <TextInput
        placeholder="Nome Restaurante"
        value={name}
        onChangeText={setName}
        style={[styles.input, erros.name && styles.inputError]}
      />
      {erros.name && <Text style={styles.errorText}>O nome do restaurante é obrigatório.</Text>}

      <TextInputMask
        type={'cnpj'}
        value={cnpj}
        onChangeText={setCnpj}
        style={[styles.input, erros.cnpj && styles.inputError]}
        placeholder="CNPJ"
      />
      {erros.cnpj && <Text style={styles.errorText}>O CNPJ é obrigatório.</Text>}

      <Text style={styles.subtitulo}>Endereço</Text>

      <TextInputMask
        type={'zip-code'}
        value={address.zipCode}
        onChangeText={(text) => {
          setAddress({ ...address, zipCode: text.replace(/\D/g, '') }); // Remove caracteres não numéricos
          if (text.replace(/\D/g, '').length === 8) {
            searchAddressByZipCode(text.replace(/\D/g, ''));
          }
        }}
        style={[styles.input, erros.zipCode && styles.inputError]}
        placeholder="CEP"
      />
      {erros.zipCode && <Text style={styles.errorText}>O CEP é obrigatório.</Text>}

      <TextInput
        placeholder="Rua"
        value={address.street}
        onChangeText={(text) => setAddress({ ...address, street: text })}
        style={[styles.input, erros.street && styles.inputError]}
      />
      {erros.street && <Text style={styles.errorText}>A rua é obrigatória.</Text>}

      <TextInput
        placeholder="Número"
        value={address.number}
        onChangeText={(text) => setAddress({ ...address, number: text.replace(/\D/g, '') })} // Remove caracteres não numéricos
        keyboardType="numeric" // Exibe o teclado numérico
        style={[styles.input, erros.number && styles.inputError]}
      />
      {erros.number && <Text style={styles.errorText}>O número é obrigatório.</Text>}

      <TextInput
        placeholder="Bairro"
        value={address.neighborhood}
        onChangeText={(text) => setAddress({ ...address, neighborhood: text })}
        style={[styles.input, erros.neighborhood && styles.inputError]}
      />
      {erros.neighborhood && <Text style={styles.errorText}>O bairro é obrigatório.</Text>}

      <TextInput
        placeholder="Cidade"
        value={address.city}
        onChangeText={(text) => setAddress({ ...address, city: text })}
        style={[styles.input, erros.city && styles.inputError]}
      />
      {erros.city && <Text style={styles.errorText}>A cidade é obrigatória.</Text>}

      <Picker
        selectedValue={address.state}
        onValueChange={(itemValue) => setAddress({ ...address, state: itemValue })}
        style={[styles.input, erros.state && styles.inputError]}
      >
        <Picker.Item label="Selecione o estado" value="" />
        <Picker.Item label="AC" value="AC" />
        <Picker.Item label="AL" value="AL" />
        <Picker.Item label="AP" value="AP" />
        <Picker.Item label="AM" value="AM" />
        <Picker.Item label="BA" value="BA" />
        <Picker.Item label="CE" value="CE" />
        <Picker.Item label="DF" value="DF" />
        <Picker.Item label="ES" value="ES" />
        <Picker.Item label="GO" value="GO" />
        <Picker.Item label="MA" value="MA" />
        <Picker.Item label="MT" value="MT" />
        <Picker.Item label="MS" value="MS" />
        <Picker.Item label="MG" value="MG" />
        <Picker.Item label="PA" value="PA" />
        <Picker.Item label="PB" value="PB" />
        <Picker.Item label="PR" value="PR" />
        <Picker.Item label="PE" value="PE" />
        <Picker.Item label="PI" value="PI" />
        <Picker.Item label="RJ" value="RJ" />
        <Picker.Item label="RN" value="RN" />
        <Picker.Item label="RS" value="RS" />
        <Picker.Item label="RO" value="RO" />
        <Picker.Item label="RR" value="RR" />
        <Picker.Item label="SC" value="SC" />
        <Picker.Item label="SP" value="SP" />
        <Picker.Item label="SE" value="SE" />
        <Picker.Item label="TO" value="TO" />
      </Picker>
      {erros.state && <Text style={styles.errorText}>O estado (UF) é obrigatório.</Text>}

      <Button title="Cadastrar Restaurante" onPress={handleRegister} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitulo: { fontSize: 18, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginVertical: 5 },
  inputError: { borderColor: 'red' }, // Borda vermelha para campos com erro
  errorText: { color: 'red', fontSize: 12, marginBottom: 5 }, // Texto de erro em vermelho
});