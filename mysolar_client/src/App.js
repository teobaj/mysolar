import React, { useState } from 'react';
import './App.css';
import { Private } from './components/private/Private';
import { Public } from './components/public/Public';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {

  const notify = (msg, type) => {
    if (type === 'success') {
      return toast.success(msg);
    } else if (type === 'warning') {
      return toast.warn(msg);
    } else if (type === 'error') {
      return toast.error(msg)
    } else {
      return toast(msg);
    }
  }
  //App state
  const [isLogged, setIsLogged] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [user, setUser] = useState({});
  const [panels, setPanels] = useState([]);

  return (
    <div className="App">
      {isLogged ? <Private user={user} notify={notify} setIsLogged={setIsLogged} /> : <Public setApiKey={setApiKey} setIsLogged={setIsLogged} setUser={setUser} />}
      <ToastContainer />
    </div>
  );
}

export default App;
