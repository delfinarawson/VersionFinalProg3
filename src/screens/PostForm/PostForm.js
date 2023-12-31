import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, ScrollView, Text, StyleSheet, View} from 'react-native';

import MyCamera from "../../components/MyCamera/MyCamera";

class PostForm extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',
           showCamera: true,
           url: '',
        }
    }

    //1)Completar la creación de posts
    crearPost(owner, textoPost, createdAt){
        //Crear la colección Users
        db.collection('posts').add({
            owner: owner, //auth.currentUser.email,
            textoPost: textoPost, //this.state.textoPost,
            createdAt: createdAt, //Date.now(), 
            likes: [], 
            comentarios: [], 
            photo: this.state.url,
           
        })
        .then( res => console.log(res))
        .catch( e => console.log(e))
    }

    onImageUpload(url){
        this.setState({
            url: url,
            showCamera: false,
        })
    }


    render(){
        return (
            <View style={styles.formContainer}>
              
              {this.state.showCamera ? (
                <MyCamera onImageUpload={(url) => this.onImageUpload(url)} />
              ) : (
                <>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ textoPost: text })}
                    placeholder="Escribir una descripcion"
                    keyboardType="default"
                    value={this.state.textoPost}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.crearPost(
                        auth.currentUser.email,
                        this.state.textoPost,
                        Date.now(),
                        this.state.url,
                        this.props.navigation.navigate('Home')
                        
                      )
                    }
                  >
                    <Text style={styles.textButton} >Postear</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          );
          
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})


export default PostForm;