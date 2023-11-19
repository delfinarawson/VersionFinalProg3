import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import Menu from './src/components/Menu/Menu';
import perfilUsuario from './src/screens/perfilUsuario.js/perfilUsuario';
import Comentarios from './src/screens/Comentarios/Comentarios';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Registro' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name='Perfil Usuario' component={perfilUsuario} options={{ headerShown: false }} />
        <Stack.Screen name='Comentarios' component={Comentarios} options={{ headerShown: false }} />
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
