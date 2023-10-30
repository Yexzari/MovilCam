import { Button, StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import LoginScreen from './LoginScreen';
import Loading from '../components/common/Loading';
import {Input, Icon } from "react-native-elements";

export default function IndexScreen(props) {
  const {navigation} = props;
  const [sesion,setSesion] = useState(null);
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=>{
     setSesion(user ? true : false);
    })
  },[]);
  console.log(sesion);

  if(sesion === null){
    return <Loading visible={true} text={"validando"}/>
  }

  return sesion ? (
    <View style={styles.viewForm}>
      <Text>Inicio</Text>
      <Button title='Ir a detalles' onPress={()=>navigation.navigate("details")} >STATUS</Button>
      <Button title='Ir a Informacion' onPress={()=>navigation.navigate("details")}>Informacion</Button>
      <Button title='Ir a Perfil' onPress={()=>navigation.navigate("profile")}>PERFIL</Button>
      
    </View>
  )
  :<LoginScreen/>
}

const styles = StyleSheet.create({

})