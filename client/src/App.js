import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { getProducts } from './redux/actions';
import React from 'react';

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
  }, [])
  return (
    <div className="App">
      <h1>Hola mundo</h1>
    </div>
  );
}

export default App;
