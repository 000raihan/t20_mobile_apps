import React, { useEffect, useState } from "react";
import { Portal, Provider } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
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
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import { Header } from "../NotificationScreen/components/Header";
import colors from "../../../constants/colors";
import { addTeam } from "../../store/features/teamSlice";

export const AllTeamsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { team } = useSelector((state) => state.team);

  const countryList = [
    {
      country_id: 1,
      country_name: "Bangladesh",
      country_image: null,
      status: 1,
      created_at: "2022-09-26T18:13:29.000Z",
      updated_at: null,
    },
    {
      country_id: 2,
      country_name: "India",
      country_image: null,
      status: 1,
      created_at: "2022-09-26T18:13:29.000Z",
      updated_at: null,
    },
    {
      country_id: 3,
      country_name: "Pakistan",
      country_image: null,
      status: 1,
      created_at: "2022-09-26T18:13:29.000Z",
      updated_at: null,
    },
    {
      country_id: 4,
      country_name: "South Africa",
      country_image: null,
      status: 1,
      created_at: "2022-09-26T18:13:29.000Z",
      updated_at: null,
    },
    {
      country_id: 5,
      country_name: "Afghanistan",
      country_image: null,
      status: 1,
      created_at: "2022-09-26T18:13:29.000Z",
      updated_at: null,
    },
    {
      country_id: 6,
      country_name: "Australia",
      country_image: null,
      status: 1,
      created_at: "2022-09-26T18:13:29.000Z",
      updated_at: null,
    },
    {
      country_id: 7,
      country_name: "England",
      country_image: null,
      status: 1,
      created_at: "2022-09-26T18:13:29.000Z",
      updated_at: null,
    },
    {
      country_id: 8,
      country_name: "New Zealand",
      country_image: null,
      status: 1,
      created_at: "2022-09-26T18:13:29.000Z",
      updated_at: null,
    },
    {
      country_id: 9,
      country_name: "TBD",
      country_image: null,
      status: 1,
      created_at: "2022-09-26T18:13:29.000Z",
      updated_at: null,
    },
    {
      country_id: 10,
      country_name: "TBD",
      country_image: null,
      status: 1,
      created_at: "2022-09-26T18:13:29.000Z",
      updated_at: null,
    },
    {
      country_id: 11,
      country_name: "TBD",
      country_image: null,
      status: 1,
      created_at: "2022-09-26T18:13:29.000Z",
      updated_at: null,
    },
    {
      country_id: 12,
      country_name: "TBD",
      country_image: null,
      status: 1,
      created_at: "2022-09-26T18:13:29.000Z",
      updated_at: null,
    },
  ];

  const onPress = (id) => {
    const country = countryList[id];
    // console.log("new country is  ", country);
    const newTeam = {
      team_name: team.team_name,
      user_id: team.user_id,
      country_id: country && country.country_id,
      country_name: country && country.country_name,
    };

    dispatch(addTeam(newTeam));
    navigation.navigate("ViewPlayers");
  };
  return (
    <Provider>
      <Header navigation={navigation} />
      <ImageBackground
        resizeMode="cover"
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          position: "relative",
        }}
        source={require("../../../assets/image_2.png")}
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
        <SafeAreaView
        // style={{flex:1, width: "100%", height: "100%" }}
        >
          <View style={styles.container}>
            <Text style={{ color: "white", fontSize: 18 }}>
              SELECT 11 PLAYER
            </Text>
            <TextInput style={styles.inputDesign} placeholder="Search Player" />

            <View style={{ marginTop: 20, width: "100%", alignSelf: "center" }}>
              <View style={styles.flagRow}>
                <Pressable onPress={() => onPress(5)} style={styles.flagSec}>
                  <Image
                    resizeMode="contain"
                    style={{ width: "100%", height: 70 }}
                    source={require("../../../assets/aus_flag.png")}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginTop: 7,
                    }}
                  >
                    Australia
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => onPress(6)}
                  style={styles.flagSec}
                >
                  <Image
                    resizeMode="contain"
                    style={{ width: "100%", height: 70 }}
                    source={require("../../../assets/eng_flag.png")}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginTop: 7,
                    }}
                  >
                    England
                  </Text>
                </Pressable>
              </View>
              <View style={styles.flagRow}>
                <Pressable
                  onPress={() => onPress(0)}
                  style={styles.flagSec}
                >
                  <Image
                    resizeMode="contain"
                    style={{ width: "100%", height: 70 }}
                    source={require("../../../assets/bd-flag.png")}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginTop: 7,
                    }}
                  >
                    Bangladesh
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => onPress(7)}
                  style={styles.flagSec}
                >
                  <Image
                    resizeMode="contain"
                    style={{ width: "100%", height: 70 }}
                    source={require("../../../assets/newz_flag.png")}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginTop: 7,
                    }}
                  >
                    New Zealand
                  </Text>
                </Pressable>
              </View>
              <View style={styles.flagRow}>
                <Pressable
                  onPress={() => onPress(2)}
                  style={styles.flagSec}
                >
                  <Image
                    resizeMode="contain"
                    style={{ width: "100%", height: 70 }}
                    source={require("../../../assets/pak_flag.png")}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginTop: 7,
                    }}
                  >
                    Pakistan
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => onPress(4)}
                  style={styles.flagSec}
                >
                  <Image
                    resizeMode="contain"
                    style={{ width: "100%", height: 70 }}
                    source={require("../../../assets/afg_flag.png")}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginTop: 7,
                    }}
                  >
                    Afghanistan
                  </Text>
                </Pressable>
              </View>
              <View style={styles.flagRow}>
                <Pressable
                  onPress={() => onPress(1)}
                  style={styles.flagSec}
                >
                  <Image
                    resizeMode="contain"
                    style={{ width: "100%", height: 70 }}
                    source={require("../../../assets/ind_flag.png")}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginTop: 7,
                    }}
                  >
                    India
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() =>onPress(3)}
                  style={styles.flagSec}
                >
                  <Image
                    resizeMode="contain"
                    style={{ width: "100%", height: 70 }}
                    source={require("../../../assets/sou_flag.png")}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginTop: 7,
                    }}
                  >
                    South Africa
                  </Text>
                </Pressable>
              </View>
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
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  inputDesign: {
    color: "white",
    backgroundColor: "white",
    width: "80%",
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginTop: 10,
  },
  flagRow: {
    flexDirection: "row",
    width: "100%",
    // height:"100%",
    justifyContent: "space-between",
    // alignItems:"center"
    marginTop: 15,
  },
  flagSec: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
