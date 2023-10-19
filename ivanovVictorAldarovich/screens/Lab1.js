import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";

const Lab1 = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount((prev) => prev + 1);
  };

  const decreseCount = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 56 }}>
        <Text style={{...styles.text, fontWeight: 500}}>{count} лет страданий</Text>
        <Text style={{...styles.text, fontSize: 24}}>Иванова Виктора Алдаровича ИВТ-20-2</Text>
      </View>
      <View style={{paddingBottom: 16, display: 'flex', flexDirection: 'col', gap: 8}}>
        <Button title="Увеличить страдания" onPress={addCount} />
        <Button
          variant="secondary"
          title="Пощада Виктору"
          onPress={decreseCount}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    justifyContent: "space-between",
    display: "flex",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 32,
    textAlign: "center",
  },
});

export default Lab1;
