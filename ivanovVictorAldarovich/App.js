import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount((prev) => prev + 1);
  };

  const decreseCount = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={addCount}>
        <Text>Увеличь страдания</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={decreseCount}>
        <Text>Пощадить меня</Text>
      </TouchableOpacity>
      <Text>{count} лет страданий</Text>
      <Text>Иванов Виктор ИВТ-20-2</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
});
