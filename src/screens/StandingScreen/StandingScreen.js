import React, { useEffect } from 'react';
import { Portal, Provider } from 'react-native-paper';
import {View, StyleSheet, Text, Dimensions, Platform, FlatList, ScrollView, useWindowDimensions} from 'react-native';
import Colors from '../../utils/Colors';
import {Header} from "../NotificationScreen/components/Header";
import { Table, Row, Rows } from 'react-native-table-component';
import { WebView } from 'react-native-webview';
import colors from '../../../constants/colors';
import TableView from '../../components/Standings/TableView';

export const StandingScreen = ({ navigation }) => {


    return (
        <Provider>
      <Header navigation={navigation} />
      <View style={{backgroundColor:colors.primary, justifyContent:"center", alignItems:"center", padding:10}}>
          <Text style={{color:colors.red, fontWeight:"bold",fontSize:16}}>STANDINGS</Text>

        </View>
      <View style={styles.container}>
        <TableView/>
      </View>
    </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      width:"90%",
      alignSelf:"center"
    },
  });
