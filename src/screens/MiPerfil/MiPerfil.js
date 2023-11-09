import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class MiPerfil extends Component {
    constructor(){
        super()
        this.state={
            email: '',
            nombre:'' ,
            biografia: '',
            foto: '',
            cantposteo: '', 
            borrar: false 

        }
    }

    logout(){
        auth.signOut();

        this.props.navigation.navigate('Login')

    }
    datosPerfil(){
        db.collection('').onSnapshot 
        // busco una collection con la info de mi usuario 
    
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
                <Text>BIOGRAFÍA:</Text>
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
