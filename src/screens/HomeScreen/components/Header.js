import React from "react";
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "react-native-paper";
import { useSelector } from 'react-redux';

const { height } = Dimensions.get("window");
const HEADER_MIN_HEIGHT = Platform.OS === "android" ? 70 : height > 667 ? 80 : 70;
export const Header = ({navigation}) => {

    return (
        <View style={styles.topBar}>
            <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
            >
                <Ionicons
                    name='ios-menu'
                    size={30}
                    color={Colors.white}
                />
            </TouchableOpacity>
            <View>
                <Image
                    source={require('../../../../assets/t20_logo.png')}
                    style={{
                        width: height < 668 ? 130 : 120,
                        resizeMode: 'contain',
                        height: 45,
                    }}
                />
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("NotificationScreen")}
            >
                <View style={{width:30, height: 30}}>
                <Ionicons
                    name='notifications-outline'
                    size={25}
                    color={Colors.white}
                    style={{
                        marginTop:5
                    }}
                />
                </View>

            </TouchableOpacity>
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
        backgroundColor: '#1A0B55'
    },
    goBackIcon: {
        width: 40,
    },
    shareIcon: {
        width: 40,
        alignItems: "flex-end",
    },
});