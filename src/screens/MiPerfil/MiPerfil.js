import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView, Modal} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons/faRightFromBracket'; 

class MiPerfil extends Component {
    constructor(){
        super()
        this.state={
            users: [],
            listaPost: [],
            cantPosts : "",
            perfilABorrar: null,
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
    borrarPerfil(item){
        db.collection('users').doc(this.state.users[0].id).delete()
        .then(()=> {alert('El perfil se ha eliminado exitosamente')})
        .catch(error => {
            console.error("Error al eliminar el post:", error);
            });
    }

    confirmarBorrarPerfil(item){
        this.setState({ perfilABorrar: item});
    }

    finalBorrarPerfil(){
        this.borrarPerfil(this.state.perfilABorrar);
        this.setState({ perfilABorrar: null});
        this.navigation.navigate("Log in")
    }

    noBorrarPerfil(){
        this.setState({ perfilABorrar: null});
    }


    render(){
        console.log(this.state.users[0]);
        return(
            <ScrollView>
                
                <View>
                <TouchableOpacity style={styles.button} onPress={()=>this.logout()}>
                    <Text style={styles.textButton}>Log out <FontAwesomeIcon icon={faRightFromBracket} color={ 'white' }></FontAwesomeIcon> </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.confirmarBorrarPerfil()}>
                        <Text>Borrar perfil </Text>
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
{ this.state.perfilABorrar !== null ?
                
                    < Modal animation="slide" transparent={true} visible={this.state.modalVisible}>
                <View style={styles.chequeo}>
                    <Text> ¿Estas seguro de que quieres eliminar este perfil?</Text>

                    <TouchableOpacity style={styles.button} onPress={() => this.finalBorrarPerfil()}>
                        <Text style={styles.textButtonDelete}>Aceptar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.noBorrarPerfil()}>
                        <Text style={styles.textButtonDelete}>Cancelar</Text>
                    </TouchableOpacity>
                </View>


            </Modal>

                        :
                        null 
                        }
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
        borderRadius: 5,
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
        marginTop: 50,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10,
        color: 'black',
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
        backgroundColor:'blue',
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
    container: {
        alignItems: "center",
        borderColor: "grey",
        borderWidth: 3,
        borderStyle: "solid",
        padding: 10,
        flex: 2,
        display: "flex",
        marginBottom: 2,
        borderRadius: 10,
        alignSelf: "center",
      },

})

export default MiPerfil;