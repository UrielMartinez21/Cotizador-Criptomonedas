import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

//------------------------------| Styled components |------------------------------
const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const App = () => {
//------------------------------| Uso de estados |------------------------------
  const [monedas, setMonedas] = useState({})                  // Criptomoneda y conversion
  const [resultado, setResultado] = useState({})              // Datos de la moneda y su conversion
  const [isCargando, setIsCargando] = useState(false)         // Mostrara animacion de carga

//------------------------------| Envio de datos |------------------------------
  useEffect(() => { 
    if (Object.keys(monedas).length > 0) {                    // Como es un objeto se usa asi y no '[]'
      const cotizarCripto = async () => {
        setIsCargando(true)
        setResultado({})                                      // Se reinicia el resultado
        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)                    // Respuesta del servidor
        const resultado= await respuesta.json()               // Conversion a JSON
        setResultado(resultado.DISPLAY[criptomoneda][moneda]) // Almacena en un objeto
        setIsCargando(false)
      }
      cotizarCripto()                                         // Ejecucion de la funcion
    }
  }, [monedas])

//------------------------------| Valor que regresara |------------------------------
  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt='Imagen de criptos'/>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario setMonedas={setMonedas} />

        {isCargando && (<Spinner />)}
        {resultado.PRICE && (<Resultado resultado={resultado} />)}
      </div>
    </Contenedor>
  )
}

export default App
