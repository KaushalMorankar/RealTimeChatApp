import Chat from "./pages/Chat";
import React, { useContext } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap"
import NavBar from "./components/Navbar"
import {Route,Routes,Navigate} from "react-router-dom"
import { Authcontext ,Authcontextprovider} from "./context/Authcontext";
import { Chatcontextprovider } from "./context/chatcontext";

function App() {
  const {user}=useContext(Authcontext)
  return (
    <>
      <Chatcontextprovider user={user}>
        <NavBar/>
        <Container>
          <Routes>
            <Route path="/" element={user ?<Chat/>:<Login/>}/>
            <Route path="/Signup" element={user ?<Chat/>:<Signup/>}/>
            <Route path="/Login" element={user ?<Chat/>:<Login/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
        </Container>
      </Chatcontextprovider>
    </>
  );
}

export default App;
