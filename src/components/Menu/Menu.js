import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth, db } from "../firebase/config";
import { NavigationContainer } from '@react-navigation/native';

import Home from "../../screens/Home/Home";
import MiPerfil from "../../screens/MiPerfil/MiPerfil";
import Login from "../../screens/Login/Login";
import PostForm from "../../screens/PostForm/PostForm";
import Register from "../../screens/Register/Register";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            user: '',
            errorMessage: '',
            errorCode: '',
            cargando: true, 
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
    

    register(email, userName, pass) {
        if( email === '' || pass === '' || userName === '' ){
            alert('No puede quedar ningún campo vacío')
        } else {
            auth.createUserWithEmailAndPassword(email, pass)
            .then( res => {
                res.user.updateProfile({
                    displayName: userName
                })
            })
            .then(() => console.log('Usuario registrado exitosamente!'))
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorCode: err.message, 
                })
            })
        }
    } 

    login(email, password) {

        if( email === '' || password === ''){
            alert('No puede quedar ningún campo vacío')
        } else  {
            auth
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.setState({
                    logged: true,
                    user: response.user,
                }) 
            })
        .catch((err) => {
            console.log(err);
            this.setState({
                errorMessage: err.message, //de firebase
            })
        })
    }}

    logout(){
        auth.signOut()
        .then(()=>{
            this.setState({
                user:'',
                logged: false,
            })
        })
    }

    render() {
        return (

            <>
                {
                    this.state.cargando ?
                        <ActivityIndicator size='large' color='blue' style={styles.loader}/>

                     : (
                        this.state.logged ? (
                            <NavigationContainer>
                                <Tab.Navigator>
                                    <Tab.Screen options={{title: 'Home' }} name="Home" component={()=><Home user={this.state.user}/>} /> 
                                    <Tab.Screen options={{title: 'Nuevo Post'}} name="NewPostForm" component={(PostForm)}/>
                                    <Tab.Screen options={{title: 'Mi Perfil'}} name="Mi Perfil" component={()=><MiPerfil user={this.state.user} logout={ () => this.logout()} />} />
                                    <Tab.Screen options={{title: 'Buscador'}} name="Filtrado" component={()=><Filtrado /> } />
                                </Tab.Navigator>
                            </NavigationContainer>

                            ) : ( 
                            <NavigationContainer>
                                <Tab.Screen options={{title: 'Login'}} name="Login" component={(screenProps)=><Login screenProps={screenProps} errorMessage={ this.state.errorMessage } login={(email,pass)=>this.login(email,pass)}/>} />
                                <Tab.Screen options={{title: 'Register'}} name="Register" component={()=><Register errorCode={ this.state.errorCode } register={(email,pass,userName)=>this.register(email,pass,userName)} />} />
                            </NavigationContainer>
                            )
                     )
            }
            </>
        )}
}

const styles = StyleSheet.create({
    loader: {
        marginTop: 200,
    },
})

export default Menu;



