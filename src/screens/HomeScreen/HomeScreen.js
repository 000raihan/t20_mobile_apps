import React, { useEffect } from "react";
import { Portal, Provider } from "react-native-paper";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  FlatList,
  ScrollView,
  useWindowDimensions,
  Button,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import colors from "../../../constants/colors";
import { Header } from "./components/Header";
import { Table, Row, Rows } from "react-native-table-component";
import { WebView } from "react-native-webview";
import MainButton from "../../components/MainButton";
import LiveSection from "../../components/Home/LiveSection";
import MatchButtons from "../../components/Home/MatchButtons";
import { useDispatch, useSelector } from "react-redux";


export const HomeScreen = ({ navigation }) => {

  const user = useSelector(state=> state.user.user);

  console.log("User Pofile", user)

  const onPress = ()=>{
    navigation.navigate("TeamScreen")
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View style={{backgroundColor:"black"}}>
          <ImageBackground
            source={require("../../../assets/point_bg.png")}
            style={styles.pointBg}
          >
            <View style={styles.pointTextSec}>
              <Text style={styles.pointName}>Rahim Dream 11</Text>
              <Text
                style={{
                  color: "red",
                  fontSize: 80,
                  fontWeight: "bold",
                  margin: -10,
                }}
              >
                1110
              </Text>
              <Text style={{ color: "white", fontSize: 20 }}>Team Points</Text>
              <MainButton onPress={onPress}>View details</MainButton>
            </View>
          </ImageBackground>
        </View>
        <LiveSection />
        <MatchButtons />

        <View style={{ width: "90%", alignSelf: "center" }}>
          <Image
            style={{ width: "100%", height:100, resizeMode: "cover" }}
            source={require("../../../assets/exium_logo.png")}
          />
        </View>

        <View style={styles.highlightMatch}>
          <ImageBackground
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              opacity:0.8
            }}
            source={require("../../../assets/point_bg.png")}
          >
            <Pressable  style={{backgroundColor:colors.yellow, colors:"white"}}>
                <Text style={{padding:10, color:"white"}}>MATCH HIGHLIGHT</Text>
            </Pressable>
          </ImageBackground>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  pointBg: {
    width: "100%",
    height: 180,
    opacity:0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  pointTextSec: {
    width: "80%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  pointName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  highlightMatch: {
    marginTop:10,
    alignSelf: "center",
    backgroundColor: "black",
    width: "90%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
