import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import CheckBox from "expo-checkbox";

const Lab2 = () => {
  const [todos, setTodos] = useState([]);

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setTodos(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ id: "000", title: "" }, ...todos]}
        renderItem={({ item }) => (
          <View
            style={{
              ...styles.todo,
              height: item.id === "000" ? 8 : "auto",
              maxWidth: Dimensions.get("window").width - 32,
            }}
          >
            {item.id != "000" ? (
              <CheckBox
                value={item.completed}
                onValueChange={() => toggleTodo(item.id)}
                style={styles.checkbox}
                color={item.completed ? "#1A73E8" : "#5F6368"}
              />
            ) : (
              ""
            )}

            <Text style={styles.text}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  todo: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    display: "flex",
  },
  checkbox: {
    marginRight: 10,
    color: "#1A73E8",
  },
  text: {
    fontSize: 16,
    letterSpacing: -0.4,
  },
  completed: {
    fontSize: 18,
    textDecorationLine: "line-through",
    color: "#1A73E8",
  },
});

export default Lab2;
