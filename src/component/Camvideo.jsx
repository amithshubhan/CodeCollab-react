import React from 'react'
import styled from 'styled-components'
const Camvideo = ({Video,controls,username}) => {
  return (
      <>
    <VideoCont>
        <NameTag>{username}</NameTag>
        <Video></Video>
    </VideoCont>
    </>
  )
}

export default Camvideo

const VideoCont = styled.div`
    display: flex;
    margin: 10px;
    justify-content: center;
    align-items: center;

`
const NameTag = styled.div`
    display: flex;
    position: abolute;
    padding: 5px;
    margin: 5px;
`