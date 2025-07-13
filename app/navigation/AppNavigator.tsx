//import { createStackNavigator } from "@react-navigation/stack";
//import { LoginScreen } from "../../views/screens/Auth/LoginScreen";
//import { RegisterScreen } from "../../views/screens/Auth/RegisterScreen";
//import CardapioListScreen from "../../views/screens/Cardapio/CardapioListScreen";
//import { MenuScreen } from "../../views/screens/Menu/MenuScreen";

// 1. DEFINA OS PARÂMETROS DE CADA TELA
//export type RootStackParamList = {
//  Login: undefined;
//  Register: undefined;
//  Menu: undefined;
//  Cardapio: { restaurantId: string }; // A tela 'Cardapio' espera um objeto com 'restaurantId'
//};

// Use o tipo que acabamos de criar no seu StackNavigator
//const Stack = createStackNavigator<RootStackParamList>();

//export const AppNavigator = () => {
  //return (
   // <Stack.Navigator initialRouteName="Login">
  //    <Stack.Screen name="Login" component={LoginScreen} />
   //   <Stack.Screen name="Register" component={RegisterScreen} />
   //   <Stack.Screen name="Menu" component={MenuScreen} />
  //    <Stack.Screen name="Cardapio" component={CardapioListScreen}  />
 //   </Stack.Navigator>
  //);
//};