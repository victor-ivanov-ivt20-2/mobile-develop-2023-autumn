import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Lab1 from "./screens/Lab1";
import Lab2 from "./screens/Lab2";
import Lab3 from "./screens/Lab3";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import HeaderExit from "./components/HeaderExit";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import { useEffect } from "react";
import ChangePassword from "./screens/ChangePassword";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const client = new ApolloClient({
  uri: "http://45.84.225.164:3005/graphql",
  cache: new InMemoryCache(),
});

const StackNavigatorComponent = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      initialRouteName="Labs"
    >
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Registration} name="Registration" />
      <Stack.Screen component={BottomTabNavigatorComponent} name="Labs" />
      <Stack.Screen component={ChangePassword} name="ChangePassword" />
    </Stack.Navigator>
  );
};

const BottomTabNavigatorComponent = () => {
  const token = useSelector((state) => state.auth.token);
  const nav = useNavigation();
  useEffect(() => {
    if (token == null)
      nav.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
  }, [token]);
  return (
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
          headerRight: ({}) => <HeaderExit />,
          headerTitleStyle: { textAlign: "center", fontSize: 18 },
        }}
        component={Lab1}
      />
      <Tab.Screen
        name="Лаб. работа №2"
        options={{
          headerTitle: "Лабораторная работа №2",
          headerRight: ({}) => <HeaderExit />,
          headerTitleStyle: { textAlign: "center", fontSize: 18 },
        }}
        component={Lab2}
      />
      <Tab.Screen
        name="Лаб. работа №3"
        options={{
          headerTitle: "Лабораторная работа №3",
          headerRight: ({}) => <HeaderExit />,
          headerTitleStyle: { textAlign: "center", fontSize: 18 },
        }}
        component={Lab3}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StackNavigatorComponent />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </ApolloProvider>
  );
}
