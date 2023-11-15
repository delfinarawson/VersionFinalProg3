import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import React, { Component } from 'react';

import { db } from "../../firebase/config"

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
            <ScrollView>
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
                    <Text style={styles.textoboton}>Buscar</Text>
                </TouchableOpacity>

                {this.state.mensajeError ? (
                    <Text>{this.state.mensajeError}</Text>
                ) : (
                    <FlatList
                        data={this.state.resultadosBusqueda}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity onPress={()=> this.props.navigation.navigate("Perfil Usuario", { dataUser: item.data })}>
                                <Text>User Name: {item.data.userName}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
boton: {
    backgroundColor: "orange",
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
  },
  textoboton: {
    color: "white",
    textAlign: "center",
  },
  form: {
    marginTop: 5,
      marginBottom: 5,
      borderColor: 'grey',
      borderStyle: 'solid',
      borderWidth: 3,
      width: '80%',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 4,
  },
  
   })
export default Buscador;