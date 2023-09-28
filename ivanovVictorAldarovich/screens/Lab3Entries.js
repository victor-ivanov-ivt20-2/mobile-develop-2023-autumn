import { useState, useMemo, useEffect } from "react";
import { Button, SafeAreaView, Text } from "react-native";

const Lab3Entries = () => {
  const [data, setData] = useState([{ Description: "wtf" }]);

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
    <SafeAreaView>
      <Button title="Refresh" onPress={refresh} />
      <Button
        title="useMemo"
        onPress={async () => {
          setData(await datamemo);
        }}
      />
      <Button
        title="delete"
        onPress={() => {
          setData([]);
        }}
      />
      {data.map((d, i) => (
        <Text key={i}>{d.Description}</Text>
      ))}
    </SafeAreaView>
  );
};

export default Lab3Entries;
