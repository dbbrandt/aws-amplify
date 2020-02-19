import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput} from 'react-native';
import Amplify, { Auth, Analytics, API } from 'aws-amplify';
import amplify from '../aws-exports.js';
Amplify.configure(amplify);
Analytics.disable();
import { withAuthenticator } from 'aws-amplify-react-native';

class Main extends Component {
  state = {
    signedIn: false,
    apiResponse: null,
    apiError: null,
    url: null
  };

  handleSubmit = () => {
    console.log('Logout Auth attributes:', this.props.authState);
    Auth.signOut()
      .then(data => {
        this.setState({signedIn: false});
        this.props.rerender();
      })
      .catch(err => {
        console.log(err);
      });
  };
  async getSample() {
    const url = this.state.url;
    const path = url; // you can specify the path
    try {
      const apiResponse = await API.get("testListApi", path); //replace the API name
      this.setState({apiResponse, apiError: null});
      console.log('response:', apiResponse);
    } catch(err) {
      this.setState({apiError: err, apiResponse: null});
      console.log('error response:' + err);
    }
  }

  componentDidMount() {
    console.log('Main Did Mount: Auth state: ', this.props.authState);
    this.setState({signedIn: true});
  }

  onChange = (text) => {
    this.setState({url: text})
  };

  render() {
    const { signedIn, url } = this.state;
    console.log('Rendering.....');
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text>{signedIn ? "LOGOUT" : "LOGIN"}</Text>
        </TouchableOpacity>
        <View>
          <TextInput
            placeholder="Input Url ex. /items/..."
            value={url}
            onChangeText={text => this.onChange(text)}
          />
          <Button title="Send Request" onPress={this.getSample.bind(this)} />
          {this.state.apiResponse &&
            <View>
              <Text>Success: {this.state.apiResponse && JSON.stringify(this.state.apiResponse.success)}</Text>
              <Text>Params: {this.state.apiResponse && JSON.stringify(this.state.apiResponse.params)}</Text>
              <Text>Query: {this.state.apiResponse && JSON.stringify(this.state.apiResponse.query)}</Text>
            </View>
           }
          {this.state.apiError &&
            <Text>Error: {this.state.apiError && JSON.stringify(this.state.apiError.message)}</Text>
          }
        </View>
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
