import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../features/search/screens/SearchScreen';
import DetailScreen from '../features/detail/screens/DetailScreen';

export type RootStackParamList = {
  Search: undefined;
  Detail: { city: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}