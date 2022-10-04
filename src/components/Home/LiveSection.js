import React from "react";
import { TextInput, StyleSheet, Text, Image } from "react-native";
import { View } from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../../../constants/colors";

const LiveSection = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.live}>
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
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        {/* -------------- */}
        <Text
          style={{ marginHorizontal: 10, fontSize: 20, fontWeight: "bold" }}
        >
          VS
        </Text>
        {/* ------------------ */}
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
        {/* --------------------------- */}
      </View>
      <View>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor:"white",
    paddingHorizontal:10,
    paddingVertical:5,
    borderBottomWidth: 1,
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
