import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
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
            <View>
                <TextInput
                    keyboardType='default'
                    placeholder='Buscar perfil'
                    onChangeText={(text) => this.cambiosControl(text)}
                    value={this.state.search}
                />
                <TouchableOpacity
                    onPress={() => this.searchUsuarios()}
                >
                    <Text>Buscar</Text>
                </TouchableOpacity>

                {this.state.mensajeError ? (
                    <Text>{this.state.mensajeError}</Text>
                ) : (
                    <FlatList
                        data={this.state.resultadosBusqueda}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity onPress={(data)=> this.props.navigation.navigate("Perfil Usuario", data)}>
                                <Text>User Name: {item.data.userName}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </View>
        )
    }
}

export default Buscador;