import React, { Component } from "react";
import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDHEbdPdfTecaZ0Z6TnlpT0tTyI_wN897k",
  authDomain: "usurvey-c6708.firebaseapp.com",
  databaseURL: "https://usurvey-c6708.firebaseio.com",
  projectId: "usurvey-c6708",
  storageBucket: "usurvey-c6708.appspot.com",
  messagingSenderId: "510997870132"
};
firebase.initializeApp(config);

class Auth extends Component {
  login(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user => {
      var lout = document.getElementById("logout");

      //Write a welcome message for user
      lout.classList.remove("hide");
    });

    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({ err: err });
    });
  }
  signup() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise.then(user => {
      var err = "Welcome " + user.email;
      firebase
        .database()
        .ref("users/" + user.uid)
        .set({
          email: user.email
        });
      console.log(user);
      this.setState({ err: err });
    });
    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({ err: err });
    });
  }

  logout() {
    firebase.auth().signOut();
    var lout = document.getElementById("logout");

    // Write a thanks to user
    lout.classList.add("hide");
  }

  google() {
    console.log("I am in google method");

    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithRedirect(provider);

    promise.then(result => {
      var user = result.user;
      console.log(result);
      firebase
        .database()
        .ref("users/" + user.uid)
        .set({
          email: user.email,
          name: user.displayName
        });
    });
    promise.catch(e => {
      var msg = e.message;
      var code = e.code;

      console.log(msg, code);
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      err: ""
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }

  render() {
    return (
      <div>
        <input
          id="email"
          ref="email"
          type="email"
          placeholder="enter your email"
        />
        <br />
        <input
          id="pass"
          ref="password"
          type="password"
          placeholder="enter your password"
        />
        <br />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.logout} id="logout" className="hide">
          Log Out
        </button>
        <br />
        <button onClick={this.google} id="google" className="google">
          Sign in with Google
        </button>
      </div>
    );
  }
}

export default Auth;
