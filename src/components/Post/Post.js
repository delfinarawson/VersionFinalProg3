import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase/app';

class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            like: false,
            cantidadDeLikes: 0,
            cantidadDeComments: 0,
            comentarios: [],
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

    comment(email, comentario, date) {
        db.collection('posts').doc(this.props.dataPost.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(res => this.setState({
                user: email,
                comment: comentario,
                cantidadDeComments: this.props.dataPost.datos.comentarios.length
            })

            )
            .catch(e => console.log(e))

    }


    render() {
        console.log(this.props)
        console.log(this.props.dataPost.datos.likes)
        return (
            <View>
                <Text>{this.props.dataPost.datos.owner}</Text>
                <Text>{this.props.dataPost.datos.textoPost}</Text>
                <Text>Cantidad de Likes:{this.state.cantidadDeLikes}</Text>
                {
                    this.state.like ?
                        <TouchableOpacity style={styles.button} onPress={() => this.unlike()}>
                            <Text style={styles.textButton}>unLike</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={styles.button} onPress={() => this.likear()} >
                            <Text style={styles.textButton}>Likear</Text>
                        </TouchableOpacity>
                }

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ comentario: text })}
                    placeholder='Comentar...'
                    keyboardType='default'
                    value={this.state.comentario}
                />

                <TouchableOpacity style={styles.button} onPress={() => this.comment(auth.currentUser.email, this.state.comentario, Date.now())} >
                    <Text style={styles.textButton}>Comentar</Text>
                </TouchableOpacity>




            </View>

        )
    }

}

const styles = StyleSheet.create({
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
        borderColor: 'orange'
    },
    textButton: {
        color: '#fff'
    }
})

export default Post;