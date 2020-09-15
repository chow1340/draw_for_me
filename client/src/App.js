import React, {useEffect, useState} from 'react';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import './views/assets/vendor/bootstrap/css/bootstrap.css';
import './views/assets/css/main.css';
import Menu from './views/Menu';


function App() {
  return (
    <div className="App">
      <Menu 
      />
    </div>
  );
}

export default App;
