import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";
import { useState, useMemo, useEffect } from "react";
import { View, SafeAreaView, Text, FlatList } from "react-native";

const Lab3Entries = () => {
  const [data, setData] = useState([{ Description: "" }]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.publicapis.org/entries");
      const json = await response.json();
      console.log(json.count);
      return json.entries;
    } catch {
      return [];
    }
  };

  const refresh = async () => {
    setData(await fetchData());
  };

  const datamemo = useMemo(async () => await fetchData(), []);

  useEffect(() => {
    console.log(data[0]);
  }, [data]);

  return (
    <>
      <FlatList
        data={[{ Description: "" }, ...data]}
        renderItem={({ item }) => (
          <Text style={{ lineHeight: 24 }}>{item.Description}</Text>
        )}
      />
      <View style={{ height: 8 }}></View>
      <View style={{ paddingBottom: 16, display: "flex", gap: 8 }}>
        <Button
          title="Обновить с memo"
          onPress={async () => {
            setData(await datamemo);
          }}
        />
        <Button
          variant="secondary"
          title="Обновить без memo"
          onPress={refresh}
        />
        <Button
          variant="delete"
          title="Удалить"
          onPress={() => {
            setData([]);
          }}
        />
      </View>
    </>
  );
};

export default Lab3Entries;
