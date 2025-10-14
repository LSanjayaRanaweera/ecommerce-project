import { Routes, Route } from 'react-router'                          // Import Routes for defining <routes></routes>
import HomePage from './pages/HomePage'
import './App.css'
import { CheckoutPage } from './pages/CheckoutPage'                   // Import CheckoutPage component


function App() {


  return (
    <Routes>
      <Route index element={<HomePage />} />                          {/* Define route for HomePage path="/" same as index */}
      <Route path='/checkout' element={ <CheckoutPage />} />          {/* Define route for CheckoutPage path="/checkout" */} 
      <Route path='/orders' element={ < Orders />} />                 {/* Define route for Orders path="/orders" */}
      <Route path='/tracking' element={ <Tracking/>} />               {/* Define route for Tracking path="/tracking" */}

      
    </Routes>
  )
}

export default App
