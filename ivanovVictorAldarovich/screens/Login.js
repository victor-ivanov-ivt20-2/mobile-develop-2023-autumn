import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Button from "../components/Button";
import { gql, useMutation } from "@apollo/client";

const SIGNIN = gql`
  mutation SignIn($input: SignInInput!) {
    signin(signInInput: $input) {
      accessToken
      refreshToken
      user {
        username
      }
    }
  }
`;

const Login = () => {
  const nav = useNavigation();
  const [email, onChangeEmail] = useState();
  const [password, onChangePassword] = useState();
  const [signin, { data, loading }] = useMutation(SIGNIN);

  const LoginFunc = async () => {
    await signin({
      variables: {
        input: {
          email: email,
          password: password,
        },
      },
    }).then((response) => {
      // localStorage.setItem("token", response.data.signin.accessToken);
      nav.navigate("Labs");
    }).catch((err) => {
      console.log(err)
      console.log('email', email)
      console.log('password', password)
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View>
        <View
          style={{
            marginTop: 48,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
            }}
          >
            Вход
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 12,
            display: "flex",
            gap: 10,
          }}
        >
          <View
            style={{
              marginLeft: 16,
              borderBottomWidth: 1,
              borderColor: "#A3A3A3",
              paddingVertical: 11,
            }}
          >
            <Text style={{ fontSize: 16, color: "#A3A3A3" }}>Почта</Text>
            <TextInput
              style={{
                fontSize: 20,
                color: "#000",
                paddingTop: 8,
                lineHeight: 22,
              }}
              placeholderTextColor="#A3A3A3"
              onChangeText={onChangeEmail}
              value={email}
              placeholder="ivanov@gmail.com"
            />
          </View>
          <View
            style={{
              marginLeft: 16,
              borderBottomWidth: 1,
              borderColor: "#A3A3A3",
              paddingVertical: 11,
            }}
          >
            <Text style={{ fontSize: 16, color: "#A3A3A3" }}>Пароль</Text>
            <TextInput
              style={{
                fontSize: 20,
                color: "#000",
                paddingTop: 8,
                lineHeight: 22,
              }}
              placeholderTextColor="#A3A3A3"
              onChangeText={onChangePassword}
              value={password}
              placeholder="Введите пароль"
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 12,
          }}
        >
          <Button onPress={LoginFunc} title="Войти" />
        </View>
      </View>
      <View
        style={{
          paddingBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <Text
          style={{
            letterSpacing: -0.6,
            color: "#A3A3A3",
          }}
        >
          У вас еще нет аккаунта?
        </Text>
        <TouchableOpacity
          onPress={() => {
            nav.navigate("Registration");
          }}
        >
          <Text
            style={{
              color: "#2563EB",
              letterSpacing: -0.6,
            }}
          >
            Зарегистрироваться
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </View>
  );
};

export default Login;
