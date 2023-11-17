import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function DetailsStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name='details'
        component={DetailsScreen} //Vista a enseñar , que no sea el mismo
        options={{title:"Indexs"}}>
        </Stack.Screen>
        <Stack.Screen
        name='profilesr'
        component={ProfileScreen} //Vista a enseñar , que no sea el mismo
        options={{title:"Perfil"}}>
        </Stack.Screen>

    </Stack.Navigator>
  )
}