import React,{useState} from 'react'
import { View,TextInput,Button,StyleSheet } from 'react-native'
import { theme } from '../../theme';
import { ITask } from '../../types';
import { ADD_TASK } from '../../redux/todoSlice';
import { useDispatch,useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import taskServices from '../../services/taskServices';

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

export default function TaskForm() {
  const user=useSelector((state:RootState)=>state.user.user);
  const dispatch=useDispatch();
  const [title,setTitle]=useState<string>("");

  const createTask=async()=>{
    const tokenString=await AsyncStorage.getItem("todoUser");
    const token=tokenString?JSON.parse(tokenString):null;
    if(user&&token){
      const task:{title:string}={
        title:title,
      }
      const myTask=await taskServices.createTask(token.token,task);
      await dispatch(ADD_TASK(myTask));
      await setTitle("");
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
      <Button title="ADD" color={theme.colors.secondary} onPress={createTask} disabled={title===""}/>
    </View>
  )
}
