import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';
import {Image, TextInput, TouchableOpacity, ScrollView, Text, StyleSheet, FlatList, ActionSheetIOS, View} from 'react-native';

class perfilUsuario extends Component {
    constructor(){
        super()
        this.state={
            users: [],
            listaPost: [],
            cantPosts: ""
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
                    listaPost: postsAMostrar,
                    cantPosts: postsAMostrar.length
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
                <Text style={styles.screenTitle}>User Profile</Text>
                <TouchableOpacity style={styles.button} onPress={ () => this.props.navigation.navigate('Menu')}>
                   <Text style={styles.textButton}> Volver Atras</Text>
                </TouchableOpacity>
                {this.state.users.length > 0 ? 
                <View style={styles.formContainer}>
                <FlatList 
                        data= {this.state.users}
                        keyExtractor={ user => user.id }
                        renderItem={ ({item}) => 
                        <View>
                         <Image
                        style={styles.imgperfil}
                        source={{ uri: item.data.FotoPerfil}}
                        />
                        <Text style={styles.usern}>Username: {item.data.userName}</Text> 
                        <Text style={styles.bio}>Descripción: {item.data.ShortBio}</Text>
                        <Text style={styles.cantp}>Cantidad Posts: {this.state.cantPosts}</Text>
                        </View>
                    }
                    />
                     <Text style={styles.screenTitle}>Posts</Text>
                   
                   <FlatList 
                       data= {this.state.listaPost}
                       keyExtractor={ unPost => unPost.id }
                       renderItem={ ({item}) => <Post dataPost = { item }/> }
                       style= {styles.listaPosts}
                   /> 
                   </View>
                     : (
                        <Text style={styles.deletedProfileText}>El perfil ha sido eliminado</Text>
                      )}
                

                
            </ScrollView>
            
        )}
        }

const styles = StyleSheet.create({
    //CONTENEDOR GENERAL
    formContainer:{
        borderColor: 'grey',
        borderStyle: 'solid',
        borderWidth: 1,
        marginLeft: 50,
        marginTop: 50,
        marginRight: 50,
        borderRadius: 2,
        backgroundColor: 'white',
        paddingHorizontal:10,
        marginTop: 20,
        marginBottom: 20,
    },
    cantp: {
        textAlign: "left",
        fontSize: 15,
        marginBottom: 15,
    },
    usern: {
        textAlign: "left",
        fontSize: 15,
        marginBottom: 15,
        marginTop: 15,
    },
    bio: {
        textAlign: "left",
        fontSize: 15,
        marginBottom: 15,
    },
    imgperfil: {
        width: 100, 
        height: 100,
        marginTop: 15,
        alignSelf: 'left',
    },
    screenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10,
        textAlign: "left",
        paddingTop: 40,
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
        borderRadius: 2,
        marginHorizontal: 20,
        padding: 5,
        marginVertical: 5
    },
    button:{
        alignSelf: 'flex-end',
        marginEnd: 55,
        height:30,
        width: 150,
        backgroundColor:'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:2, 
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

    },
    container: {
        alignItems: "center",
        borderColor: "grey",
        borderWidth: 1,
        borderStyle: "solid",
        padding: 10,
        flex: 2,
        display: "flex",
        marginBottom: 2,
        borderRadius: 1,
        alignSelf: "center",
      },

})

export default perfilUsuario;