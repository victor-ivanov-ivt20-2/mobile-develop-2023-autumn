import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./screens/Lab1";
import Lab2 from "./screens/Lab2";
import Lab3 from "./screens/Lab3";

import { NavigationContainer } from "@react-navigation/native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              elevation: 0,
              backgroundColor: "#fff",
              height: 56,
              paddingVertical: 8,
            },
            tabBarLabelStyle: {
              fontFamily: "Roboto",
              fontSize: 10,
              letterSpacing: 0.4,
              fontWeight: 500,
            },
            tabBarItemStyle: {
              display: "flex",
              height: 40,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Лаб. работа №1") {
                iconName = "queue";
              } else if (route.name === "Лаб. работа №2") {
                iconName = "check-box";
              } else {
                iconName = "show-chart";
              }

              return <MaterialIcons name={iconName} size={20} color={color} />;
            },
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Лаб. работа №1"
            options={{
              headerTitle: "Лабораторная работа №1",
              headerTitleStyle: { textAlign: "center" },
            }}
            component={Lab1}
          />
          <Tab.Screen
            name="Лаб. работа №2"
            options={{
              headerTitle: "Лабораторная работа №2",
              headerTitleStyle: { textAlign: "center" },
            }}
            component={Lab2}
          />
          <Tab.Screen
            name="Лаб. работа №3"
            options={{
              headerTitle: "Лабораторная работа №3",
              headerTitleStyle: { textAlign: "center" },
            }}
            component={Lab3}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
