import React, { useState, useEffect } from "react";
import { Portal, Provider } from "react-native-paper";
import {
  View,
  StyleSheet,
  Text,

  TextInput,
  ImageBackground,
  Image,
  SafeAreaView,
  Pressable,
    Alert
} from "react-native";
import {CallApi} from "./api/Api";
import * as SecureStore from 'expo-secure-store';
import MainButton from "../../components/MainButton";

export const LoginScreen = ({ navigation }) => {
    const [mobile, setMobile] = useState("");

    const checkLogin = (mobileNumber) => {
        CallApi.login(mobileNumber).then(async (result)  => {
                if(result.success){
                    console.log(result.result)
                    await save("userDetails", JSON.stringify(result.result));
                    navigation.navigate("DrawerNavigator",{result: result.result});
                }else{
                    Alert.alert('Error', result.message, [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                    // console.log("error", result.error);
                }
            },(error) => {
                console.log("=====",error)
                alert("Invalid data.");
            }
        );
    }

    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

  const onPress = async () => {
    if(mobile === ""){
        Alert.alert('Validation', 'Please enter your mobile number', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    }else{
        checkLogin(mobile);
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

              <TextInput
                  onChangeText={text => {
                      setMobile(text);
                  }}
                value={mobile}
                style={styles.inputDesign}
                placeholder="Enter Mobile Number"
              />

              <MainButton onPress={onPress} style={{ marginTop: 10 }}>
                Login
              </MainButton>

              <Text style={{ marginTop: 20, color: "white", fontSize: 12 }}>
                  Don't have account ?
              </Text>
              <Pressable
                onPress={() => navigation.navigate("RegisterScreen")}
                style={{
                  backgroundColor: "white",
                  paddingVertical: 2,
                  paddingHorizontal: 10,
                  marginTop: 5,
                }}
              >
                <Text>Go to Registration</Text>
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
