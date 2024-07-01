
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Books } from './pages/Books'
import { Dashboard } from './pages/Dashboard'
import { Navbar } from './components/Navbar'
import { AddBook } from './components/AddBook'
import { Students } from './pages/Students'
import { Register } from './pages/Register'

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}  />
          <Route path='/register' element={<Register />}  />
          <Route path='/dashboard' element={<Dashboard />}  />
          <Route path='/books' element={<Books />}  />
          <Route path='/students' element={<Students />}  />
          <Route path='/addbook' element={<AddBook />}  />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
