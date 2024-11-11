import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [CaT, setCaT] = useState('');
  const [cAT, setcAT] = useState('');
  const [cat, setcat] = useState('');
  const [catImage, setCatImage] = useState('');
  const [caterror, setCatError] = useState('');
  const [CAt, setCAt] = useState('');
  const [CATStyle, setCATStyle] = useState("none")
  const [cATDecor, setcATDecor] = useState('')
  const [cATMax, setcATMax] = useState('')

  useEffect(() => {
    cATURL()
  }, []);

  const cATURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('id');
    setcAT(Number(value));
  }

  const cATBack = () => {
    if (cAT !== 1) {
      return `${cAT - 1} <-`
    } else if (cAT < 1) {
      return `-> 1 <-`
    } else {
      return `..`
    }
  }

  const cATBackOnClick = () => {
    if (cAT < 1) {
      window.location.href = `${new URL(document.URL).origin}?id=${cATMax}`;
    } else if (cAT !== 1) {
      window.location.href = `${new URL(document.URL).origin}?id=${cAT - 1}`;
    } else {
    }
  }

  const cATNext = () => {
    if (cAT > cATMax) {
      return `-> ${cATMax} <-`
    } else if (cAT !== cATMax) {
      return `-> ${cAT + 1}`
    } else {
      return `..`
    }
  }

  const cATNextOnClick = () => {
    if (cAT > cATMax) {
      window.location.href = `${new URL(document.URL).origin}?id=${cATMax}`;
    } else if (cAT !== cATMax) {
      window.location.href = `${new URL(document.URL).origin}?id=${cAT + 1}`;
    } else {
    }
  }

  const cATURLError = async () => {
    const url = `http://localhost:3000/errorCats`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();

    } catch (error) {
      console.error(error);
    }
  }

  const cATURLInfo = async (cAT) => {
    const url = `http://localhost:3000/cats?id=${cAT}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      setCaT(`cat name: ${data.name}`);
      setCAt(`cat description: ${data.description}`);
      setcat(`author: ${data.author}`)
      setcATDecor(`id: ${data.id}`)
      setcATMax(`${Number(data.maxid)}`)

    } catch (error) {
      console.error(error);
    }
  };

  // const cATURLImage = (cAT) => {
  //   cATURLImage = `http://localhost:3000/imagesCats?id=${cAT}`;

  // };

  useEffect(() => {
    if (cAT) {
      cATURLInfo(cAT);
      setCATStyle('none');
      // cATURLImage(cAT)
    } else {
      setCATStyle("block")
      cATURLError()
    }
  }, [cAT]);

  return (
    <>
      <div style={{ display: CATStyle }}>
        <img src="http://localhost:3000/errorCats" alt="" />
      </div>
      <div>
        <div className="catimg">
          <img src={`http://localhost:3000/imagesCats?id=${cAT}`} alt="" />
        </div>
        <div className="catinfo">
          <h1>{CaT}</h1>
          <p>
            {CAt}
          </p>
          <p>
            {cat}
          </p>
          <span>
            {cATDecor}
          </span>
        </div>
        <div>
          <button onClick={cATBackOnClick}>
            {cATBack()}
          </button>
          {cAT}
          <button onClick={cATNextOnClick}>
            {cATNext()}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
