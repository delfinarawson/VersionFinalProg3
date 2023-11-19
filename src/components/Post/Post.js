import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList, Modal, Image } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase/app';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {faComment} from '@fortawesome/free-solid-svg-icons/faComment';

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

                <Image
                style={{width: 300, height: 250 }}
                source={{ uri: this.props.dataPost.datos.photo }}
                />


                <Text style={styles.posteotext}>{this.props.dataPost.datos.textoPost}</Text>
                
                <View style={styles.contenedorLike}>
                {
                    this.state.like ?
                        <TouchableOpacity style={styles.buttonHeart} onPress={() => this.unlike()}>
                            <Text style={styles.textButton}><FontAwesomeIcon icon={faHeart} color={ 'red' }/></Text><Text>{this.state.cantidadDeLikes} Likes</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={styles.buttonHeart} onPress={() => this.likear()} >
                            <Text style={styles.textButton}><FontAwesomeIcon icon={faHeart}/></Text><Text>{this.state.cantidadDeLikes} Likes</Text>
                        </TouchableOpacity>
                }
                </View>


                

                    <Text><FontAwesomeIcon icon={faComment} /> {this.props.dataPost.datos.comentarios.length} Comentarios</Text>
              
                {this.props.dataPost.datos.comentarios.length > 0 ?(
                       <FlatList style = {styles.commentFlatlist}
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
                
                
               
                {
                    auth.currentUser.email === this.props.dataPost.datos.owner ?
                    
                    <>

                    <TouchableOpacity style={styles.button} onPress={() => this.confirmarBorrarPost()}>
                        <Text><FontAwesomeIcon icon={faTrash} color = {'red'}/> </Text>
                    </TouchableOpacity> 
                    
                    <Modal animation="slide" transparent={true} visible={this.state.modalVisible}>

                    

                        
                        <View style={styles.chequeo}>
                        <Text> ¿Estas seguro de que quieres eliminar este posteo?</Text>

                        <TouchableOpacity style={styles.button} onPress={()=> this.finalBorrarPost() }>
                            <Text style={styles.textButtonDelete}>Aceptar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={()=> this.noBorrarPost()}>
                            <Text style={styles.textButtonDelete}>Cancelar</Text>
                        </TouchableOpacity>
                        </View>
                        

                    </Modal>
                    </>
                    : 
                    null
                }
                
                
                


            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: `60vh`,
        widht: `100vw`,
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
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
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        marginTop: 5,
        marginBottom: 10,
        borderColor: 'white',
    },
    textButton: {
        color: '#fff'
    },
    sincomments: {
        marginTop: 10,
    },
    usuariosCom:{
        fontWeight: "bold",
    },
    chequeo: {
        position: 'absolute',
        width: 300,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 20,
        zIndex: 1, // Asegura que el cartel esté encima de los demás elementos
    },
    buttonHeart: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 10,
        borderStyle: 'none',
    },
    contenedorLike: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    commentFlatlist: {
        paddingTop: 20,
    }

    

})

export default Post;