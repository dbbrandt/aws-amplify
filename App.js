import React, { Component } from 'react';
import { StyleSheet, Text, View, TextButton } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import amplify from './aws-exports.js';
Amplify.configure(amplify);
import { withAuthenticator } from 'aws-amplify-react-native';
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";

const App = () => {
  const handleSignOut = () => {

  };

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TextButton onPress={() => console.log('help')}>
          logout
        </TextButton>
      </View>
    );
};

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
