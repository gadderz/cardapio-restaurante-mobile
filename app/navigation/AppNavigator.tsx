import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "..";
import RegisterScreen from "../register";
import MenuScreen from "../menu";
import CardapioListScreen from "../cardapio";
import CadastroPratoScreen from "../prato";
import CadastroRestauranteScreen from "../restaurante";


// 1. DEFINA OS PARÂMETROS DE CADA TELA
export type RootStackParamList = {
 Login: undefined;
 Register: undefined;
 Menu: undefined;
 Cardapio: { restaurantId: string }; // A tela 'Cardapio' espera um objeto com 'restaurantId'
 Restaurante: undefined; // A tela 'Restaurante' não espera parâmetros
 Prato: { restauranteId: string }; // A tela 'Prato' não espera parâmetros
};

// Use o tipo que acabamos de criar no seu StackNavigator
const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
   <Stack.Navigator initialRouteName="Login">
     <Stack.Screen name="Login" component={LoginScreen} />
     <Stack.Screen name="Register" component={RegisterScreen} />
     <Stack.Screen name="Menu" component={MenuScreen} />
     <Stack.Screen name="Cardapio" component={CardapioListScreen}  />
     <Stack.Screen name="Restaurante" component={CadastroRestauranteScreen}  />
     <Stack.Screen name="Prato" component={CadastroPratoScreen}  />
   </Stack.Navigator>
  );
};