import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    Image,
    StatusBar,
    Alert,
    Text,
    Platform,
} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "react-native-paper";
import Colors from "../utils/Colors";
import * as SecureStore from "expo-secure-store";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import CustomText from "../components/UI/CustomText";

import colors from "../../constants/colors";

export default (props) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect( ()=>{
        (async() => {
            const user = await SecureStore.getItemAsync("userDetails");
            setUserDetails(user);
        }) ();
    },[]);

    const Logout = () => {
        Alert.alert("Logout", "Do you want to logout?", [
            {
                text: "No",
                style: "cancel",
            },
            {
                text: "Yes",
                onPress: async () => {
                    await SecureStore.deleteItemAsync("userDetails");
                    props.navigation.navigate("LoginScreen");
                },
            },
        ]);
    };
    const {state, ...rest} = props;
    const newState = {...state}; //copy from state before applying any filter. do not change original state
    // newState.routes = newState.routes.filter((item) => item.name !== 'Profile'); //replace "Login' with your route name

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={{display:'flex', flexDirection:'row', backgroundColor: "#003852", marginVertical: 0}}>
                    <Image
                        style={{
                            resizeMode: "contain",
                            width: 50,
                            height: 50,
                            marginLeft: 10
                        }}
                        source={require("../../assets/Images/ic_profile.png")}
                    />
                    {/* <View style={{marginLeft: 10}}>
                        <Text style={{fontSize:18, color: "#ffffff"}}>S.M Nazmul (6001)</Text>
                        <Text style={{fontSize:12, color: "#ffffff"}}>Sales Representative</Text>
                    </View> */}
                </View>
                <View
                    style={{
                        marginTop: 5,
                        marginBottom: 4,
                        borderBottomColor: '#00537c',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <View>
                    <DrawerItemList state={newState} {...rest} />
                    <Drawer.Section style={styles.drawerSection}></Drawer.Section>
                </View>
                {
                    userDetails !== null ?
                        <DrawerItem
                            onPress={Logout}
                            label={() => (
                                <View style={styles.logout}>
                                    <MaterialCommunityIcons
                                        name="logout"
                                        size={25}
                                        style={{ marginRight: 30 }}
                                        color={Colors.white}
                                    />
                                    <CustomText
                                        style={{
                                            fontSize: 14,
                                            color: Colors.white,
                                            fontWeight: "500",
                                            fontFamily: "Roboto-Medium",
                                        }}
                                    >
                                        Logout
                                    </CustomText>
                                </View>
                            )}
                        />
                        : null
                }
                <View style={{flex: 1,alignItems:'center', justifyContent:'center', marginTop: 30}}>
                    <Image
                        style={styles.logo}
                        source={require("../../assets/t20_logo.png")}
                    />
                </View>
            </DrawerContentScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginVertical: 20,
    },
    profilePic: {
        resizeMode: Platform.OS === "android" ? "cover" : "contain",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    logo: {
        resizeMode: "contain",
        width: "40%",
        height: 50,
    },
    logoutSection: {
        backgroundColor: Colors.lighter_green,
        borderRadius: 5,
        marginHorizontal: 10,
        height: 50,
        marginVertical: 20,
    },
    actionButton: {
        flexDirection: "row",
        marginHorizontal: 10,
        height: 40,
        marginBottom: 10,
    },
    drawerSection: {
        marginTop: 10,
    },
    social: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
    },
    logout: {
        flexDirection: "row",
        alignItems: "center",
    },
    version: {
        height: 60,
        borderTopWidth: 1,
        borderTopColor: Colors.light_grey,
    },
});
