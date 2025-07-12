import { Picker } from '@react-native-picker/picker'
import { router } from "expo-router"
import React, { useState } from 'react'
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import 'react-native-get-random-values'
import { TextInputMask } from 'react-native-masked-text'
import { v4 as uuidv4 } from 'uuid'
import { cadastrarRestaurante } from '../controllers/CadastroRestauranteController'
import { Restaurante } from '../models/Restaurante'

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

  const [erros, setErros] = useState({
    nome: false,
    cnpj: false,
    cep: false,
    rua: false,
    numero: false,
    bairro: false,
    cidade: false,
    uf: false,
  });

  const validarCampos = (): boolean => {
    const camposVazios = {
      nome: nome.trim() === '',
      cnpj: cnpj.trim() === '',
      cep: endereco.cep.trim() === '',
      rua: endereco.rua.trim() === '',
      numero: endereco.numero.trim() === '',
      bairro: endereco.bairro.trim() === '',
      cidade: endereco.cidade.trim() === '',
      uf: endereco.uf.trim() === '',
    };
  
    setErros(camposVazios); // Atualiza o estado com os erros
    return !Object.values(camposVazios).some((v) => v); // Retorna true se todos os campos forem válidos
  };

  const buscarEnderecoPorCep = async (cep: string) => {
    if (cep.length !== 8) {
      Alert.alert('⚠️ CEP inválido', 'O CEP deve conter 8 dígitos.');
      return;
    }
  
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
  
      if (data.erro) {
        Alert.alert('❌ Erro', 'CEP não encontrado.');
        return;
      }
  
      setEndereco((prev) => ({
        ...prev,
        rua: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        uf: data.uf || '',
      }));
    } catch (error) {
      Alert.alert('❌ Erro', 'Não foi possível buscar o endereço.');
      console.error(error);
    }
  };
  

  const handleCadastro = () => {
    if (!validarCampos()) {
      Alert.alert('⚠️ Campos obrigatórios', 'Preencha todos os campos.');
      return;
    }
  
    const restaurante: Restaurante = {
      id: uuidv4(),
      nome: nome,
      cnpj: cnpj,
      endereco: endereco,
    };
  
    cadastrarRestaurante(restaurante);
  
    router.push({
      pathname: "/views/CadastroPrato",
      params: { restauranteId: restaurante.id },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro de Restaurante</Text>

      <TextInput
        placeholder="Nome Restaurante"
        value={nome}
        onChangeText={setNome}
        style={[styles.input, erros.nome && styles.inputError]}
      />
      {erros.nome && <Text style={styles.errorText}>O nome do restaurante é obrigatório.</Text>}

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
        value={endereco.cep}
        onChangeText={(text) => {
          setEndereco({ ...endereco, cep: text.replace(/\D/g, '') }); // Remove caracteres não numéricos
          if (text.replace(/\D/g, '').length === 8) {
            buscarEnderecoPorCep(text.replace(/\D/g, ''));
          }
        }}
        style={[styles.input, erros.cep && styles.inputError]}
        placeholder="CEP"
      />
      {erros.cep && <Text style={styles.errorText}>O CEP é obrigatório.</Text>}

      <TextInput
        placeholder="Rua"
        value={endereco.rua}
        onChangeText={(text) => setEndereco({ ...endereco, rua: text })}
        style={[styles.input, erros.rua && styles.inputError]}
      />
      {erros.rua && <Text style={styles.errorText}>A rua é obrigatória.</Text>}

      <TextInput
        placeholder="Número"
        value={endereco.numero}
        onChangeText={(text) => setEndereco({ ...endereco, numero: text.replace(/\D/g, '') })} // Remove caracteres não numéricos
        keyboardType="numeric" // Exibe o teclado numérico
        style={[styles.input, erros.numero && styles.inputError]}
      />
      {erros.numero && <Text style={styles.errorText}>O número é obrigatório.</Text>}

      <TextInput
        placeholder="Bairro"
        value={endereco.bairro}
        onChangeText={(text) => setEndereco({ ...endereco, bairro: text })}
        style={[styles.input, erros.bairro && styles.inputError]}
      />
      {erros.bairro && <Text style={styles.errorText}>O bairro é obrigatório.</Text>}

      <TextInput
        placeholder="Cidade"
        value={endereco.cidade}
        onChangeText={(text) => setEndereco({ ...endereco, cidade: text })}
        style={[styles.input, erros.cidade && styles.inputError]}
      />
      {erros.cidade && <Text style={styles.errorText}>A cidade é obrigatória.</Text>}

      <Picker
        selectedValue={endereco.uf}
        onValueChange={(itemValue) => setEndereco({ ...endereco, uf: itemValue })}
        style={[styles.input, erros.uf && styles.inputError]}
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
      {erros.uf && <Text style={styles.errorText}>O estado (UF) é obrigatório.</Text>}

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
  inputError: { borderColor: 'red' }, // Borda vermelha para campos com erro
  errorText: { color: 'red', fontSize: 12, marginBottom: 5 }, // Texto de erro em vermelho
});