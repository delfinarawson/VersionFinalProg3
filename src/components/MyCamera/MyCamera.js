import React, { Component } from "react";
import {Camera} from 'expo-camera'
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { storage } from "../../firebase/config";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';



class MyCamera extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            permisos: false, 
            photo: '', 
            showCamera: true}
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(res => {
            if (res.granted === true) {
                this.setState({
                    permisos: true
                })
            }
        })
        .catch(e => console.log(e))
    }

    takePicture(){
        this.metodosCamara.takePictureAsync()
        .then( photo => {
            this.setState({
                photo: photo.uri,
                showCamera: false
            })
        })
        .catch(e => console.log(e))
    }

    rechazarFoto(){
        this.setState({
            showCamera: true,
        })
    }

    acceptPicture(){
        fetch(this.state.photo)
        .then(res => res.blob())
        .then(image => {
           const ref = storage.ref(`photo/${Date.now()}.jpg`)
           ref.put(image)
           .then( () => {
            ref.getDownloadURL()
            .then( url => {
                this.props.onImageUpload(url)
            }
            )
        })
        })
        .catch(e => console.log(e))
    }

    render(){

        console.log(this.state.photo)
        return (
            <>
                {this.state.permisos ? 
                this.state.showCamera ?
                <View style={styles.formContainer} >
                    <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={metodosCamara => this.metodosCamara = metodosCamara}/>
                    <TouchableOpacity
                        style={styles.button}
                         onPress={() => this.takePicture()}
                        >
                        <Text style={styles.textButton}><FontAwesomeIcon icon={faCamera} color = {'white'}/>  Sacar foto</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.formContainer}>
                    <Image style={styles.camera} source={{uri: this.state.photo}} />
                    <TouchableOpacity
                        style={styles.button}
                         onPress={() => this.acceptPicture()}
                        >
                        <Text style={styles.textButton}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                         onPress={() => this.rechazarFoto()}
                        >
                        <Text style={styles.textButton}>Rechazar</Text>
                    </TouchableOpacity>
                </View>
                :
                alert('Asegurate de tener los permisos de la camara')
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: `60vh`,
        widht: `100vw`,
    },
    camera: {
        widht: '20%',
        height: '100%',
    },
    input: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderStyle: "solid",
      borderRadius: 6,
      marginVertical: 10,
    },
    button: {
      backgroundColor: "blue",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
    },
    textButton: {
      color: "#fff",
      fontWeight: 'bold',
    },
  });


export default MyCamera