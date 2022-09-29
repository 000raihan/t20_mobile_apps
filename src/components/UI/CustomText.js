import React from "react";
import { Text, StyleSheet } from "react-native";
const CustomText = (props) => {
    return (
        <Text
            allowFontScaling={false}
            selectable={props.selectable}
            style={{ ...styles.text, ...props.style }}
        >
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        fontFamily: "Roboto-Regular",
    },
});

export default CustomText;
