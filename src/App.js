import {Routes,BrowserRouter,Route} from "react-router-dom"
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import 'tachyons'
import Addlist from "./pages/Addcontact";
import View from "./pages/View";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <ToastContainer position='top-center'/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/addcontact" element={<Addlist/>} />
    <Route path="/update/:id" element={<Addlist/>} />
    <Route path="/view/:id" element={<View/>} />
    </Routes>
    
    </BrowserRouter>
    
      
    </div>
  );
}

export default App;
