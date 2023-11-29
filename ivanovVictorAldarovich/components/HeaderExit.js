import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HeaderExit = (props) => {
  const { color = "#007AFF" } = props;

  const nav = useNavigation();

  return (
    <Pressable
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
        width: 24,
      }}
      onPress={() => {
        nav.navigate("Login");
      }}
    >
      <MaterialIcons name="login" size={24} color={color} />
    </Pressable>
  );
};

export default HeaderExit;
