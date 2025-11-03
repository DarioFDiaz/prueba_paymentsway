import Constants from 'expo-constants';
import { Platform } from 'react-native';

function getBaseUrl() {
  const publicUrl = process.env.EXPO_PUBLIC_API_URL;
  if (publicUrl && !publicUrl.includes('localhost')) {
    return publicUrl;
  }

  if (Platform.OS === 'web') {
    return 'http://localhost:3000';
  }

  try {
    const manifest = Constants.manifest2 ?? Constants.manifest;
    const debuggerHost =
      manifest?.extra?.expoGo?.developer?.host ||
      manifest?.hostUri ||
      manifest?.debuggerHost;

    if (debuggerHost) {
      const host = debuggerHost.split(':')[0];
      return `http://${host}:3000`;
    }
  } catch {
    // Ignorar si no hay manifest
  }

 return 'http://192.168.1.14:3000';
}

export const API_BASE_URL = getBaseUrl();

console.log('🌐 API_BASE_URL detectada:', API_BASE_URL);

export async function fetchWeather(city: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error: any) {
    console.error('Error al obtener clima:', error.message);
    throw error;
  }
}