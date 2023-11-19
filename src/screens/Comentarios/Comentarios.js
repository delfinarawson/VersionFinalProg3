import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList, Modal, Image } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase/app';

class Comentarios extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            cantidadDeComments: 0,
            comentarios: [],
            comentarioTexto: []
            
        }
    }
 

    comment(comentario, date) {
        let comment = {
            userName: auth.currentUser.email,
            createdAt:date,
            texto: comentario
        }
        db.collection('posts').doc(this.props.route.params.dataPost.item.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion(comment)
        })
            .then(res => this.setState({
                user: auth.currentUser.email,
                comment: this.props.route.params.dataPost.item.comentario,
                //cantidadDeComments: this.props.route.params.dataPost.item.comentarios.length
            })

            )
            .catch(e => console.log(e))


    }   

   

    


    render() {
      console.log(this.props.route.params.dataPost)
        return (
            <View style={styles.container}>
                <Text style={styles.owner}>Este posteo es de:{this.props.route.params.dataPost.item.datos.owner}</Text>
                <Image
                style={{width: 300, height: 250 }}
                source={{ uri: this.props.route.params.dataPost.item.datos.photo }}
                />
                <TouchableOpacity style={styles.button} onPress={ () => this.props.navigation.navigate('Menu')}>
                   <Text style={styles.textButton}>Volver Atras</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ comentarioTexto: text  })}
                    placeholder='Comentar...'
                    keyboardType='default'
                    value={this.state.comentarioTexto}
                />
            
                <TouchableOpacity style={styles.button} onPress={() => this.comment(this.state.comentarioTexto, Date.now())} >
                    <Text style={styles.textButton}>Comentar</Text>
                </TouchableOpacity>
                {this.props.route.params.dataPost.item.datos.comentarios.length > 0 ?(
                       <FlatList
                       data = {this.props.route.params.dataPost.item.datos.comentarios}
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
        borderColor: "grey",
        borderWidth: 3,
        borderStyle: "solid",
        padding: 50,
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

export default Comentarios;