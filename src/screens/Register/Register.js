import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import firebase from 'firebase/app';

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            ShortBio: '',
            FotoPerfil: '',
            password:''
        }
    }

    componentDidMount(){
        console.log("Chequeando si el usuario está logueado en Firebase");

        auth.onAuthStateChanged( user => {
            console.log(user)

            if (user) {
                //Redirigir al usuario a la home del sitio.
               this.props.navigation.navigate('Home')
            }

        })
    }

    register (email, pass, userName, date, bio, foto ){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( response => {
                //Cuando firebase responde sin error
                console.log('Registrado ok', response);

                 //Cambiar los estados a vacío como están al inicio.
                 db.collection('users').add({
                    owner: email,
                    password: pass,
                    userName: userName,
                    createdAt: date,
                    ShortBio: bio,
                    FotoPerfil: foto
                 })
                 .then( res => console.log(res))

            })
            .catch( error => {
                //Cuando Firebase responde con un error
                console.log(error);

            })
        
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.titulo}>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='user name'
                    keyboardType='default'
                    value={this.state.userName}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({ShortBio: text})}
                    placeholder='Biografía'
                    keyboardType='default'
                    value={this.state.ShortBio}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({FotoPerfil: text})}
                    placeholder='Foto de perfil'
                    keyboardType='default'
                    value={this.state.FotoPerfil}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName, Date.now(), this.state.ShortBio, this.state.FotoPerfil)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                   <Text style={styles.yatengocuenta}>Ya tengo cuenta. Ir al login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        borderColor: 'grey',
        borderStyle: 'solid',
        borderWidth: 3,
        marginLeft: 50,
        marginTop: 50,
        marginRight: 50,
        borderRadius: 30,
        backgroundColor: 'white',
        paddingHorizontal:10,
        marginTop: 20,
    },
    titulo: {
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        fontSize: 35,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        marginTop: 10,
    },
    textButton:{
        color: '#fff'
    },
    yatengocuenta: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
        fontSize: 15,
    }

})


export default Register;