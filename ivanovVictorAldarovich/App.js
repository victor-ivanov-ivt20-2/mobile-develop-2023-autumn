import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./screens/Lab1";
import Lab2 from "./screens/Lab2";

import { NavigationContainer } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Лабораторная 1") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Лабораторная 2") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Лабораторная 1" component={Lab1} />
        <Tab.Screen name="Лабораторная 2" component={Lab2} />
      </Tab.Navigator>
    </NavigationContainer>
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
