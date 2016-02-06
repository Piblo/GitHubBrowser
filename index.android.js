/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ProgressBarAndroid
} from 'react-native';

import Login from './login';
import AppContainer from './appContainer';
import {authService} from './authService';

class GitHubBrowser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    };
  }

  _handleLogin() {
    this.setState({
      isLoggedIn: true
    });
  }

  componentDidMount() {
    authService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      });
    });
  }

  render() {
    if (this.state.checkingAuth) {
      return (
        <View style={styles.loadingView}>
          <ProgressBarAndroid styleAttr={'Large'}/>
        </View>
      );
    }

    if (this.state.isLoggedIn) {
      return (
        <AppContainer />
      );
    } else {
      return (
        <Login onLogin={x => this._handleLogin()} />
      );
    }
  }
}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('GitHubBrowser', () => GitHubBrowser);
