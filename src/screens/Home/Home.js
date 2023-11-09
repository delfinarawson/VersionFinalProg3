import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
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
            <View>
                <Text>HOME</Text>
                <TouchableOpacity onPressOut={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Mi perfil')}>
                   <Text>Mi perfil</Text>
                </TouchableOpacity>

                <Text>Crear nuevo post</Text>
                <PostForm />

                <Text>Lista de posteos creados</Text>
                
                <FlatList
                    data={this.state.posts}
                    keyExtractor={ unPost => unPost.id }
                    renderItem={ ({item}) => <Post dataPost = {item} />  }
                />

                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Filtrado')}>
                   <Text>Filtrar Perfiles</Text>
                </TouchableOpacity>
            </View>


        )
    }
}



export default Home;
