import React, { useState } from 'react'
import { View,TextInput,Button,Text,StyleSheet } from 'react-native'
import { theme } from '../../theme';
import { ITaskModel, ITodo } from '../../types';
import { useDispatch } from 'react-redux';
import { EDIT_TASK } from '../../redux/todoSlice';
import todoServices from '../../services/todoServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles=StyleSheet.create({
  form:{
    width:"100%",
    display:"flex",
    flexDirection:"column"
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
  }
})
export default function TodoForm({task}:{task:ITaskModel}) {
  const [title,setTitle]=useState<string>("");
  const dispatch=useDispatch();
  const createTodo=async()=>{
    try{
      const todo:{title:string}={
        title:title,
      }
      const myToken=await AsyncStorage.getItem("todoUser");
      const token=myToken?JSON.parse(myToken):null;
      if(token){
        const newTask=await todoServices.createTodo(task._id,todo,token.token);
        await setTitle("");
        dispatch(EDIT_TASK(newTask));
      }
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <View style={styles.form}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title..."
        style={styles.input}
      />
      <Button title="ADD" color={theme.colors.secondary} onPress={createTodo} disabled={title===""}/>
    </View>
  )
}
