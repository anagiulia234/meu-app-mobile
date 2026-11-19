import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [permissao, setPermissao] = useState(false);
const [localizacao, setLocalizacao] = useState(null);
// Espere o satélite achar o celular (pode demorar segundos)

  useEffect(() => {
  const requererAcesso = async () => {
    // A API paralisa o código e mostra a janelinha do Android!
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status === 'granted') {
      setPermissao(true);
// Espere o satélite achar o celular (pode demorar segundos)
const posicaoNativa = await Location.getCurrentPositionAsync({});

// Jogue esse emaranhado de dados matemáticos na nossa Memória limpa
setLocalizacao(posicaoNativa);     
    } else {
      console.log("Fomos bloqueados. Game over.");
    }
  };

  requererAcesso();
}, []);

  return (
    <View style={styles.container}>
      {permissao ? (
        <Text style={styles.success}>Antenas Livres! Podemos rastrear.</Text>
      ) : (
        <Text style={styles.errorText}>Acesso bloqueado. O app não funcionará.</Text>
      )}
      {localizacao ? (
    <MapView 
        style={styles.mapaForte}
        initialRegion={{
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude,
            latitudeDelta: 0.005, // O nível do "Zoom"
            longitudeDelta: 0.005,
        }}
    >
        {/* O Alfinete Vermelho espetado no chão do mapa! */}
        <Marker 
            coordinate={{
                latitude: localizacao.coords.latitude,
                longitude: localizacao.coords.longitude,
            }}
            title="Eu estou aqui!"
            description="Defeito do motor"
        />
    </MapView>
) : (
    <Text>Buscando sua posição pelo Satélite...</Text>
)}
: (
    <Text>Procurando Satélites...</Text>
)
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapaForte: {
  width: '100%',
  height: '100%', // Altura travada, ou use flex: 1 se for uma aba só para ele!
  borderRadius: 10,
  marginTop: 20
}

});
