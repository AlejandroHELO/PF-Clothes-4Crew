import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from './redux/actions';
import React from 'react';
import Navbar from './components/navbar/navbar';

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
  }, [])
  return (
    <div>
      <Navbar />
      <h1>Hola mundo</h1>
    </div>
  );
}

export default App;
