import { Routes, Route } from 'react-router'                          // Import Routes for defining <routes></routes>
import HomePage from './pages/HomePage'
import './App.css'


function App() {


  return (
    <Routes>
      <Route index element={<HomePage />} />                          {/* Define route for HomePage path="/" same as index */}
      <Route path='/checkout' element={<div>404 Not Found</div>} />   {/* Fallback route for undefined paths */}  
      
    </Routes>
  )
}

export default App
