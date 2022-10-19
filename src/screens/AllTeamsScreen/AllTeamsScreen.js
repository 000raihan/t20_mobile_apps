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
  Pressable, Alert,
} from "react-native";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import { Header } from "./components/Header";
import colors from "../../../constants/colors";
import { addTeam } from "../../store/features/teamSlice";
import { Storage } from 'expo-storage';
import { CallApi } from "./api/Api";
import {FLAG_IMAGE_URL} from "../../utils/BaseUrl";

export const AllTeamsScreen = (props) => {

  const { isEdit } = props.route.params === undefined ? false : props.route.params;
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    (async () => {

      await getCountryList();
    })();
  }, []);

  const getCountryList = async () => {
    CallApi.country_list().then(async (result) => {
      if (result.success) {
        // console.log(result.result)
        setCountryList(result.result);
      } else {
        Alert.alert('Error', result.message, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        // console.log("error", result.error);
      }
    }, (error) => {
      console.log("=====", error)
      alert("Invalid data.");
    }
    );
  }

  const onPress = (country) => {
    console.log("country is : ", country)
    props.navigation.navigate("ViewPlayersScreen", { country_id: country.country_id, country_name: country.country_name, isEdit: isEdit });
  };

  console.log(countryList);

  return (
    <Provider>
      <Header navigation={props.navigation} isEdit={isEdit} />
      <ImageBackground
        resizeMode="cover"
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          position: "relative",
        }}
        source={require("../../../assets/cricket2.png")}
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

        <ScrollView>
          <View style={styles.container}>
            <Text style={{ color: "white", fontSize: 18 }}>
              Select your best 11 from below countries
            </Text>

              <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", justifyContent: "space-between" }}>

                {
                  countryList.map((country) => (
                    <Pressable onPress={() => onPress(country)} style={{ width: "48%", alignItems: "center", marginTop: 20 }}>
                      <Image
                        resizeMode="contain"
                        style={{ width: "100%", height: 70 }}
                        source={{uri: `${FLAG_IMAGE_URL}/${country.country_image}`}}
                      />
                      <Text
                        style={{
                          color: "white",
                          fontSize: 15,
                          fontWeight: "bold",
                          marginTop: 7,
                        }}
                      >
                        {country.country_name}
                      </Text>
                    </Pressable>
                  ))
                }

              </View>


          </View>
        </ScrollView>
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
    marginBottom: 10
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
});
