import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

class MiPerfil extends Component {
    constructor(){
        super()
        this.state={
            users: [],
            listaPost: [],
            cantPosts : ""
        }   
    }
    componentDidMount(){
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
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
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
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
                    listaPost: postsAMostrar ,
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
        console.log(this.state.cantPosts);
        return(
            <ScrollView>

                <Text style={styles.screenTitle}>Profile</Text>
                
                <View>
                <TouchableOpacity style={styles.button} onPress={()=>this.logout()}>
                    <Text style={styles.textButton}>Log out</Text>
                </TouchableOpacity>
                <View style={styles.formContainer}>
                <Text style={styles.mail}>{auth.currentUser.email}</Text>
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
                    </View>
                  
                </View>
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
        marginBottom: 20,
    },
    cantp: {
        textAlign: "center",
        fontSize: 20,
        marginBottom: 15,
    },
    usern: {
        textAlign: "center",
        fontSize: 20,
        marginBottom: 15,
        marginTop: 15,
    },
    bio: {
        textAlign: "center",
        fontSize: 20,
        marginBottom: 15,
    },
    imgperfil: {
        width: 100, 
        height: 100,
        marginTop: 15,
        alignSelf: 'center',
    },
    screenTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10,
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
    textButton:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'

    },
    mail: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },

})

export default MiPerfil;