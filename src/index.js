import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase'
import {Provider} from 'react-redux'
import store from './store/store'


 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyC0utGZRVHqe1bI9KYqkUgO75nKgo-RfxM",
  authDomain: "web-messenger-483fa.firebaseapp.com",
  databaseURL: "https://web-messenger-483fa.firebaseio.com",
  projectId: "web-messenger-483fa",
  storageBucket: "web-messenger-483fa.appspot.com",
  messagingSenderId: "173878597660",
  appId: "1:173878597660:web:68e8970bfa8122106c67d9",
  measurementId: "G-RMX06NRF6X"
};

firebase.initializeApp(firebaseConfig);

window.store=store

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
