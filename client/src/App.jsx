import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [CaT, setCaT] = useState('');
  const [cAT, setcAT] = useState('');
  const [CAt, setCAt] = useState('');

  useEffect(() => {
    cATURL()
  }, []);

  const cATURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('id');
    setcAT(value);
  }
  useEffect(() => {
    if (cAT === 'hi') {
      console.log('hi');
    } else if (cAT === 'hello') {
      console.log('Meow');
    } else {
      console.log(cAT);
    }
  }, [cAT]);

  return (
    <>
      <div>
        <div className="catimg">
          
        </div>
        <div className="catinfo">
          <h1>cat name: {CaT}</h1>
          <p>cat description: {CAt}</p>
          <span>
            id: {cAT}
          </span>
        </div>
      </div>
    </>
  )
}

export default App
