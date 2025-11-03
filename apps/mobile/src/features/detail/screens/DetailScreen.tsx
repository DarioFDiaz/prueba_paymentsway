import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '@/src/navigation';
import { fetchWeather } from '@/src/lib/api';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface WeatherData {
  ciudad: string;
  temperatura: number;
  descripcion: string;
  icono: string;
}

export default function DetailScreen() {
  const { params } = useRoute<DetailRouteProp>();
  const { city } = params;
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchWeather(city);
        setWeather(data);
      } catch (err: any) {
        setError(err.message || 'Error al obtener el clima');
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Cargando clima de {city}...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>⚠️ Error: {error}</Text>
        <Text style={styles.suggestion}>
          Asegúrate de que el backend esté corriendo y tu dispositivo esté en la misma red Wi-Fi.
        </Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.center}>
        <Text>No se encontraron datos del clima.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima en {weather.ciudad}</Text>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weather.icono}@2x.png`,
        }}
        style={styles.icon}
      />
      <Text style={styles.temp}>{weather.temperatura.toFixed(1)}°C</Text>
      <Text style={styles.desc}>{weather.descripcion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  temp: { fontSize: 48, fontWeight: 'bold', color: '#ff9800' },
  desc: { fontSize: 20, color: '#333', marginTop: 10, textTransform: 'capitalize' },
  error: { color: 'red', fontSize: 16, textAlign: 'center' },
  suggestion: { marginTop: 10, color: '#555', fontSize: 14, textAlign: 'center' },
  icon: { width: 100, height: 100, marginVertical: 10 },
});