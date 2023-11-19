import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList, Modal, Image } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase/app';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import { useNavigation } from '@react-navigation/native';

class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            like: false,
            cantidadDeLikes: 0,
            cantidadDeComments: 0,
            comentarios: [],
            comentarioTexto: [],
            users: [],
            listaPost: [],
            owner: [],
            modalVisible: false,
            posteoABorrar: null,
        }
    }

    // componentDidMount(){
    //     //Chequear apenas carga si el post está o no likeado
    //     if(this.props.dataPost.datos.likes.includes(auth.currentUser.email)){
    //         this.setState({
    //             like:true
    //         })
    //     }

    // }

    //Necesitamos en FB que cada Post tenga una propiedad con un array de emails

    likear() {
        //Agrega un email en la propiedad like del post.
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(res => this.setState({
                like: true,
                cantidadDeLikes: this.props.dataPost.datos.likes.length
            })

            )
            .catch(e => console.log(e))
    }

    unlike() {
        //Quita un email en la propiedad like del post.
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(res => this.setState({
                like: false,
                cantidadDeLikes: this.props.dataPost.datos.likes.length
            })

            )
            .catch(e => console.log(e))
    }

    borrarPost(item){
        db.collection('posts').doc(this.props.dataPost.id).delete()
        .then(()=> {alert('El post se ha eliminado exitosamente')})
        .catch(error => {
            console.error("Error al eliminar el post:", error);
            });
    }

    confirmarBorrarPost(item){
        this.setState({modalVisible: true, posteoABorrar: item});
    }

    finalBorrarPost(){
        this.borrarPost(this.state.posteoABorrar);
        this.setState({modalVisible: false, posteoABorrar: null});
    }

    noBorrarPost(){
        this.setState({modalVisible: false, posteoABorrar: null});
    }

    
    render() {
        console.log("props",this.props)
        console.log(this.props.dataPost.datos.likes)
        console.log(this.props.dataPost.datos.owner)
       
        
      
        return (
            <View style={styles.container}>
               
                {
                    auth.currentUser.email === this.props.dataPost.datos.owner ?
                    
                    <>

                    <TouchableOpacity  onPress={() => this.confirmarBorrarPost()}>
                        <Text style={styles.borrarp}> Borrar Post </Text>
                    </TouchableOpacity> 
                    
                    <Modal animation="slide" transparent={true} visible={this.state.modalVisible}>

                    

                        <View style={styles.centeredView}>
                        <View>
                        <Text> ¿Estas seguro de que quieres eliminar este posteo?</Text>

                        <TouchableOpacity onPress={()=> this.finalBorrarPost()}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> this.noBorrarPost()}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                        </View>
                        </View>

                    </Modal>
                    </>
                    : 
                    null
                }

                <Image
                style={{width: 300, height: 250 }}
                source={{ uri: this.props.dataPost.datos.photo }}
                />
                
                <Text style={styles.posteotext}>{this.props.dataPost.datos.textoPost}</Text>
                <Text>Cantidad de Likes: {this.state.cantidadDeLikes}</Text>
                {
                    this.state.like ?
                        <TouchableOpacity style={styles.button} onPress={() => this.unlike()}>
                            <Text style={styles.textButton}>unLike</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={styles.button} onPress={() => this.likear()} >
                            <Text style={styles.textButton}><FontAwesomeIcon icon={faHeart} color={ 'red' }/></Text>
                        </TouchableOpacity>
                }
                    <Text>Comentarios: {this.props.dataPost.datos.comentarios.length}</Text>
              
                {this.props.dataPost.datos.comentarios.length > 0 ?(
                       <FlatList
                       data = {this.props.dataPost.datos.comentarios.slice(0,4)}
                       keyExtractor={(com)=> com.id}
                       renderItem= {({item}) => (
                        <Text style={styles.commentBox}>
                         <Text style={styles.usuariosCom}>{item.userName}: </Text>
                         <Text >{item.texto}</Text>
                        </Text>
                       )} 
                       />
                      
                        ) : 
                        (<Text style={styles.sincomments}>No hay comentarios</Text>)}


            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 30,
        flex: 2,
        display: "flex",
        marginBottom: 2,
        borderRadius: 10,
        alignSelf: "center",
      },
      borrarp: {
        marginBottom: 10,
      },
    owner: {
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: 17,
      },
    posteotext: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    formContainer: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: 'orange',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'orange',
        marginTop: 5,
        marginBottom: 10,
    },
    textButton: {
        color: '#fff'
    },
    sincomments: {
        marginTop: 10,
    },
    usuariosCom:{
        fontWeight: "bold",
    }
})

export default Post;