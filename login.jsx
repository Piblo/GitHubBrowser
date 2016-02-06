import React, {Component, Text, View, StyleSheet, Image, TextInput, TouchableHighlight, ProgressBarAndroid} from 'react-native';
import {authService} from './authService.js';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false
    };
  }

  _handleClick() {
    this.setState({
      loading: true,
      error: null
    });

    authService.login({
      username: this.state.username,
      password: this.state.password
      }, result => {
        this.setState(Object.assign({
          loading: false
        }, result));

        if (result.success && this.props.onLogin) {
          this.props.onLogin();
        }
      });

  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./img/github-logo.png')}/>
        <Text style={styles.heading}>
          GitHub User Browser
        </Text>
        <TextInput placeholder={'Username'} onChangeText={text => this.setState({username: text})}/>
        <TextInput placeholder={'Password'} secureTextEntry={true} onChangeText={text => this.setState({password: text})}/>
        {
          !this.state.loading ?
            <TouchableHighlight style={styles.button} onPress={x => this._handleClick()}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableHighlight>
          : <ProgressBarAndroid style={styles.progress} styleAttr={'Large'}/>
        }

        {
          this.state.error ?
            <Text>{this.state.error}</Text>
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: 'center'
  },
  logo: {
    width: 200,
    height: 200
  },
  heading: {
    fontSize: 30,
    marginTop: 20
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#CCCCCC',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF'
  },
  progress: {
    marginTop: 20
  }
});