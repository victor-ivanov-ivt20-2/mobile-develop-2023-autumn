import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import Button from "../components/Button";
import { setToken, setUsername } from "../store/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";

const SIGNIN = gql`
  mutation changePassword($input: ChangePasswordInput!) {
    changePassword(changePasswordInput: $input) {
      user {
        username
      }
    }
  }
`;

const ChangePassword = () => {
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const id = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const [password, onChangePassword] = useState();
  const [signin, { data, loading }] = useMutation(SIGNIN);
  console.log('id', id)
  const LoginFunc = async () => {
    await signin({
      variables: {
        input: {
          id: id,
          password: password,
        },
      },
    })
      .then((response) => {
        nav.goBack();
      })
      .catch((err) => {
        console.log('id', id)
        Alert.alert(
          "Неправильный ввод",
          err["graphQLErrors"][0]["message"] || "Bad Request",
          [{ text: "Пон" }]
        );
      });
  };

  const GuestLogin = () => {
    dispatch(setToken("default"));
    nav.navigate("Labs");
  };

  useEffect(() => {
    if (token == null)
      nav.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
  }, [token]);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                Сменить пароль
              </Text>
            </View>
            <View
              style={{
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
                Аккаунт: {username}
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
                display: "flex",
                gap: 8,
              }}
            >
              <Button onPress={LoginFunc} title="Подтвердить" />
              <Button
                onPress={() => nav.goBack()}
                title="Вернуться"
                variant="secondary"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
