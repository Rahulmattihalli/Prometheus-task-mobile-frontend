/**
 * @author Ali Burhan Keskin <alikeskin@milvasoft.com>
*/
import * as React from 'react';
import Profile from '@screens/ProfileStack/Profile';

import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import Routes, { ProfileStackParams } from '@utils/Routes';
import translate from '@helpers/localization';
import { enableScreens } from 'react-native-screens';
import { useTheme } from '@src/hooks';

enableScreens();

const Stack = createStackNavigator<ProfileStackParams>();

const screenOptions: StackNavigationOptions = {
  gestureEnabled: true,
  gestureResponseDistance: Dimensions.get('screen').width,
  headerShown: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyle: { backgroundColor: '#FFF', },
  headerTitleStyle: { fontFamily: 'Bold', }, 
  headerTitleAlign: 'center'    
};

function ProfileStack() {

  const theme = useTheme();
  return (
    <Stack.Navigator initialRouteName={Routes.Profile} screenOptions={{ ...screenOptions, headerTintColor: theme.primary }}>

      <Stack.Screen
        name={Routes.Profile}
        component={Profile}
        options={{
          headerTitle: translate('navigation.profile'),
          headerShown: false,
        }}
      />

     

    </Stack.Navigator>
  );

}

export default React.memo(ProfileStack);

