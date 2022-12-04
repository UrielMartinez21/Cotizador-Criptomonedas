import React, { useEffect, useState } from 'react'
import { monedas } from '../data/monedas'
import useSelectMonedas from '../hooks/useSelectMonedas'
import styled from '@emotion/styled'
import Error from './Error'

//------------------------------| Styled components |------------------------------
const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({ setMonedas }) => {
//------------------------------| Uso de estados |------------------------------
    const [criptos, setCriptos] = useState([])
    const [isError,setIsError]=useState(false)

//------------------------------| Uso de hooks personalizados |------------------------------
    const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas("Elije tu criptomoneda", criptos)

//------------------------------| Uso de efectos |------------------------------
    useEffect(() => {
        const consultarAPI = async () => {                      // Funcion asincrona
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const respuesta = await fetch(url)                  // Trae el objeto del link
            const resultado = await respuesta.json()            // Convierte el objeto en JSON

            const arrayCriptos = resultado.Data.map(cripto => { // 'map' devuelve un nuevo arreglo
                const objeto = {                                // Nueva estructura
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto                                   // Devolvera un arreglo de objetos 
            })

            setCriptos(arrayCriptos)
        }
        consultarAPI()
    }, [])

//------------------------------| Funcion de envio |------------------------------
    const handleSubmit = (e) => {
        e.preventDefault()
        if ([moneda, criptomoneda].includes('')) {      // Si algun elemento del arreglo tiene cadena vacia
            setIsError(true)
            return                                      // No ejecutara la siguiente linea
        }
        setIsError(false)
        setMonedas({moneda,criptomoneda})
    }


//------------------------------| Valor que regresara |------------------------------
    return (
        <>
            { isError&& (<Error>LLena todos los campos</Error>)}
            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCriptomoneda />
                <InputSubmit 
                    type="submit" 
                    value="Cotizar" 
                />
            </form>
        </>
    )
}

export default Formulario
