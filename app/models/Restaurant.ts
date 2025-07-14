export interface Restaurant {
    id?: string
    name: string
    cnpj: string
    address: Address
}
  
export interface Address {
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    latitude: string 
    longitude: string
}
