export type Restaurante = {
    id: string
    nome: string
    cnpj: string
    endereco: Endereco
}
  
type Endereco = {
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    cep: string
    latitude: string 
    longitude: string
}
