import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import Login from '@screens/Login';
import { useAppSelector } from '@utils/redux/store';
import { Dimensions } from 'react-native';
import translate from '@helpers/localization';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes, { RootStackParams } from '@utils/Routes';
import { useTheme } from '@src/hooks';
import { navigationRef } from './Router';
import Signup from '@screens/Signup';
import Profile from '@screens/ProfileStack/Profile';

enableScreens();

const Stack = createStackNavigator<RootStackParams>();

const screenOptions: StackNavigationOptions = {
  gestureEnabled: true,
  gestureResponseDistance: Dimensions.get('screen').width,
  headerShown: true,
  headerStyle: { backgroundColor: '#FFF', },
  headerTitleStyle: { fontFamily: 'Bold', },  
  headerTitleAlign: 'center'     
};

const mainTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};

function RootNavigation() {

  const isSignedIn = useAppSelector((s) => s.AppReducer?.isSignedIn);
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={mainTheme}>

        <Stack.Navigator
          initialRouteName={isSignedIn ? Routes.Home : Routes.Login} 
          screenOptions={{ ...screenOptions, headerTintColor: theme.primary }}
        >


              <>

                <Stack.Screen
                  name={Routes.Login} 
                  component={Login} 
                  options={{ headerShown: false }} 
                />
 <Stack.Screen
                  name={Routes.Signup} 
                  component={Signup} 
                  options={{ headerShown: false }} 
                />
 <Stack.Screen
                  name={Routes.Profile} 
                  component={Profile} 
                  options={{ headerShown: false }} 
                />
              </>
    

        </Stack.Navigator>

      </NavigationContainer>
    </SafeAreaProvider>
  );

}

export default React.memo(RootNavigation);

// import * as Linking from 'expo-linking';
// import * as Notifications from 'expo-notifications';
// const prefix = Linking.createURL('/');

// const notificationType = {
//   Post: 1,
// };

// // Change ip
// const baseUrl = 'exp://111.111.111.111:19000/--';

// const config = {
//   screens: {
//     Home: {
//       screens: {
        
//         Profile: {

//           screens: {
//             Post: 'mypost/:id',
//           },

//         }

//       },
//     },   
//   },
// };

// const _linking = {
//   prefixes: [prefix],
//   config,
//   subscribe(listener) {

//     const onReceiveURL = ({ url }) => listener(url);

//     Linking.addEventListener('url', onReceiveURL);

//     const subscription = Notifications.addNotificationResponseReceivedListener((response) => {

//       // From API
//       const data = response?.notification?.request?.content.data;

//       if (data?.NotificationId === notificationType.Post) {

//         listener(`${baseUrl}/mypost/${data?.Data}`);

//       }

//     });

//     return () => {

//       Linking.removeEventListener('url', onReceiveURL);

//       subscription.remove();

//     };

//   },
// };
