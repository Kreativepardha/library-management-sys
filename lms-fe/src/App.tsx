import { useState } from 'react'

import './App.css'
import { AddBook } from './pages/AddBook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        {/* <BookForm /> */}
        <AddBook />
    </div>
  )
}

export default App
