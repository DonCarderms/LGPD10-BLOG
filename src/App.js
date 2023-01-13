import React from "react";
import { BrowserRouter as Router, Switch, Routes, Route , link} from 'react-router-dom';
import './App.css'

// routes
import Login from "./pages/login/index";
import Cadastro from "./pages/cadastro/index";
import Admin from "./pages/administrador/index";
import Home from "./pages/home/index";
import Autor from "./pages/autor/index";
import PaginaDeErro from "./pages/404/index";
import Postagem from "./pages/postagem/index";


function App() {

  return ( 
    <div className="App">
      <Router>
        <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/cadastro" element={<Cadastro/>}/>
              <Route path="/admin" element={<Admin />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/autor" element={<Autor/>}/>
              <Route path="/postagem" element={<Postagem />}/>
              <Route path="/404" element={<PaginaDeErro />}/>
        </Routes>
      </Router>
    </div>
    // Rotas
  );
}

export default App;
