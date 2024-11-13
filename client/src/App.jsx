// *********************************************** //
// Дата релиза: 15.11.24
// *********************************************** //

// *********************************************** //
// Для связи: 
// tg: @dev_bduidan
// email: support@project.bduidan.ru, me@bduidan.ru
// *********************************************** //

// *********************************************** //
// Проект полностью готов тут: -> https://justcats.bduidan.ru <-
// *********************************************** //
// Это простая публичная серверная часть БЕЗ логики с бд
// Это уже будет на http://api.bduidan.ru:3100
// *********************************************** //





import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [CaT, setCaT] = useState('');
  const [cAT, setcAT] = useState('');
  const [cat, setcat] = useState('');
  const [catImage, setCatImage] = useState('');
  const [caterror, setCatError] = useState('');
  const [CAt, setCAt] = useState('');
  const [CATStyle, setCATStyle] = useState("none");
  const [CATStyle2, setCATStyle2] = useState("block");
  const [cATDecor, setcATDecor] = useState('');
  const [cATMax, setcATMax] = useState('');
  const origin = new URL(document.URL).origin + '/';
  const url = document.URL;

  useEffect(() => {
    cATURL();

    console.log(origin, url)
    // *********************************************** //

    // Тут код дебагинга

    // if (origin == url) {
    //   console.log('heeeelo')
    // }
    // *********************************************** //
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
      window.location.href = `${origin}?id=${cATMax}`;
    } else if (cAT !== 1) {
      window.location.href = `${origin}?id=${cAT - 1}`;
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
      window.location.href = `${origin}?id=${cATMax}`;
    } else if (cAT !== cATMax) {
      window.location.href = `${origin}?id=${cAT + 1}`;
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

  // *********************************************** //
  // Тут был код, который я удалил..
  // *********************************************** //

  useEffect(() => {
    if (cAT) {
      cATURLInfo(cAT);
      setCATStyle('none');

      // *********************************************** //
      // TODO Пофиксить баг

      // if (cAT > cATMax) {
      //   console.debug(cAT, cATMax)
      //   setCATStyle("block");
      //   setCATStyle2("none")
      // }

      // cATURLImage(cAT)
      // *********************************************** //

    } else {

    }
    console.log(cAT)


  }, [cAT]);

  useEffect(() => {
  })

  return (
    <>
      <div style={{ display: CATStyle }}>
        <img src="http://localhost:3000/errorCats" alt="" />
      </div>
      <div>
        <div className="catimg">
          <img src={`http://localhost:3000/imagesCats?id=${cAT}`} alt="" />
        </div>
        <div style={{ display: CATStyle2 }} className="catinfo">
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

        {/* *********************************************** */}
        {/* Тут часть релиза */}

        {/* Проект полностью готов тут: https://justcats.bduidan.ru */}

        {/* <div>
          <h1>
            Just Cats
          </h1>
          <p>
            Just cats - социальная сеть для котиков, на которой есть котики ( и по пользовательскому соглашению) ВЫ должны являться котиком, или котоподобным юзером интернета. 
          </p>
        </div> */}

        {/* *********************************************** */}
      </div>
    </>
  )
}

export default App
