import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const firebaseConfig = {
  // Placez ici vos identifiants Firebase (SDK) - Cf. diapos 14 et 15
  apiKey: 'AIzaSyAOpGes4aVVfe-p-wecFuSarUp_p72-23M',
  authDomain: 'pokedex-845f3.firebaseapp.com',
  projectId: 'pokedex-845f3',
  storageBucket: 'pokedex-845f3.appspot.com',
  messagingSenderId: '936520674241',
  appId: '1:936520674241:web:0ce9269b705e7a9e4e9d40'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getPokemons = callback => {
  const q = query(collection(db, 'pokemons'), orderBy('name', 'asc'))
  onSnapshot(q, snapshot => {
    let pokemons = []
    snapshot.forEach(doc => {
      pokemons.push({ id: doc.id, ...doc.data() })
    })
    callback(pokemons)
  })
}

export const addPokemon = pokemon => {
  addDoc(collection(db, 'pokemons'), pokemon)
}

export const updatePokemon = pokemon => {
  updateDoc(doc(db, 'pokemons', pokemon.id), pokemon)
}

export const deletePokemon = pokemon => {
  deleteDoc(doc(db, 'pokemons', pokemon.id))
}
