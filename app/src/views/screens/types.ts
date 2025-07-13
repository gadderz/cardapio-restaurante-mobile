import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
  Menu: { restaurantId: string };
  Restaurant: undefined;
  Product: { restaurantId: string };
};

export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type MenuScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Menu"
>;

export type RestaurantScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Restaurant"
>;

export type ProductScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Product"
>;