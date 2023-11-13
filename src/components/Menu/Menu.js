import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "../../screens/Home/Home";
import MiPerfil from "../../screens/MiPerfil/MiPerfil";
import PostForm from "../../screens/PostForm/PostForm";
import Filtrado from "../../screens/Filtrado/Filtrado";
import reactDom from 'react-dom';

const Tab = createBottomTabNavigator();

class Menu extends Component {

    render() {
        return (


            <Tab.Navigator style={styles.tab}>
                <Tab.Screen options={{ title: 'Home' }} name="Home" component={Home} />
                <Tab.Screen options={{ title: 'Nuevo Post' }} name="PostForm" component={PostForm} />
                <Tab.Screen options={{ title: 'Mi Perfil' }} name="Mi Perfil" component={MiPerfil} />
                <Tab.Screen options={{ title: 'Filtrado' }} name="Filtrado" component={Filtrado} />
            </Tab.Navigator>

        )
    }
}

const styles = StyleSheet.create({
    tab: {
        position: "absolute",
    }
})

export default Menu;



