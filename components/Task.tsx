import React from 'react'
import { StyleSheet,View,Text } from 'react-native'
import { ITask, ITodo, ITodoModel } from '../types'
import { theme } from '../theme'
import Todo from './Todo'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector,useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import TodoForm from './forms/TodoForm'
import { RootState } from '../redux/store'


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
    borderBottomWidth:2,
    color:"#000"
  },
  innerList:{
    paddingHorizontal:20,
    paddingTop:8
  }
})

export default function Task({navigation}:{navigation:any}) {
  const dispatch=useDispatch();
  const route = useRoute();
  const id=route.params?route.params.id:null;
  const task=useSelector((state:RootState)=>state.tasks.tasks.find(task=>task._id===id));
  return (
    <View style={styles.component}>
      {task&&
      <>      
      <TodoForm task={task}/>
      <Text style={styles.mainHeader}>
        {task.title}
      </Text>
      <View style={styles.innerList}>
        <FlatList
          data={task.todos}
          renderItem={({item}:{item:ITodoModel})=><Todo task={task} todo={item}/>}
          keyExtractor={item=>item._id}
        />
      </View>
      </>}

    </View>
  )
}
