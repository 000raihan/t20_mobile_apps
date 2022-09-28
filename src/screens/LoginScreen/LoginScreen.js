import React, { useState, useEffect } from "react";
import { Portal, Provider } from "react-native-paper";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  FlatList,
  ScrollView,
  TextInput,
  ImageBackground,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { addUser, userLogin } from "../../store/features/userSlice";

import MainButton from "../../components/MainButton";

export const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState(true);

  // input value ......................
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [pin, setPin] = useState();

  // console.log("Moile data is : ",mobile)

  const dispatch = useDispatch();

  const onPress = () => {
    let data;
    if (login) {
      data = {
        mobile_number: "88" + mobile,
      };
      dispatch(userLogin(data));
    } else {
      data = {
        full_name: name,
        mobile_number: mobile,
        pin_number: pin,
      };
      const headers = {
        "Content-type": "Application/json",
        Accept: "Application/json",
      };
      axios
        .post(`http://192.168.1.108:6044/api/register`, data, headers)
        .then((res) => {
          console.log(res);
          setName(null);
          setMobile(null);
          setPin(null);

          setLogin(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Provider>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1, width: "100%", height: "100%", position: "relative" }}
        source={require("../../../assets/image_4.png")}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.4,
          }}
        ></View>
        <SafeAreaView style={{ width: "100%", height: "100%" }}>
          <View style={{ flex: 1, width: "100%" }}>
            <View style={{ flex: 2, width: "100%", alignItems: "center" }}>
              <Image
                resizeMode="contain"
                style={{ width: "50%", height: "100%" }}
                source={require("../../../assets/t20_logo.png")}
              />
            </View>
            <View
              style={{
                flex: 3,
                width: "80%",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!login && (
                <TextInput
                  onChangeText={setName}
                  value={name}
                  style={styles.inputDesign}
                  placeholder="Enter Full Name"
                />
              )}
              <TextInput
                onChangeText={setMobile}
                value={mobile}
                style={styles.inputDesign}
                placeholder="Enter Mobile Number"
              />
              {!login && (
                <TextInput
                  onChangeText={setPin}
                  value={pin}
                  style={styles.inputDesign}
                  placeholder="Enter Pin Code"
                />
              )}

              <MainButton onPress={onPress} style={{ marginTop: 10 }}>
                {login ? "Login" : "Registration"}
              </MainButton>

              <Text style={{ marginTop: 20, color: "white", fontSize: 12 }}>
                {login ? "Don't have account ?" : "Do you'be an account?"}{" "}
              </Text>
              <Pressable
                onPress={() => setLogin(!login)}
                style={{
                  backgroundColor: "white",
                  paddingVertical: 2,
                  paddingHorizontal: 10,
                  marginTop: 5,
                }}
              >
                <Text>{login ? "Go to Registarion" : "Got login"}</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  inputDesign: {
    color: "black",
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginTop: 10,
  },
});
