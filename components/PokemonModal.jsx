import React from 'react'
import { View, Text, Modal, Button } from 'react-native'

export default function PokemonModal (props) {
  return (
    <Modal visible={props.isVisible} animationType='slide'>
      <Text>Ma modale</Text>
      <Button title='Fermer' onPress={props.onClose} />
    </Modal>
  )
}
