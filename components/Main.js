import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import amplify from '../aws-exports.js';
Amplify.configure(amplify);
import { withAuthenticator } from 'aws-amplify-react-native';

class Main extends Component {
  state = {
    signedIn: false
  };

  handleSubmit = () => {
    console.log('Logout Auth attributes:', this.props.authState);
    Auth.signOut()
      .then(data => {
        this.setState({signedIn: false});
        this.props.rerender();
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    console.log('Main Did Mount: Auth state: ', this.props.authState);
    this.setState({signedIn: true});
  }

  render() {
    const { signedIn } = this.state;
    console.log('Rendering.....');
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text>{signedIn ? "LOGOUT" : "LOGIN"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

// new default export for withAuthenticator (this is to receive props & force the rerender)
export default props =>  {
  const AppComponent = withAuthenticator(Main);
  return <AppComponent {...props} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
