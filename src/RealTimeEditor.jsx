import React, { useEffect, useState,useRef } from 'react'
import 'codemirror/lib/codemirror.css'
// import 'codemirror/lib/codemirror'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import CodeMirror from 'codemirror'
import io from 'socket.io-client'
import { Text, Code } from '@chakra-ui/react'
import { useStore } from './store'
import styled from 'styled-components'
import './styling.css'
import Camvideo from './component/camvideo'
// import Videor from './component/videor'

// import styled from 'styled-components'


const RealTimeEditor = () => {
  const [users, setUsers] = useState([])
  
  const { username, roomId ,text} = useStore(({ username, roomId ,text}) => ({
    username,
    roomId,
    text,
  }))
  const [vcoll,setVcoll] = useState([]);


  const peers = {}

  let codeuntilnow = '';

  // const myvideo = useRef();
  
  const { setUsername, setRoomId ,setText} = useStore(({ setUsername, setRoomId ,setText}) => ({
    setUsername,
    setRoomId,
    setText,
  }))
  // let vg = Videor;

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('ds'), {
      lineNumbers: true,
      keyMap: 'sublime',
      theme: 'material-ocean',
      mode: 'javascript',
      
    },[])
    

    const widget = document.createElement('span')
    widget.textContent = 'hmmm?'
    widget.style.cssText =
      'background: #F37381; padding: 0px 3px; color: #F3F5F1; cursor: pointer;'

    // const bookMark = editor.setBookmark({ line: 1, pos: 1 }, { widget })
    // widget.onclick = () => bookMark.clear()
    // console.log(editor.getAllMarks())

    const socket = io('http://localhost:3001/', {
      transports: ['websocket'],
    })

    socket.on('CODE_CHANGED', (code) => {
      console.log(code)
      codeuntilnow = code;
      editor.setValue(code)

    })

    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`)
    })

    socket.on('connect', () => {
      const userid = "10"
      
      socket.emit('CONNECTED_TO_ROOM', { roomId, username })
      console.log(roomId , " here in realtime in line 61 ")
    })
    
    const mypeer = new Peer();



    mypeer.on('open', userid => {
      console.log('here at mypeer on')
      socket.emit('join-video-room', { roomId, userid})
    })
    
    socket.on('user-video-disconnected', (userId) => {
      if(peers[userId]){
      peers[userId].close();
      }
      console.log("user id is ",userId," in line no 82");
    })

    socket.on('disconnect', () => {
      socket.emit('DISSCONNECT_FROM_ROOM', { roomId, username })
    })

    socket.on('ROOM:CONNECTION', (users) => {
      setUsers(users)
      console.log(users)
    })

    editor.on('change', (instance, changes) => {
      const { origin } = changes
      // if (origin === '+input' || origin === '+delete' || origin === 'cut') {
      if (origin !== 'setValue') {
        setText(instance.getValue())
        socket.emit('CODE_CHANGED', instance.getValue())
      }
    })
    editor.on('cursorActivity', (instance) => {
      // console.log(instance.cursorCoords())
    })

    //for video stuff
    let myVideoStream;
    // const videoGrid = vg.current;
  const myvideo = document.createElement('video')
  myvideo.muted=true;
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  }).then(stream => { 
    console.log('New person has joined your room line no:110 in realtimeeditor.js')
    myVideoStream = stream;
    addVideoStream(myvideo,stream)
    mypeer.on('call',call => {
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', (userVideoStream) => {
        console.log('user video received')
        addVideoStream( video, userVideoStream,1)
      })
    })
    socket.on('user-video-connected', (userid) => {
      connectToNewUser(userid, stream)
    })
  })

  
  //for connection of new user
  function connectToNewUser(userId,stream){
    editor.setValue(codeuntilnow);
    const call = mypeer.call(userId,stream)
    const video = document.createElement('video')
    call.on('stream',userVideoStream => {
      console.log('new user added')
      addVideoStream(video,userVideoStream,0)
    })
    call.on('close', () => {
      console.log("some user disconnected line no 135 in rte.jsx");
      // video.remove()
      let vcolli = vcoll.filter(function(item) {
        return item !== value
    })
    setVcoll([...vcolli])
    })
    peers[userId] = call
  }



  function addVideoStream(video, stream, owner){
    video.srcObject = stream
    video.addEventListener('loadedmetadata', ()=>{
      video.play()
      
    })
    console.log("vcoll type is ", typeof vcoll)


    // videoGrid.append(<Camvideo video={video} controls={owner} username = {username}/>);
    setVcoll(vcoll => [...vcoll,video]);
    
  }
    return () => {
      socket.emit('DISSCONNECT_FROM_ROOM', { roomId, username })
    }
  }, [])
  
  let owned = 1;
  let Videoplayers = vcoll.map((item,index)=>{
    return <Camvideo Video={item} controls={owned} username = {username}/>;
  })
  return (
    <>
      <Text fontSize="2xl">Your username is: {username}</Text>
      <Text fontSize="2xl">The room ID is: {roomId}</Text>
      <Text fontSize="2xl">
        How many pople are connected: <b> {users.length}</b>
      </Text>
      {/* <Textcontainer> */}
      {/* <Container> */}
    <div className="container">

      <textarea id="ds" />
      {/* <div id = "Video-grid"></div> */}
      {/* <FullCont>

<Vcontainer> */}
        {Videoplayers}

{/* </Vcontainer>
</FullCont> */}
    </div>
      {/* </Container> */}
      {/* </Textcontainer> */}
    </>
  )
  
}



export default RealTimeEditor


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
