import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import React, { Component } from 'react';

import { db } from "../../firebase/config"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            search: '',
            resultadosBusqueda: [],
            mensajeError: '',
        };
    }

    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let users = []
            docs.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuarios: users,
            });
        })
    }

    cambiosControl(text) {
        this.setState({
            search: text
        })
    }

    searchUsuarios() {
        const busquedaLower = this.state.search.toLowerCase();

        const resultadosBusqueda = this.state.usuarios.filter((usuario) => 
            usuario.data.userName.toLowerCase().includes(busquedaLower)
        );

        if (resultadosBusqueda.length === 0) {
            this.setState({
                resultadosBusqueda: [],
                mensajeError: 'No hay resultados que coincidan.',
            });
        } else {
            this.setState({
                resultadosBusqueda: resultadosBusqueda,
                mensajeError: '',
            });
        }
    }

    render() {
        return (
            
            <>
                <View style={styles.adentro}>
                <TextInput style={styles.form}
                    keyboardType='default'
                    placeholder='Buscar perfil'
                    onChangeText={(text) => this.cambiosControl(text)}
                    value={this.state.search}
                />
                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => this.searchUsuarios()}
                >
                    <Text style={styles.textoBoton}>Buscar <FontAwesomeIcon icon={faMagnifyingGlass} color={ 'white' }/></Text>
                </TouchableOpacity>
                </View>
                

                {this.state.mensajeError ? (
                    <Text>{this.state.mensajeError}</Text>
                ) : (
                    
                    <FlatList
                        data={this.state.resultadosBusqueda}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={styles.rtaTitle}>Resultados: </Text>
                                <TouchableOpacity onPress={()=> this.props.navigation.navigate("Perfil Usuario", { dataUser: item.data })}>
                                <Text style={styles.rta}>User Name:  {item.data.userName}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
                
                </>
        )
    }
}

const styles = StyleSheet.create({
busqueda: {
      borderColor: 'grey',
      borderStyle: 'solid',
      borderWidth: 2,
      borderRadius: 30,
      marginLeft: 50,
      marginTop: 30,
      marginRight: 50,
      marginBottom: 300,
      backgroundColor: 'white',
    },
adentro: {
      alignItems: "center", 
      marginBottom: 10,
      marginTop: 40,
    },
boton: {
    backgroundColor: "blue",
    marginHorizontal: 10,
   paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#fff",
    width: '90%',
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 30,
    marginLeft: 90,
    marginTop: 30,
    marginRight: 90,
    marginBottom: 100,
  },
  textoBoton: {
    color: "white",
    textAlign: "center",
    fontWeight: 'bold',
  },
  form: {
    marginTop: 10,
    marginBottom: 5,
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 3,
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  rta: {
    fontSize: 15,
    paddingLeft: 50,
  },
  rtaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 50,
    paddingBottom: 20,
  }
  
   })
export default Buscador;