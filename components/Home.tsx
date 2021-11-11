import React,{useEffect} from 'react'
import { StyleSheet,View,Text,FlatList, TouchableOpacity } from 'react-native'
import { ITask, ITaskModel } from '../types'
import { theme } from '../theme';
import TaskForm from './forms/TaskForm';
import { AntDesign } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux'
import {RootState} from "../redux/store";
import { DELETE_TASK,INITIAL_TASKS } from '../redux/todoSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParams';
import { ADD_USER } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userServices from '../services/userServices';
import taskServices from '../services/taskServices';
import axios from 'axios';


type authScreenProp = StackNavigationProp<RootStackParamList, 'Auth'>;
const styles=StyleSheet.create({
  component:{
    paddingHorizontal:35,
    paddingTop:20
  },
  mainHeader:{
    marginTop:15,
    fontSize:30,
    fontWeight:"600",
    borderColor:theme.colors.secondary,
    borderBottomWidth:2
  },
  list:{
    paddingHorizontal:10,
    marginTop:10
  },
  listItem:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:10
  }
});

export default function Home() {
  const dispatch=useDispatch();
  const tasks:Array<ITaskModel>= useSelector((state:RootState)=>state.tasks.tasks);
  const user=useSelector((state:RootState)=>state.user.user);
  const navigation = useNavigation<authScreenProp>();

  const handleDelete=async(item:ITaskModel)=>{
    const tokenString=await AsyncStorage.getItem("todoUser");
    const token=tokenString?JSON.parse(tokenString):null;
    if(token){
      const message=await taskServices.deleteTask(token.token,item._id);
      if(message.message==="Success"){
        const newTasks=await taskServices.getTasksForUser(token.token);
        await dispatch(DELETE_TASK(item));
        await dispatch(INITIAL_TASKS(newTasks))
      }
    }
  }

  useEffect(()=>{
    const setUser=async():Promise<void>=>{
      const tokenString=await AsyncStorage.getItem("todoUser");
      const token=tokenString?JSON.parse(tokenString):null;
      if(token){
        const myUser=await userServices.getUser(token.user.id);
        dispatch(ADD_USER(myUser));
        const tasks=await taskServices.getTasksForUser(token.token);
        dispatch(INITIAL_TASKS(tasks));
      }
    }
    setUser();
  },[])


  return (
    <View style={styles.component}>
      {user?
      <>
        <TaskForm />
        <Text style={styles.mainHeader}>
          Tasks
        </Text>
        <FlatList
          data={tasks}
          style={styles.list}
          keyExtractor={item=>item._id}
          renderItem={({item})=>
          <View style={styles.listItem}>
            <AntDesign name="clockcircleo" size={35} color="black" />
            <View style={{flexGrow:5,paddingLeft:8}}>
              <TouchableOpacity onPress={()=>navigation.navigate("Home",{screen:"Task",params:{id:item._id}})}>
                <Text>{item.title}</Text>
                <Text>{item.date.substring(0,10)}</Text>
              </TouchableOpacity>
            </View>
            <AntDesign name="delete"
            onPress={()=>{handleDelete(item)}} 
            size={20} color={theme.colors.secondary}
              />
          </View>}/>
      </>
      :
      <>
        <Text style={{textAlign:"center"}}>Please login to access your tasks</Text>
      </>}
    </View>
  )
}
