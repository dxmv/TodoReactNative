import React from 'react'
import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import { theme } from '../theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../redux/userSlice';

const styles=StyleSheet.create({
  component:{
    paddingHorizontal:35,
    paddingTop:20
  },
  text:{
    fontSize:20,
    textAlign:"center"
  },
  confirmation:{
    textAlign:"center",
    marginTop:10,
    backgroundColor:theme.colors.primary,
    paddingVertical:10,
    fontSize:15,
    textTransform:"uppercase",
    fontWeight:"600",
    color:theme.colors.secondary
  }
});

export default function LogOut() {
  const handlePress=async()=>{
    await AsyncStorage.removeItem("todoUser");
    dispatch(LOGOUT())
  }
  const dispatch=useDispatch();
  return (
    <View style={styles.component}>
      <Text style={styles.text}>Are you sure you want to log out?</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.confirmation}>Yes</Text>
      </TouchableOpacity>
    </View>
  )
}
