import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/src/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (!city.trim()) {
      alert('Por favor, ingresa una ciudad.');
      return;
    }
    navigation.navigate('Detail', { city });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta el clima ☀️</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Bogotá, Lima, Madrid..."
        value={city}
        onChangeText={setCity}
      />
      <Button title="Buscar" onPress={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});