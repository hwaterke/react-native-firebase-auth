import Expo from 'expo'
import * as firebase from 'firebase'
import React from 'react'
import styled from 'styled-components'

const Button = styled.TouchableHighlight`
  padding: 8px 16px;
  background: #e0492e;
`

const Text = styled.Text`
  color: white;
`

async function loginWithGoogle() {
  try {
    // Use expo to login to Google
    const {type, idToken, accessToken} = await Expo.Google.logInAsync({
      iosClientId:
        '196990192596-63lhgf2ieo6lr73mk6qi4ro2mhojbida.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    })

    if (type === 'success') {
      // Create credentials for firebase
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      )

      // Login with firebase
      await firebase.auth().signInWithCredential(credential)
    }
  } catch (err) {
    console.log('error in logInAsync', err)
  }
}

export class GoogleLoginButton extends React.Component {
  render() {
    return (
      <Button onPress={loginWithGoogle}>
        <Text>Google</Text>
      </Button>
    )
  }
}
