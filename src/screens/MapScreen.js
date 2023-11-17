import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Obtener la ubicación actual del usuario aquí y actualizar setCurrentLocation
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      error => console.error('Error en la geolocalización: ', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {currentLocation ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Mi Ubicación"
            description="Descripción de mi ubicación"
          />
        </MapView>
      ) : (
        <Text>Cargando mapa...</Text>
      )}
    </View>
  );
};

export default MapScreen;
