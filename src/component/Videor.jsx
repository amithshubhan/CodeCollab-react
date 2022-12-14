import React from 'react'
import styled from "styled-components"

const Videor = () => {
  return (
    <FullCont>

    <Vcontainer>

    </Vcontainer>
    </FullCont>
  )
}
export default Videor;
const FullCont = styled.div`
    display: flex;
    width: 300px;
    height: 100vh;
    justify-content: center;

`

const Vcontainer = styled.div`
    display: flex;
    padding: 20px;
    margin: 5px;
    border-radius: 10px;
    flex-direction: columns;
    width: 300px;
    justify-content: center;
    align-items: center;

`

