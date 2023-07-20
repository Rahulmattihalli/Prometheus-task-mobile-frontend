/**
 * @author Ali Burhan Keskin <alikeskin@milvasoft.com>
*/
import React, { useCallback } from 'react';
import {
  Text, 
  View, 
  StyleSheet,
  Button 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@utils/redux/store';
import { navigate } from '@src/routers/Router';
import Routes, { ProfileStackParams } from '@src/utils/Routes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';

function Profile() {

  const {userreducer} = useSelector((state)=>{return state})
  const navigation = useNavigation<StackNavigationProp<ProfileStackParams>>();

  const goToSettings = useCallback(() => navigate(Routes.Settings), []);

  const goToLogin = useCallback(() => navigation.navigate(Routes.Login), [navigation]);
 
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.root}>

        <Text style={styles.fontBlack}>
          PROFILE SCREEN
        </Text>


      <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Ionicons name="person" size={32} color="green" style={{margin:15,fontSize:100}}/>
        <Text style={styles.textNormal}>
          {userreducer.name}
        </Text>
        <Text style={styles.textNormal}>
          {userreducer.email}
        </Text>
        
        </View>

        <View style={styles.siginButton}>

          

        </View>
        
        <View style={styles.siginButton}>

          <Button onPress={goToLogin} title=" Logout " />

        </View>              

      </View>
    </SafeAreaView>
  );

}

export default Profile;

const styles = StyleSheet.create({
  
  safeView: {
    flex: 1,
  },

  root: {
    flex: 1,
    justifyContent: 'space-evenly', 
    alignItems: 'center'
  },

  textNormal:{
    fontSize:25,
   marginTop:20

  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  fontBlack: {
    fontFamily: 'Black',
    fontSize:30,
    marginBottom:50
  },

  counter: {
    marginTop: 30,
    fontSize: 30, 
    color: 'red'
  },

  button: {
    marginTop: 20
  },

  siginButton: {
    marginTop: 50,
  },

});
