import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import MiPerfil from './src/screens/MiPerfil/MiPerfil';
import Filtrado from './src/screens/Filtrado/Filtrado'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={ { headerShown: false } }/>
        <Stack.Screen name='Registro' component={Register} options={ { headerShown: false } }/>
        <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
        <Stack.Screen name='Mi perfil' component={MiPerfil} options={ { headerShown: false } }/>
        <Stack.Screen name='Filtrado' component={Filtrado} options={ { headerShown: false } }/>
      </Stack.Navigator>
    </NavigationContainer>

);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
},
});
