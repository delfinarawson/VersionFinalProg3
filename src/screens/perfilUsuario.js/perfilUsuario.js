import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';
import {Image, TextInput, TouchableOpacity, ScrollView, Text, StyleSheet, FlatList, ActionSheetIOS, View} from 'react-native';

class perfilUsuario extends Component {
    constructor(){
        super()
        this.state={
            users: [],
            listaPost: []
        }   
    }
    componentDidMount(){
        console.log(this.props.route.params)
        let perfil = this.props.route.params.dataUser.owner 
        db.collection('users').where('owner', '==', perfil ).onSnapshot(
           docs =>{
                let users = [];
                docs.forEach( doc => {
                   users.push({
                       id: doc.id,
                       data: doc.data()
                    })
                this.setState({
                   users: users
               })
})
           }
        )
        db.collection('posts').where('owner', '==', perfil).onSnapshot(
            posteos => {
                let postsAMostrar = [];

                posteos.forEach( unPost => {
                    postsAMostrar.push(
                        {
                            id: unPost.id,
                            datos: unPost.data()
                        }
                    )
                })

                this.setState({
                    listaPost: postsAMostrar
                })
            }
        )
    }

    logout(){
        auth.signOut()
        .then(() => {
            this.props.navigation.navigate('Login')
            console.log(auth.currentUser.email);
        })
        .catch(e => {console.log(e)})
    }

    render(){
        console.log(this.state.users);
        return(
            <ScrollView>
                <Text style={styles.screenTitle}>Profile</Text>
                
                
                <FlatList 
                        data= {this.state.users}
                        keyExtractor={ user => user.id }
                        renderItem={ ({item}) => 
                        <View>
                        <Text>Username: {item.data.userName}</Text> 
                        <Image
                        style={{width: 100, height: 80 }}
                        source={{ uri: item.data.FotoPerfil}}
                        />
                        <Text>Descripción: {item.data.ShortBio}</Text>
                        </View>
                    }
                    />
                   
                    
                <TouchableOpacity style={styles.button} onPress={()=>this.logout()}>
                    <Text style={styles.textButton}>Log out</Text>
                </TouchableOpacity>
                
                <Text style={styles.screenTitle}>My Posts</Text>
                   
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post dataPost = { item } /> }
                        style= {styles.listaPosts}
                    />

                
            </ScrollView>
            
        )}
        }

const styles = StyleSheet.create({
    //CONTENEDOR GENERAL
    screenTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10
    },
    image: {
        alignSelf: 'center',
        height: 80,
        width: "20%",
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 100
    },
    mainContainer:{
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        marginHorizontal: 20,
        padding: 5,
        marginVertical: 5
    },
    button:{
        alignSelf: 'flex-end',
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
        alignItems: 'center'
    },
    textButton:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'

    }

})

export default perfilUsuario;