import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { gql, useMutation } from "@apollo/client";
import Button from "../components/Button";

const SIGNUP = gql`
  mutation SignUp($input: SignUpInput!) {
    signup(signUpInput: $input) {
      accessToken
      refreshToken
      user {
        username
      }
    }
  }
`;

const Registration = () => {
  const nav = useNavigation();
  const [email, onChangeEmail] = useState();
  const [password, onChangePassword] = useState();
  const [cpassword, onChangeCpassword] = useState();
  const [username, onChangeUsername] = useState();
  const [signup, { data, loading }] = useMutation(SIGNUP);

  const RegisterFunc = async () => {
    if (password === cpassword) {
      await signup({
        variables: {
          input: {
            email: email,
            password: password,
            username: username,
          },
        },
      }).then((response) => {
        nav.navigate("Login");
      });
    }
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
            Регистрация
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
            <Text style={{ fontSize: 16, color: "#A3A3A3" }}>Никнейм</Text>
            <TextInput
              style={{
                fontSize: 20,
                color: "#000",
                paddingTop: 8,
                lineHeight: 22,
              }}
              placeholderTextColor="#A3A3A3"
              onChangeText={onChangeUsername}
              value={username}
              placeholder="viktor"
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
          <View
            style={{
              marginLeft: 16,
              borderBottomWidth: 1,
              borderColor: "#A3A3A3",
              paddingVertical: 11,
            }}
          >
            <Text style={{ fontSize: 16, color: "#A3A3A3" }}>
              Подтвердите пароль
            </Text>
            <TextInput
              style={{
                fontSize: 20,
                color: "#000",
                paddingTop: 8,
                lineHeight: 22,
              }}
              placeholderTextColor="#A3A3A3"
              onChangeText={onChangeCpassword}
              value={cpassword}
              placeholder="Введите пароль повторно"
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 12,
          }}
        >
          <Button onPress={RegisterFunc} title="Зарегистрироваться" />
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
          Уже есть аккаунт?
        </Text>
        <TouchableOpacity
          onPress={() => {
            nav.navigate("Login");
          }}
        >
          <Text
            style={{
              color: "#2563EB",
              letterSpacing: -0.6,
            }}
          >
            Войти
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

export default Registration;
