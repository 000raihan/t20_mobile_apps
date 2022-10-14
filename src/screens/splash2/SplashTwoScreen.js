import React, { useEffect } from "react";
import { TextInput, StyleSheet, Text, Image, ImageBackground } from "react-native";
import { View } from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../../../constants/colors";

const SplashTwoScreen = ({navigation}) => {

    useEffect(()=>{
        // alert("IM called")
        setTimeout(() => navigation.navigate("MainNavigatorScreen"), 5000); 
    },[navigation])

    return (

        <View style={{flex:1, width: "100%", alignItems: "center" }}>
            <Image style={{height:"100%", width:"100%"}} source={require("../../../assets/splash_two.png")}/>
        </View>
    );
};

const styles = StyleSheet.create({

    

});

export default SplashTwoScreen;
