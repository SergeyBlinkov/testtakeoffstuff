import React from 'react';
import {BrowserRouter} from "react-router-dom";
import RouterApp from "./Route/RouterApp";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
      <BrowserRouter>
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
        <RouterApp />
      </BrowserRouter>
  );
}

export default App;
