import React from "react";
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "react-native-paper";
import { useSelector } from 'react-redux';
import colors from "../../../../constants/colors";

const { height } = Dimensions.get("window");
const HEADER_MIN_HEIGHT = Platform.OS === "android" ? 70 : height > 667 ? 80 : 70;
export const Header = ({navigation}) => {


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
            <View style={{flex:1}}>
                <Image
                    source={require('../../../../assets/t20_logo.png')}
                    style={{
                        width: height < 668 ? 130 : 120,
                        resizeMode: 'contain',
                        height: 45,
                    }}
                />
            </View>
           <View style={{flex:1}}>
           
           </View>
        </View>
    );
}
const styles = StyleSheet.create({
    topBar: {
        paddingTop: Platform.OS === "android" ? 15 : 25,
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
