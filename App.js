import { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import PokemonModal from './components/PokemonModal'

export default function App () {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function handlePress () {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Pokédex</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Ajouter un Pokémon</Text>
        <ActivityIndicator size='large' color='#00ff00' />
      </TouchableOpacity>
      <PokemonModal isVisible={isModalVisible} onClose={handlePress} />
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
