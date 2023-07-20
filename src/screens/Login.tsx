/**
 * @author Ali Burhan Keskin <alikeskin@milvasoft.com>
*/
import React, { useCallback, useEffect } from 'react';
import { showToast } from '@src/modules/app/services/appService';
import { wp } from '@helpers/responsive';
import {
  View, 
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { dispatcher } from '@helpers/redux';
import { SetUser } from '@modules/app/redux/appSlice';
import { TextInput } from 'react-native-gesture-handler';
import { navigate } from '@routers/Router';
import Routes from '@utils/Routes';
import { useState } from 'react';
import {  Snackbar } from 'react-native-paper';
import host from '@src/host';

const {width,height}  = Dimensions.get("window")

export default function Login() {

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const [message,setMessage] = useState("Loading please wait...")

  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")

  useEffect(()=>{
    setTimeout(()=>{
      setVisible(false)
    },2000)
  },[visible])

  const goHomePage = useCallback(() => {

    
    
    dispatcher(SetUser({ email:email, password:password}));

  }, []);

  const goToSignup = useCallback(() => navigate(Routes.Signup), []);

  function ValidateEmail(mail:any) 
{

  return String(mail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

  const LoginFun = ()=>{
    console.log(email)
    if(!ValidateEmail(email)){
      setMessage("Not valid email ")
      setVisible(true)
    }
    else if(password.length<6){
      setMessage("password must be at least 6 digits ")
      setVisible(true)
    }
    else{
      fetch(host.hostname+'/v1/users/login',{
        method:"POST",
        headers:{
          'Accept': 'application/json',
                    'Content-Type': 'application/json'

        },
        body:JSON.stringify({
          email,
          password
        })
      }).then((res)=>{
        return res.json()
      }).then((data)=>{
        alert(JSON.stringify(data))
      }).catch((err)=>{
        console.log(err)
      })
    }
  }


  return (
    <View style={styles.root}>
  <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        >
        {message}
      </Snackbar>
      <Text style={styles.welcome}>Prometheus Login </Text>

      <View style={styles.loginBox}>
        <View style={styles.inputBox}>
          <Text style={styles.boldText}>Email</Text>
          <TextInput style={styles.textBox} value={email} onChangeText={(e:any)=>{setEmail(e)}} placeholder={"b23210@astra.xlri.ac.in"}></TextInput>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.boldText}>Password</Text>
          <TextInput style={styles.textBox} value={password} onChangeText={(e:any)=>{setPassword(e)}} placeholder={"************"}  secureTextEntry
           autoCorrect={false}></TextInput>
        </View>
        <TouchableOpacity onPress={()=>{LoginFun()}}  style={styles.button} >
          <Text style={styles.buttonColor}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={{marginTop:50}}>Not have an account ?</Text>
          <TouchableOpacity  onPress={goToSignup} style={styles.button} >
          <Text style={styles.buttonColor} >SIGN UP</Text>
          </TouchableOpacity>
      </View>

      

    </View>
  );

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  boldText:{
    fontWeight:"bold",

  },
  inputBox:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:width*0.9,
    height:"auto",
    margin:10
  },
  textBox:{
    borderWidth:1,
    borderColor:"#bdbdbd",
    width:width*0.75,
    height:45,
    margin:10,
    borderRadius:10,
    padding:5
  },
  loginBox:{
    height:"auto",
    borderWidth:1,
    borderColor:"#e5e5e5",
    width:width*0.9,
    borderRadius:5,
    margin:10,
    padding:15,
    justifyContent: 'center', 
    alignItems: 'center',

  },

  welcome: {
    fontFamily: 'Bold',
    fontSize: wp(6),
    margin:25
  },
  buttonStyle: {
    width: wp(30),
    marginTop: 50,
  },
  labelStyle: {
    fontSize: wp(3),
    textAlign: 'center',
    fontWeight: 'bold',
  },
   button:{
     backgroundColor:"#24a0ed",
     width:width*0.75,
     color:"white",
     height:40,
     marginTop:10,
     display:"flex",
     justifyContent:"center",
     alignItems:"center",
     borderRadius:5
   },
   buttonColor:{
     color:"white",
     fontWeight:"bold",

   }
});

