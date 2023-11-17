import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './LoginScreen';
import Loading from '../components/common/Loading';
import { Input, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { db } from '../utils/Firebase';
import { Timestamp } from 'firebase/firestore';

export default function IndexScreen(props) {
  const { navigation } = props;
  const [sesion, setSesion] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [names, setNames] = useState([]);
  const [loadingNames, setLoadingNames] = useState(true);
  const [entryTime, setEntryTime] = useState(null);


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setSesion(user ? true : false);
    });

    // Cargar los nombres desde Firebase
    const loadNamesFromFirebase = async () => {
      try {
        const namesCollection = db.collection('nombres'); // 'nombres' es el nombre de tu colección en Firebase
        const namesSnapshot = await namesCollection.get();

        const namesData = [];
        namesSnapshot.forEach((doc) => {
          namesData.push(doc.data().nombre);
        });

        setNames(namesData);
        setLoadingNames(false);
      } catch (error) {
        console.error('Error al cargar nombres desde Firebase:', error);
        setLoadingNames(false);
      }
    };
    
    loadNamesFromFirebase();
  }, []);
  const handleConfirm = async () => {
    try {
      const user = getAuth().currentUser;
  
      if (user) {
        const userUid = user.uid;
        const currentTime = Timestamp.now(); // Utiliza Timestamp para obtener la hora actual
  
        // Almacena la hora de entrada en la colección "entradas"
        await db.collection('entradas').add({
          userId: userUid,
          entrada: currentTime,
        });
  
        console.log('Hora de entrada registrada correctamente');
      } else {
        console.error('Usuario no autenticado al intentar confirmar entrada');
      }
    } catch (error) {
      console.error('Error al registrar la hora de entrada:', error.message);
    }
  };
  if (loadingNames || sesion === null) {
    return <Loading visible={true} text={'Cargando'} />;
  }

  return sesion ? (
    <View style={styles.viewForm}>
      <Text>Selecciona provedor: </Text>
      <Picker
        selectedValue={selectedName}
        onValueChange={(itemValue) => setSelectedName(itemValue)}
        style={styles.pickerStyle}
      >
        {names.map((name, index) => (
          <Picker.Item key={index} label={name} value={name} />
        ))}
      </Picker>
      <Button title="Ir a detalles" onPress={() => navigation.navigate('details')}>
        STATUS
      </Button>
      <Button title="Ir a Informacion" onPress={() => navigation.navigate('details')}>
        Informacion
      </Button>
      <Button title="Ir a Perfil" onPress={() => navigation.navigate('profile')}>
        PERFIL
      </Button>
      <Button title="Confirmar Entrada" onPress={handleConfirm}>
  Confirmar Entrada
</Button>
    </View>
  ) : (
    <LoginScreen />
  );
}

const styles = StyleSheet.create({
  pickerStyle: {
    height: 50,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});