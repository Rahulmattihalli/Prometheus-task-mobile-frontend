/**
 * @author Ali Burhan Keskin <alikeskin@milvasoft.com>
 */
import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Platform } from 'react-native';
import RootNavigation from './src/routers';
import CustomProvider from './src/providers';
import Store from './src/store';
  
enableScreens();
 
function App() {

  useEffect(() => {

    if (Platform.OS !== 'web') {

      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    }

  }, []);

  return (
    <Provider store={Store}>

        <RootNavigation />

    </Provider>
  );

}

export default App;

