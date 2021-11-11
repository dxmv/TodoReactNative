import React, { useState } from 'react'
import { View,StyleSheet,TextInput,Button,Text } from 'react-native'
import { theme } from '../theme'
import { IUser } from '../types';
import userServices from '../services/userServices';

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
  header:{
    marginBottom:20,
    fontSize:25,
    textAlign:"center"
  }
})

export default function SignUp() {
  const [username,setUsername]=useState<string>("");
  const[password,setPassword]=useState<string>("");
  const [fullName,setFullName]=useState<string>("");
  const [confirmPass,setConfirmPass]=useState<string>("");

  const handleSignUp=async()=>{
    try{
      const user:Omit<IUser,"tasks">={
        password,
        username,
        fullName
      }
      const dbUser=await userServices.createUser(user);
      alert(`Created user ${dbUser.fullName}`);
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <View style={styles.component}>
      <Text style={styles.header}>
        Sign Up
      </Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full name..."
        style={styles.input}
      />
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
      <TextInput
        value={confirmPass}
        onChangeText={setConfirmPass}
        placeholder="Confirm Password..."
        style={styles.input}
        secureTextEntry={true}
      />
      <Button
        title="SIGN UP" 
        color={theme.colors.secondary}
        disabled={username===""||password===""||fullName===""||password!==confirmPass}
        onPress={handleSignUp}
      />
    </View>
  )
}
