
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AddBook } from './pages/AddBook'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}  />
          <Route path='/signup' element={<Signup />}  />
          <Route path='/books' element={<AddBook />}  />
        </Routes>
        </BrowserRouter>
  )
}

export default App
