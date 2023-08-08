import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <ToastContainer />
   <BrowserRouter>
    <Routes>

      <Route  path="/" element={<Signup/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      
    </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
