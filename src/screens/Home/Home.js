import React, { Component } from 'react';
import {TextInput, TouchableOpacity, ScrollView, Text, StyleSheet, FlatList, View} from 'react-native';
import { db, auth } from '../../firebase/config';
import PostForm from '../PostForm/PostForm';
import Post from '../../components/Post/Post';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons/faRightFromBracket'; 

class Home extends Component {
    constructor(){
        super()
        this.state={
            posts: []
        }
    }

    componentDidMount(){
        //Traer los datos de Firebase y cargarlos en el estado.
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
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
        console.log(this.state.posts)
        return(
           
            <ScrollView>
                <TouchableOpacity style={styles.button} onPressOut={()=>this.logout()}>
                    <Text style={styles.textButton}>Log out <FontAwesomeIcon icon={faRightFromBracket} color={ 'white' }/></Text>
                </TouchableOpacity>
                
                <Text style={styles.listapost}>Lista de posteos creados</Text>
                
                <FlatList
                    data={this.state.posts}
                    keyExtractor={ unPost => unPost.id }
                    renderItem={ ({item}) => <View>
                         <TouchableOpacity onPress={()=> this.props.navigation.navigate("Perfil Usuario", { dataUser: item.datos })}>
                         <Text>User Name: {item.datos.owner} </Text>
                                </TouchableOpacity>
                        <Post dataPost = {item} /> 
                     <TouchableOpacity style={styles.button} onPressOut={()=>this.props.navigation.navigate("Comentarios", {dataPost: {item}})}>
                    <Text style={styles.textButton}>Ver todos los comentarios <FontAwesomeIcon icon={faRightFromBracket} color={ 'white' }/></Text>
                     </TouchableOpacity>

                    </View>  }
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
    },
    textButton:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    button:{
        alignSelf: 'flex-end',
        marginEnd: 55,
        height:30,
        width: 150,
        backgroundColor:'#46627f',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#46627f',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    })


export default Home;
