import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-zjltb3n1.au.auth0.com',
      audience: 'https://dev-zjltb3n1.au.auth0.com/userinfo',
      clientID: 'tdWcPjeQnkZUQJH79YBaTzApEgvcDNWM',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        this.expiresAt = authResult.idTokenPayload.exp * 500;
        resolve();
      });
    })
  }

  signOut() {
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
    this.auth0.logout({
        returnTo: 'http://localhost:3000',
        clientID: 'tdWcPjeQnkZUQJH79YBaTzApEgvcDNWM',
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;