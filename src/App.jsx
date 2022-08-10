import React from 'react'
import EnterName from './EnterName'
import RealTimeEditor from './RealTimeEditor'
import './App.css'
import { useStore } from './store'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Director from './Director'

const App = () => {

  return (<>

  <Router className="App">
      <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
        we passes the imported component*/}
          <Route path="/" element={<EnterName/>} />
          <Route path="/:roomid" element={<Director/>} />
          
        </Routes>
    </Router>
  </>)
  // const username = useStore(({ username }) => username)

  // return <>{username ? <RealTimeEditor /> : <EnterName />}</>
}

export default App
