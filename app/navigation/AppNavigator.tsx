import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../src/views/screens/Auth/LoginScreen";
import RegisterScreen from "../src/views/screens/Auth/RegisterScreen";
import HomeScreen from "../src/views/screens/Home";
import MenuScreen from "../src/views/screens/Menu/MenuScreen";
import ProductScreen from "../src/views/screens/Product/ProductScreen";
import RestaurantScreen from "../src/views/screens/Restaurant/RestaurantScreen";
import { RootStackParamList } from "../src/views/screens/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
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