import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppNavigator } from './src/navigation';
import * as SplashScreen from 'expo-splash-screen';
//Reducer
//import {} from './src/reducers';

const rootReducer = combineReducers({
  
});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Roboto-Bold': require('./assets/Fonts/Roboto-Bold.ttf'),
          'Roboto-BoldItalic': require('./assets/Fonts/Roboto-BoldItalic.ttf'),
          'Roboto-Italic': require('./assets/Fonts/Roboto-Italic.ttf'),
          'Roboto-LightItalic': require('./assets/Fonts/Roboto-LightItalic.ttf'),
          'Roboto-Medium': require('./assets/Fonts/Roboto-Medium.ttf'),
          'Roboto-MediumItalic': require('./assets/Fonts/Roboto-MediumItalic.ttf'),
          'Roboto-Regular': require('./assets/Fonts/Roboto-Regular.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // setAppIsReady(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, []);

  return (
      <Provider store={store}>
        <StatusBar style='light' />
        <AppNavigator />
      </Provider>
  );
}