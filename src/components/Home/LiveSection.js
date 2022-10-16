import React from "react";
import { TextInput, StyleSheet, Text, Image, Pressable } from "react-native";
import { View } from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import WebView from 'react-native-webview'

import colors from "../../../constants/colors";

const LiveSection = (props) => {
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
    `;
  return (
    <View style={styles.container}>
      <WebView
        style={{ margin: 5, height: 400, width: 400, backgroundColor: "black" }}
        originWhitelist={['*']}
        source={{ uri: "https://www.google.com/search?q=cricket&sxsrf=ALiCzsbGXZdHKwen-b9C9Po289cxVi0CnA%3A1665893600200&source=hp&ei=4IRLY9exCcOaseMPwdeR4As&iflsig=AJiK0e8AAAAAY0uS8JMZu6axGyjzaA_3ntwnEKypeBQ7&oq=cric&gs_lcp=Cgdnd3Mtd2l6EAMYATIECAAQQzIKCAAQsQMQgwEQQzIECAAQQzIKCAAQsQMQgwEQQzIKCAAQsQMQgwEQQzIKCAAQsQMQgwEQQzILCAAQgAQQsQMQgwEyCwgAEIAEELEDEIMBMg4ILhCABBCxAxCDARDUAjILCAAQgAQQsQMQgwE6BwgjEOoCECc6DQguEMcBENEDEOoCECc6BAgjECc6BAguECc6BQgAEIAEOhEILhCABBCxAxCDARDHARDRAzoKCC4QxwEQ0QMQQ1D7Jli0PGDxS2gBcAB4AIABuQGIAcoFkgEDMC40mAEAoAEBsAEK&sclient=gws-wiz#sie=m;/g/11rndps6wp;5;/m/026y268;dt;fp;1;;;" }}
        onMessage={(event) => { }}
        injectedJavaScript={runFirst}
        injectedJavaScriptBeforeContentLoaded={runFirst}
      // source={{ uri: "http://116.68.200.97:6044/mobile_view/previous_match" }}
      />
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
      <Pressable onPress={() => onClickView()} style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: colors.primary, marginTop: 5 }}>
        <Text style={{ color: "white" }}>View Details</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    minHeight: 130,
    paddingVertical: 5,
    // borderBottomWidth: 1,
    marginVertical: 10,
  },
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
