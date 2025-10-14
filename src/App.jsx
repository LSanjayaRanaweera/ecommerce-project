import { Routes, Route } from 'react-router'                          // Import Routes for defining <routes></routes>
import HomePage from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage'                   // Import CheckoutPage component/destructure
import OrdersPage from './pages/OrdersPage'
import TrackingPage from './pages/TrackingPage'
import './App.css'

function App() {


  return (
    <Routes>
      <Route index element={<HomePage />} />                          {/* Define route for HomePage path="/" same as index */}
      <Route path='/checkout' element={ <CheckoutPage />} />          {/* Define route for CheckoutPage path="/checkout" */} 
      <Route path='/orders' element={ <OrdersPage />} />              {/* Define route for Orders path="/orders" */}
      <Route path='/tracking' element={ <TrackingPage/>} />           {/* Define route for Tracking path="/tracking" */}      
    </Routes>
  )
}

export default App
