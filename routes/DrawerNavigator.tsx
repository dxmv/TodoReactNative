import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainStackNavigator } from './HomeStackNavigator';
import Home from '../components/Home';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import LogOut from '../components/LogOut';



const DrawerNavigator=()=>{
  const user=useSelector((state:RootState)=>state.user.user);
  const Drawer=createDrawerNavigator();
  return(
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={MainStackNavigator}/>
      {
        user?
          <Drawer.Screen name="Log out" component={LogOut} />:
        <>
          <Drawer.Screen name="Sign Up" component={SignUp} />
          <Drawer.Screen name="Log In" component={Login} />
        </>
      }

    </Drawer.Navigator>
  )
}
export default DrawerNavigator