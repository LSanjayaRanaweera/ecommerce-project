import { Routes, Route } from 'react-router'                          // Import Routes for defining <routes></routes>
import HomePage from './pages/HomePage'
import './App.css'
import { CheckoutPage } from './pages/CheckoutPage'                   // Import CheckoutPage component


function App() {


  return (
    <Routes>
      <Route index element={<HomePage />} />                          {/* Define route for HomePage path="/" same as index */}
      <Route path='/checkout' element={ <CheckoutPage />} />          {/* Fallback route for undefined paths */}  
      
    </Routes>
  )
}

export default App
