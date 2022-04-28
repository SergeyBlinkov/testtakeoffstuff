import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./Redux/ReduxStore";
import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";


// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyADPybX1jL2yuR0jTeqCzVh__H2mlEuIkw",
    authDomain: "taskfortakeoffstuff.firebaseapp.com",
    projectId: "taskfortakeoffstuff",
    storageBucket: "taskfortakeoffstuff.appspot.com",
    messagingSenderId: "1021708582662",
    appId: "1:1021708582662:web:e8c58843c2e09b157d6887"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);

