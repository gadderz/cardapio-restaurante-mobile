import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../views/screens/Auth/LoginScreen";
import { RegisterScreen } from "../views/screens/Auth/RegisterScreen";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};