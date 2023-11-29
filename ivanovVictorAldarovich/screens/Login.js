import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import Button from "../components/Button";

const Login = () => {
  const nav = useNavigation();
  return (
    <View>
      <Button
        onPress={() => {
          nav.navigate("Labs");
        }}
      >
        Войти
      </Button>
    </View>
  );
};

export default Login;
