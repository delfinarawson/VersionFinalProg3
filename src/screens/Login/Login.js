import React, { Component } from 'react';
import { auth, db} from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            logged: '',
            cargando: ''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            console.log(user);
            if(user !== null){
                this.setState({
                    logged: true,
                    cargando: false, 
                }) 
            } else {
                this.setState({
                    logged: false, 
                    cargando: false,
            })
          }
        })
    }

    login (email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( response => {
                //Cuando firebase responde sin error
                console.log('Login ok', response);

                //Cambiar los estados a vacío como están al inicio.


                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Menu')

            })
            .catch( error => {
                //Cuando Firebase responde con un error.
                console.log(error);
            })

            
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.titulo}>Ingresa a tu cuenta</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Registro')}>
                   <Text style={styles.pararegistro}>No tengo cuenta. Registrarme.</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Menu')}>
                   <Text style={styles.volverhome}>Ir a Home</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
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
        backgroundColor:'blue',
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
        color: '#fff',
        textAlign: "center",
    },
    volverhome: {
        marginBottom: 10,
        textAlign: "center",
        fontSize: 15,
    },
    pararegistro: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
        fontSize: 15,
    },

})


export default Login;
