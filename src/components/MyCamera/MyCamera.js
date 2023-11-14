import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {db, storage} from '../../firebase/config';
import { TouchableOpacity, View, Text } from 'react-native';

class MyCamera extends Component{
    constructor(props){
        super(props),
        this.state = {
            permisosDeHardware: false,
            photo: '',
            mostrarLaCamara: true, //Para elegir si queremos mostrar cámara o preview de foto.

            errorMensaje: '',
            errorCode: '',
        }
        
        this.metodosDeCamara = '' //Guardar los métodos internos de la cámara.

    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( ()=>{
                this.setState({
                    permisosDeHardware: true,
                })
            })
            .catch( e => console.log(e))
    }

    sacarFoto(){
        this.metodosDeCamara
            .takePictureAsync()
            .then((photo) => {
                console.log(photo);
                this.setState(
                    {
                        photo: photo.uri,
                        showCamera: false,
                    }
                );
            })

            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: error.message,
                    errorCode: error.code,
                })
            })

    }

    guardarLaFotoEnStorage(){
        fetch(this.state.photo)
        .then((res) => res.blob())
            .then((image) => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image)
                    .then(()=> {
                        ref.getDownloadURL()
                        .then((url) => {this.props.onImageUpload(url)
                        this.setState({
                            photo:"",
                        })
                        });
        })
        
        })

        .catch((err) => {
            console.log(err);
            this.setState({
                errorMessage: error.message,
                errorCode: error.code,
            })
        })
    }

    clearPicture(){
        this.setState({
            photo: '',
            showCamera: true, 
        })
    }


    render(){
        //El return tiene que mostrar la cámara o el preview de la foto con las opciones de cancelar o confirmar.
        return(
            <>
                {this.state.photo ? (
                    <>
                        <View style={styles.camera}>
                            <Image 
                                style={styles.camera}
                                source={{uri: this.state.photo}}
                            />
                        </View>
                        
                        <View>
                            <TouchableOpacity onPress={() => this.guardarLaFotoEnStorage() }>
                                <Text> Aceptar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.clearPicture() }>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : 
                <>
                < Camera
                    type={Camera.Constants.Type.front}
                    ref={(cam) => (this.camera = cam) }
                />
                <TouchableOpacity onPress={() => this.sacarFoto()}>
                    <Text> Shoot </Text>
                </TouchableOpacity>
                </>
                }                
            </>
        )
    }

}

export default MyCamera;