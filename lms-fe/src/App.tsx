
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Books } from './pages/Books'
import { Dashboard } from './pages/Dashboard'
import { Students } from './pages/Students'
import { Register } from './pages/Register'
import { Loading } from './components/Loading'
import Navbar from './components/Navbar'
import { AddStudent } from './pages/AddsStudents'
import { AddBook } from './pages/AddBook'
import IssueBook from './pages/IssueBook'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
        <Routes>
          <Route path='/' element={<Login />}  />
          <Route path='/register' element={<Register />}  />
          <Route path='/addstudent' element={<AddStudent />}  />
          <Route path='/dashboard' element={<Dashboard />}  />
          <Route path='/books' element={<Books />}  />
          <Route path='/students' element={<Students />}  />
          <Route path='/addbook' element={<AddBook />}  />
          {/* <Route path='/issuebook' element={<IssueBook />}  /> */}
          <Route path='/loading' element={<Loading />}  />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
