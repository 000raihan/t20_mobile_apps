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
  TextInput,
  ImageBackground,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import { Header } from "../HomeScreen/components/Header";
import colors from "../../../constants/colors";

export const AllTeamsScreen = ({ navigation }) => {
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
             <Text style={{color:"white", fontSize:18}}>SELECT 11 PLAYER</Text>
             <TextInput style={styles.inputDesign} placeholder="Search Player"/>

            <View style={{marginTop:20, width:"100%", alignSelf:"center"}}>
                <View style={styles.flagRow}>
                    <View style={styles.flagSec}>
                        <Image resizeMode="contain" style={{width:"100%", height:70}} source={require("../../../assets/aus_flag.png")}/>
                        <Text style={{color:"white", fontSize:15, fontWeight:"bold", marginTop:7}}>Australia</Text>
                    </View>
                    <View style={styles.flagSec}>
                        <Image resizeMode="contain" style={{width:"100%", height:70}} source={require("../../../assets/eng_flag.png")}/>
                        <Text style={{color:"white", fontSize:15, fontWeight:"bold", marginTop:7}}>England</Text>
                    </View>
                </View>
                <View style={styles.flagRow}>
                    <View style={styles.flagSec}>
                        <Image resizeMode="contain" style={{width:"100%", height:70}} source={require("../../../assets/bd-flag.png")}/>
                        <Text style={{color:"white", fontSize:15, fontWeight:"bold", marginTop:7}}>Bangladesh</Text>
                    </View>
                    <View style={styles.flagSec}>
                        <Image resizeMode="contain" style={{width:"100%", height:70}} source={require("../../../assets/newz_flag.png")}/>
                        <Text style={{color:"white", fontSize:15, fontWeight:"bold", marginTop:7}}>New Zealand</Text>
                    </View>
                </View>
                <View style={styles.flagRow}>
                    <View style={styles.flagSec}>
                        <Image resizeMode="contain" style={{width:"100%", height:70}} source={require("../../../assets/pak_flag.png")}/>
                        <Text style={{color:"white", fontSize:15, fontWeight:"bold", marginTop:7}}>Pakistan</Text>
                    </View>
                    <View style={styles.flagSec}>
                        <Image resizeMode="contain" style={{width:"100%", height:70}} source={require("../../../assets/afg_flag.png")}/>
                        <Text style={{color:"white", fontSize:15, fontWeight:"bold", marginTop:7}}>Afghanistan</Text>
                    </View>
                </View>
                <View style={styles.flagRow}>
                    <View style={styles.flagSec}>
                        <Image resizeMode="contain" style={{width:"100%", height:70}} source={require("../../../assets/ind_flag.png")}/>
                        <Text style={{color:"white", fontSize:15, fontWeight:"bold", marginTop:7}}>India</Text>
                    </View>
                    <View style={styles.flagSec}>
                        <Image resizeMode="contain" style={{width:"100%", height:70}} source={require("../../../assets/sou_flag.png")}/>
                        <Text style={{color:"white", fontSize:15, fontWeight:"bold", marginTop:7}}>South Africa</Text>
                    </View>
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
    alignItems:"center",
    justifyContent:"center",
    paddingTop:10
  },
  inputDesign: {
    color: "white",
    backgroundColor: "white",
    width: "80%",
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius:50,
    marginTop:10
  },
  flagRow:{
    flexDirection:"row",
    width:"100%",
    // height:"100%",
    justifyContent:"space-between",
    // alignItems:"center"
    marginTop:15
  },
  flagSec:{
    flex:1,
    width:"100%",
    alignItems:"center"
  }
});
