import './App.css'
import Dashboard from './pages/Dashboard/Dashboard';
import Dealarea from './pages/Dealarea/Dealarea';
import Editproduct from './pages/Editproduct/Editproduct';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Addproducts from './pages/Products/Addproducts/Addproducts';
import Listproducts from './pages/Products/Listproducts/Listproduct';
import Restoreproduct from './pages/Products/Restoreproduct/Restoreproduct';
import Signup from './pages/Signup/Signup'
import {
  BrowserRouter as Router,
  Routes, Route,
  Link
} from 'react-router-dom';


function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />


          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Listproducts" element={<Listproducts />} />
          <Route path="/Addproducts" element={<Addproducts />} />
          <Route path="/editproduct/:id" element={<Editproduct />} />
          <Route path="/Restoreproduct" element={<Restoreproduct />} />
          <Route path="/Dealarea" element={<Dealarea />} />


        </Routes>
      </Router >


    </>
  )
}

export default App
