import React from "react";
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "react-native-paper";
import { useSelector } from 'react-redux';
import colors from "../../../../constants/colors";

const { height } = Dimensions.get("window");
const HEADER_MIN_HEIGHT = Platform.OS === "android" ? 70 : height > 667 ? 80 : 70;
export const Header = (props) => {

    const {navigation, title} = props
  
    return (
        <View style={styles.topBar}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{flex:1}}
            >
                <Ionicons
                    name='ios-arrow-back'
                    size={30}
                    color={Colors.white}
                />
            </TouchableOpacity>
            <View style={{flex:1,flexDirection:"row", alignItems:"center",justifyContent:"center", overflow:"hidden"}}>
                {/* <Image
                    source={require('../../../../assets/bd-flag.png')}
                    resizeMode="contain"
                    style={{
                        flex:1,
                        width: "100%",
                        resizeMode: 'contain',
                        height: 30,
                    }}
                /> */}
                <Text style={{fontSize:15, color:"white"}}>{title ? title : "Country Name"}</Text>
            </View>
           <View style={{flex:1}}>
           
           </View>
        </View>
    );
}
const styles = StyleSheet.create({
    topBar: {
        paddingTop: Platform.OS === "android" ? 30 : 25,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center",
        height: HEADER_MIN_HEIGHT,
        zIndex: 1000,
        backgroundColor: colors.primary
    },
    goBackIcon: {
        width: 40,
    },
    shareIcon: {
        width: 40,
        alignItems: "flex-end",
    },
});
