import { View } from "react-native";
import Lab3Entries from "./Lab3Entries";

const Lab3 = () => {
  return (
    <View style={{flex: 1, paddingHorizontal: 8, backgroundColor: "#EFEFEF", justifyContent: "space-between"}}>
      <Lab3Entries />
    </View>
  );
};

export default Lab3;
