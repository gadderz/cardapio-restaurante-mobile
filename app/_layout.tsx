// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // Este Stack agora controla toda a navegação do seu app
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ title: 'Login' }} />
      <Stack.Screen name="register" options={{ title: 'Cadastro' }} />
      <Stack.Screen name="menu" options={{ title: 'Menu Principal' }} />
      <Stack.Screen name="cardapio" options={{ title: 'Nosso Cardápio' }} />
      <Stack.Screen name="cadastrorestaurante" options={{ title: 'Cadastro de Restaurante' }} />
      <Stack.Screen name="cadastroprato" options={{ title: 'Cadastro de Prato' }} />
    </Stack>
  );
}