import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './routes/DrawerNavigator';
import store from './redux/store';
import { Provider } from 'react-redux';



export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>
    </Provider>
  );
}

