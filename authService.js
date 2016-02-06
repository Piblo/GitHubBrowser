import buffer from 'buffer';
import React, {AsyncStorage} from 'react-native';
import * as _ from 'lodash'

const authKey = 'auth';
const userKey = 'user';

class AuthService {
  getAuthInfo(callback) {
    AsyncStorage.multiGet([authKey, userKey], (err, val) => {
      if (err) {
        return callback(err);
      }

      if (!val) {
        return callback();
      }

      const zippedObj = _.fromPairs(val);

      if (!zippedObj[authKey]) {
        return callback();
      }

      const authInfo = {
        header: {
          Authorization: 'Basic ' + zippedObj[authKey]
        },
        user: JSON.parse(zippedObj[userKey])
      }

      return callback(null, authInfo);
    });
  }

  login(credentials, callback) {
    const b = new buffer.Buffer(credentials.username + ':' + credentials.password);
    const encodedAuth = b.toString('base64');
    console.log(encodedAuth);

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': 'Basic ' + encodedAuth
      }
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }

      if (response.status == 401) {
        throw {error:'Bad credentials'};
      }

      throw {error:'Unknown error'};
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      AsyncStorage.multiSet([
        [authKey, encodedAuth],
        [userKey, JSON.stringify(result)],
      ], err => {
        if (err) {
          throw err;
        }
      });
      return callback({success: true});
    })
    .catch(err => {
      return callback(err);
    });
  }
}

const authService = new AuthService();
export {authService};