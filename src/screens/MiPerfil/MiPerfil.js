import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import { auth } from '../../firebase/config';

class MiPerfil extends Component {
    constructor(){
        super()
        this.state={
      
        }
    }

    logout(){
        auth.signOut();

        this.props.navigation.navigate('Login')

    }


    render(){
        return(
            <View>
                <Text>MI PERFIL</Text>
                <TouchableOpacity onPressOut={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <Text>NOMBRE DE USUARIO: </Text>
                <Text>EMAIL:</Text>
                <Text>BIOGRAFÍA</Text>
                <Image source={{url: ""}}/> 
                <Text>CANTIDAD DE POSTEOS: </Text>
                <TouchableOpacity onPressOut={()=>this.borrar()}>
                    <Text>BORRAR POSTEO</Text>
                </TouchableOpacity>
            </View>
        )
    }
}



export default MiPerfil;
