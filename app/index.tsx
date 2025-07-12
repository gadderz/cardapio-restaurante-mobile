import { View } from "react-native";
import CadastroRestaurante from "./views/CadastroRestaurante";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CadastroRestaurante />
    </View>
  );
}
