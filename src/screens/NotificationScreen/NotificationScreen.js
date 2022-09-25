import React, { useEffect } from 'react';
import { Portal, Provider } from 'react-native-paper';
import {View, StyleSheet, Text, Dimensions, Platform, FlatList, ScrollView, useWindowDimensions} from 'react-native';
import Colors from '../../utils/Colors';
import {Header} from "../NotificationScreen/components/Header";
import { Table, Row, Rows } from 'react-native-table-component';
import { WebView } from 'react-native-webview';

export const NotificationScreen = ({ navigation }) => {


    return (
        <Provider>
            <View style={styles.container}>
                <Header
                    navigation={navigation}
                />
               <Text>Notification</Text>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    }
});
