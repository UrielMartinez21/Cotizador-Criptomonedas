import styled from "@emotion/styled"
import { useState } from "react"

const Label = styled.label`
    color: #FFF;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`
const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`


const useSelectMonedas = (label) => {
//-----------------------| Funcion que se exportara |-----------------------
    const [state, setState] = useState('')
    //--->Nota: Funciones='{}'  ;   html='()'
    const SelectMonedas = () => (
        <>
            <Label>{label}</Label>
            <Select
                value={state}
                onChange={(e)=>setState(e.target.value)}
            >
                <option value=''>Seleccione</option>
                <option></option>
            </Select>
        </>
    )
//-----------------------| Valor que regresara |-----------------------
    //---> Se exporta la funcion como arreglo
    return ([SelectMonedas])
}

export default useSelectMonedas
