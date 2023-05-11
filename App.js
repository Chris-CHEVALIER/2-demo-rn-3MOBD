import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import PokemonModal from './components/PokemonModal'
import { deletePokemon, getPokemons } from './Fire'

export default function App () {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  console.log(pokemons)

  useEffect(() => {
    /* fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0').then(
      response => {
        response.json().then(result => {
          setPokemons(result.results)
          setLoading(false)
        })
      }
    ) */
    getPokemons(pokemons => {
      setPokemons(pokemons)
      setLoading(false)
    })
  }, [])

  function handlePress () {
    setIsModalVisible(!isModalVisible)
  }

  function editPokemon (pokemon) {
    handlePress()
    setSelectedPokemon(pokemon)
  }

  function renderPokemon (pokemon) {
    return (
      <View>
        <Image
          source={{ uri: pokemon.image }}
          style={{ width: 120, height: 120 }}
        />
        <Text>{pokemon.name}</Text>
        <Button title='Modifier' onPress={() => editPokemon(pokemon)} />
        <Button title='Supprimer' onPress={() => deletePokemon(pokemon)} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Pokédex</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Ajouter un Pokémon</Text>
        {loading ? (
          <ActivityIndicator size='large' color='#00ff00' />
        ) : (
          <FlatList
            data={pokemons}
            keyExtractor={item => item.name}
            renderItem={({ item }) => renderPokemon(item)}
          />
        )}
      </TouchableOpacity>
      {isModalVisible && (
        <PokemonModal
          selectedPokemon={selectedPokemon}
          isVisible={isModalVisible}
          onClose={handlePress}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'rgb(218, 83, 70)',
    fontSize: 32,
    fontWeight: 'bold'
  },
  logo: {
    width: 120,
    height: 120
  }
})
