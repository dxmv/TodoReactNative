import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../components/Home";
import Task from "../components/Task";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Home}  options={{ headerShown: false }}/>
      <Stack.Screen name="Task" component={Task} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator };