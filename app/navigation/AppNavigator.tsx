import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../views/screens/Auth/LoginScreen";
import RegisterScreen from "../views/screens/Auth/RegisterScreen";
import HomeScreen from "../views/screens/Home";
import MenuScreen from "../views/screens/Menu/MenuScreen";
import ProductScreen from "../views/screens/Product/ProductScreen";
import RestaurantScreen from "../views/screens/Restaurant/RestaurantScreen";
import { RootStackParamList } from "../views/screens/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator () {
  return (
   <Stack.Navigator initialRouteName="Login">
     <Stack.Screen name="Login" component={LoginScreen} />
     <Stack.Screen name="Register" component={RegisterScreen} />
     <Stack.Screen name="Menu" component={MenuScreen} />
     <Stack.Screen name="Home" component={HomeScreen}  />
     <Stack.Screen name="Restaurant" component={RestaurantScreen}  />
     <Stack.Screen name="Product" component={ProductScreen}  />
   </Stack.Navigator>
  );
};