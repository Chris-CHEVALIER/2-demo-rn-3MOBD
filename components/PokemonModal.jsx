import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { addPokemon, updatePokemon } from '../Fire'

export default function PokemonModal (props) {
  const [name, setName] = useState(
    props.selectedPokemon ? props.selectedPokemon.name : ''
  )
  const [image, setImage] = useState(
    props.selectedPokemon ? props.selectedPokemon.image : ''
  )
  const [type1, setType1] = useState(
    props.selectedPokemon ? props.selectedPokemon.types[0].name : ''
  )
  const [type2, setType2] = useState(
    props.selectedPokemon ? props.selectedPokemon.types[1].name : ''
  )

  function handleSubmit () {
    const newPokemonData = {
      name: name,
      image: image,
      types: [{ name: type1 }, { name: type2 }]
    }
    if (props.selectedPokemon) {
      newPokemonData.id = props.selectedPokemon.id 
      updatePokemon(newPokemonData)
    } else {
      addPokemon(newPokemonData)
    }
  }

  return (
    <Modal visible={props.isVisible} animationType='slide'>
      <View style={styles.container}>
        <Text>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder='Nom'
          value={name}
          onChangeText={setName}
        />
        <Text>Image</Text>
        <TextInput
          style={styles.input}
          placeholder="URL de l'image"
          value={image}
          onChangeText={setImage}
        />
        <Text>Type 1</Text>
        <TextInput
          style={styles.input}
          placeholder='Type 1'
          value={type1}
          onChangeText={setType1}
        />
        <Text>Type 2</Text>
        <TextInput
          style={styles.input}
          placeholder='Type 2'
          value={type2}
          onChangeText={setType2}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{ color: 'white' }}>Valider</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.closeButton]}
          onPress={props.onClose}
        >
          <Text style={{ color: 'white' }}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderWidth: 2,
    borderColor: 'dodgerblue',
    borderRadius: 8,
    padding: 12,
    margin: 5
  },
  button: {
    backgroundColor: 'dodgerblue',
    padding: 10,
    borderRadius: 8,
    margin: 5
  },
  closeButton: {
    backgroundColor: 'rgb(218, 83, 70)'
  }
})
