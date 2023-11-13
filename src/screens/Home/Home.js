import React, { Component } from 'react';
import {TextInput, TouchableOpacity, ScrollView, Text, StyleSheet, FlatList, View} from 'react-native';
import { db, auth } from '../../firebase/config';
import PostForm from '../PostForm/PostForm';
import Post from '../../components/Post/Post'; 

class Home extends Component {
    constructor(){
        super()
        this.state={
            posts: []
        }
    }

    componentDidMount(){
        //Traer los datos de Firebase y cargarlos en el estado.
        db.collection('posts').onSnapshot(
            listaPosts => {
                let postsAMostrar = [];

                listaPosts.forEach(unPost => {
                    postsAMostrar.push({
                        id:unPost.id,
                        datos: unPost.data()            
                    })
                })

                this.setState({
                    posts:postsAMostrar
                })
            }
        )

    }

    logout(){
        auth.signOut();
        this.props.navigation.navigate('Login')
    }



    render(){
        return(
            <ScrollView>
                <TouchableOpacity onPressOut={()=>this.logout()}>
                    <Text style={styles.logout}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.listapost}>Lista de posteos creados</Text>
                
                <FlatList
                    data={this.state.posts}
                    keyExtractor={ unPost => unPost.id }
                    renderItem={ ({item}) => <Post dataPost = {item} />  }
                />

                
            </ScrollView>


        )
    }
}

const styles = StyleSheet.create({
    listapost: { 
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        fontSize: 20,
        marginTop: 30,
        marginBottom: 30,
    },
    newpost: {
        fontWeight: "bold",
        color: "black" ,
        textAlign: "center",
        fontSize: 15,
        marginTop: 25,
    },
    home: {
        fontWeight: "bold",
        color: "black" ,
        fontSize: 17,
        marginTop: 5,
        textAlign: "center",
    },
    logout: {
        fontWeight: "bold",
        color: "black" ,
        fontSize: 15,
        marginTop: 15,
    },
    miperfil: {
        fontWeight: "bold",
        color: "black" ,
        fontSize: 15,
        marginTop: 15,
    }

    })


export default Home;
