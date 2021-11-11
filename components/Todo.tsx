import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import { ITaskModel, ITodoModel } from '../types'
import { Checkbox } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../theme';
import { useDispatch } from 'react-redux';
import { EDIT_TASK } from '../redux/todoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import todoServices from '../services/todoServices';

const styles=StyleSheet.create({
  todo:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingBottom:5,
    borderBottomWidth:2,
    borderBottomColor:theme.colors.secondary,
    marginVertical:5
  },
  text:{
    flexGrow:2,
    fontSize:16,
    paddingLeft:5
  }
});

export default function Todo({task,todo}:{task:ITaskModel,todo:ITodoModel}) {
  const dispatch=useDispatch();

  const handleDelete=async()=>{
    try{
      const myToken=await AsyncStorage.getItem("todoUser");
      const token=myToken?JSON.parse(myToken):null;
      if(token){
        const newTask=await todoServices.deleteTodo(task._id,todo._id,token.token);
        if(newTask){
          dispatch(EDIT_TASK(newTask));
        }
        else{
          throw new Error("There was an error while deleting");
        }
      }
    }
    catch(e){
      console.log(e);
    }
  }

  const handlePress=async()=>{
    try{
      const myToken=await AsyncStorage.getItem("todoUser");
      const token=myToken?JSON.parse(myToken):null;
      if(token){
        const newTask=await todoServices.editTodo(task._id,todo._id,token.token);
        if(newTask){
          dispatch(EDIT_TASK(newTask));
        }
        else{
          throw new Error("There was an error while deleting");
        }
      }
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <View style={styles.todo}>
      <Checkbox
        color={theme.colors.secondary}
        status={todo.done?"checked":"unchecked"}
        onPress={handlePress}
      />
      <Text style={styles.text}>
        {todo.title}
      </Text>
      <AntDesign name="delete" onPress={handleDelete} size={20} color={theme.colors.secondary} />
    </View>
  )
}
