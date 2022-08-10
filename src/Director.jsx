import React,{useState,useRef,useEffect} from 'react'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
  } from "react-router-dom";
  import { useStore } from './store'
  import {
    Input,
    Button,
    InputGroup,
    InputRightElement,
    useToast,
  } from '@chakra-ui/react'
import RealTimeEditor from './RealTimeEditor';

const Director = () => {
  useEffect(() => {
    if(username){
      setDone(true);
    }
    },[])
    const inputRef = useRef()
  const roomIdRef = useRef()
    const toast = useToast()
    const { setUsername, setRoomId } = useStore(({ setUsername, setRoomId }) => ({
      setUsername,
      setRoomId,
    }))
    const { username, roomId ,text} = useStore(({ username, roomId ,text}) => ({
      username,
      roomId,
      text,
    }))
    const { roomid } = useParams();
    let [done, setDone] = useState(false);
    const enterRoom = async () => {
      
        const value = inputRef.current?.value
    if (!value || !roomid) {
        toast({
          title: 'Please enter text in both inputs',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return
      }
      setRoomId(roomid)
      setUsername(value)
      setDone(true)
    }
    
    console.log(username)
  return (
    <>{
            (!done) ? (<div>

        <InputGroup size="lg">
        <Input
          pr="4.5rem"
          size="lg"
          placeholder="Enter a username"
          ref={inputRef}
          />
        <InputRightElement width="4.5rem">
          <Button size="lg" onClick={enterRoom}>
            Join!
          </Button>
        </InputRightElement>
      </InputGroup>
          </div>
    )
    :
    <RealTimeEditor/>}
    </>
  )
}

export default Director