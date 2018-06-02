import * as firebase from 'firebase'
import React from 'react'
import {ScrollView, StyleSheet, Text} from 'react-native'
import {GoogleLoginButton} from './components/GoogleLoginButton'
import {firebaseConfig} from './firebaseConfig'

firebase.initializeApp(firebaseConfig)

export class App extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.setState({user})
      }
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Hello World</Text>
        <GoogleLoginButton />

        <Text>{JSON.stringify(this.state.user, null, 2)}</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
  },
})
