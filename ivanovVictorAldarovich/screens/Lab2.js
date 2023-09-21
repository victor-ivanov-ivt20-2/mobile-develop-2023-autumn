import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
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
      <Text style={styles.title}>Тудушка</Text>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todo}>
            <CheckBox
              value={item.completed}
              onValueChange={() => toggleTodo(item.id)}
              style={styles.checkbox}
            />
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  todo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
  },
  completed: {
    fontSize: 18,
    textDecorationLine: "line-through",
    color: "#888",
  },
});

export default Lab2;
