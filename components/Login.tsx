import React,{useState} from 'react'
import { View, Button,StyleSheet,TextInput,Text } from 'react-native'
import userServices from '../services/userServices';
import { theme } from '../theme'
import { useDispatch } from 'react-redux';
import {ADD_USER} from "../redux/userSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles=StyleSheet.create({
  component:{
    paddingHorizontal:35,
    paddingTop:20
  },
  input:{
    borderWidth:1,
    borderColor:"#777",
    paddingVertical:2,
    paddingHorizontal:10,
    fontSize:16,
    marginBottom:10,
    backgroundColor:theme.colors.primary,
    borderRadius:5
  },
  submit:{
    alignSelf:"center",
    borderWidth:2,
    paddingHorizontal:10,
    paddingVertical:5,
    borderColor:theme.colors.secondary,
    backgroundColor:theme.colors.primary,
  },
  error:{
    color:theme.colors.secondary,
    marginBottom:3
  },
  header:{
    marginBottom:20,
    fontSize:25,
    textAlign:"center"
  }
})

export default function Login() {
  const [username,setUsername]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [errorMessage,setErrorMessage]=useState<string>("");
  const dispatch=useDispatch();

  const handleLogin=async()=>{
    try{
      await setErrorMessage("");
      const user={
        username,
        password
      }
      const token=await userServices.login(user);
      const myUser=await userServices.getUser(token.user.id);
      dispatch(ADD_USER(myUser));
      await AsyncStorage.setItem("todoUser",JSON.stringify(token));
    }
    catch(e){
      await setPassword("");
      await setErrorMessage("Invalid username or password");
    }
  }

  return (
    <View style={styles.component}>
      <Text style={styles.header}>
        Login  
      </Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username..."
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password..."
        style={styles.input}
        secureTextEntry={true}
      />
      <Text style={errorMessage?styles.error:{display:"none"}}>
        {errorMessage?errorMessage:""}
      </Text>
      <Button
        title="LOG IN" 
        color={theme.colors.secondary}
        disabled={username===""||password===""}
        onPress={handleLogin}
      />
    </View>
  )
}
