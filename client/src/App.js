import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"; import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Vendor from './Components/Vendor';
import Vehicle from './Components/Vehicle';
import Product from './Components/Product';
import Login from './Components/Login';
import Register from './Components/Register';
import AllProvider from './Context/AllProvider'
import QualityCheck from './Components/QualityCheck';
function App() {
  return (
    <>
      <Router>
        <AllProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Dashboard />}></Route>
            <Route exact path="/Vendor" element={<Vendor />}></Route>
            <Route exact path="/Vehicle" element={<Vehicle />}></Route>
            <Route exact path="/Product" element={<Product />}></Route>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/Register" element={<Register />}></Route>
            <Route exact path="/QualityCheck" element={<QualityCheck/>}></Route>
          </Routes>
        </AllProvider>
      </Router>
    </>
  );
}

export default App;
