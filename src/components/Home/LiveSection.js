import React, {useEffect, useRef} from "react";
import { TextInput, StyleSheet, Text, Image, Pressable, Animated, Dimensions } from "react-native";
import { View } from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import WebView from 'react-native-webview'

import colors from "../../../constants/colors";
const { width, height } = Dimensions.get("window");

const LiveSection = (props) => {


  const fadeAnim = useRef(new Animated.Value(1)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 25000,
        }
    ).start();
  }, [fadeAnim])



  const onClickView = () => {
    console.log("Im clicked")
    props.navigation.navigate("ViewDetailsScreen")
  }
  // console.log("SOURCE : ", props.match_url);
  const runFirst = `
  var appBanners = document.getElementsByClassName('lr-imso-fix');
  for (var i = 0; i < appBanners.length; i ++) {
      appBanners[i].style.display = 'none';
  }
  var appBanners1 = document.getElementsByClassName('imso_mh__score-sum');
  for (var i = 0; i < appBanners1.length; i ++) {
      appBanners1[i].style.display = 'none';
  }
  var appBanners2 = document.getElementsByClassName('imso_mh__mh-wp');
  for (var i = 0; i < appBanners2.length; i ++) {
      appBanners2[i].style.display = 'none';
  }
  var appBanners3 = document.getElementsByClassName('mc-nav');
  for (var i = 0; i < appBanners3.length; i ++) {
      appBanners3[i].style.display = 'none';
  }
  var appBanners4 = document.getElementsByClassName('js-scorebox-content');
  for (var i = 0; i < appBanners4.length; i ++) {
      appBanners4[i].style.marginTop = "-55px";
  }
  `;
  return (
    <View style={{
      width: "100%",
      // alignSelf: "center",
      alignItems: "center",

      backgroundColor: "white",
      height: 280,
      justifyContent:"space-between",
      // height:"auto",
      // paddingVertical: 5,
      // borderBottomWidth: 1,
      // marginVertical: 10,
      marginBottom:10
    }}>
        <WebView
            style={{ height: 200, width:width, backgroundColor: "black" }}
            originWhitelist={['*']}
            // source={{ uri: props.match_url }}
            onMessage={(event) => { }}
            injectedJavaScript={runFirst}
            injectedJavaScriptBeforeContentLoaded={runFirst}
            containerStyle={{ backgroundColor: 'white' }}
            // source={{ uri: "https://www.google.com/search?q=t20+world+cup+2022+live+score&rlz=1C5CHFA_enBD980BD980&ei=io1LY_6dCsmcseMP-bG0IA&ved=0ahUKEwj-iubD-eP6AhVJTmwGHfkYDQQQ4dUDCA4&uact=5&oq=t20+world+cup+2022+live+score&gs_lcp=Cgdnd3Mtd2l6EAMyCwgAEIAEELEDEIMBMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgoIABBHENYEELADOgcIABCwAxBDOgwILhDIAxCwAxBDGAE6CggAELEDEIMBEEM6BwgAELEDEEM6BAgAEEM6BwgAEMkDEEM6CAgAELEDEIMBSgQIQRgASgQIRhgBUMECWJxHYIZOaAFwAXgAgAGpAYgBlAKSAQMwLjKYAQCgAQGgAQLIARHAAQHaAQYIARABGAg&sclient=gws-wiz#sie=m;/g/11rndps6wp;5;/m/026y268;dt;fp;1;;;" }}
            source={{ uri: "https://www.t20worldcup.com/match/100467#overview" }}
            scrollEnabled={false}
        />
        <Animated.View style={{
          position: 'absolute',
          marginTop: 0,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: fadeAnim,
          width: '100%',
          height: 240,
          backgroundColor:'white',
        }}>

        </Animated.View>


      {/* <View style={styles.live}>
        <Text
          style={{
            width: "100%",
            fontSize: 16,
            color: "white",
            overflow: "hidden",
          }}
        >
          Live
        </Text>
      </View> */}
      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "50%",
            marginVertical: 10,
          }}
        >
          <View style={{ flex: 4 }}>
            <Image
              style={{ width: "100%", height: 40 }}
              source={require("../../../assets/bd-flag.png")}
            />
            <Text>Bangladesh</Text>
          </View>
          <View style={{ flex: 3 }}>
            <LinearGradient
              // Button Linear Gradient
              colors={[colors.red, "transparent"]}
              start={[0, 1]}
              end={[1, 0]}
              style={{ borderBottomRightRadius: 50, borderTopRightRadius: 50 }}
            >
              <Text
                style={{
                  padding: 5,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.primary,
                  textAlign:"center"
                }}
              >
                65/7
              </Text>
            </LinearGradient>
            <Text style={{ marginHorizontal: 8, marginVertical: 4 }}>
              20 OVR
            </Text>
          </View>
        </View>
        <Text
          style={{ marginHorizontal: 10, fontSize: 20, fontWeight: "bold" }}
        >
          VS
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "50%",
            marginVertical: 10,
          }}
        >
          <View style={{ flex: 3 }}>
            <LinearGradient
              // Button Linear Gradient
              colors={[colors.red, "transparent"]}
              start={[0, 1]}
              end={[1, 0]}
              style={{ borderBottomLeftRadius: 50, borderTopLeftRadius: 50 }}
            >
              <Text
                style={{
                  padding: 5,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.primary,
                  textAlign:"center"
                }}
              >
                65/7
              </Text>
            </LinearGradient>
            <Text style={{ marginHorizontal: 8, marginVertical: 4 }}>
              20 OVR
            </Text>
          </View>
          <View style={{ flex: 4 }}>
            <Image
              style={{ width: "100%", height: 40 }}
              source={require("../../../assets/sr-flag.jpg")}
            />
            <Text style={{textAlign:"right"}}>Srilanka</Text>
          </View>
        </View>
      </View> */}
      {/* <View>
        <Text
          style={{
            width: "100%",
            fontSize:12,
            color: colors.red,
            overflow: "hidden",
          }}
        >
         Ban WON by 3 Runs
        </Text>
      </View> */}
      <Pressable onPress={() => onClickView()} style={{width:"100%",marginBottom:0, paddingVertical:6, flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        <Text style={{color: colors.primary,fontWeight:"bold", textAlign:"center" }}>View Details</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  live: {
    backgroundColor: colors.red,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 200,
    width: 350,
  },
});

export default LiveSection;