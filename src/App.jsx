
import { Routes, Route } from 'react-router'                          // Import Routes for defining <routes></routes>
import { useEffect, useState } from 'react'                           // Import useEffect and useState hooks from React
import axios from 'axios'                                             // Import axios for making HTTP requests
import HomePage from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage'                   // Import CheckoutPage component/destructure
import OrdersPage from './pages/OrdersPage'
import TrackingPage from './pages/TrackingPage'
import './App.css'

function App() {
  //Lifting state up - passing cart state from HomePage to App.jsx and then to CheckoutPage
  //So that cart state is available in both HomePage and CheckoutPage
  const [cart, setCart] = useState([]);                               // State to hold cart items fetched from API
  //Note: cart == array of cart items (not a single cart item/product). Each cart item has a productId and <quantity!!

  useEffect(() => {
    axios.get("/api/cart-items")
      .then((response) => {      
        setCart(response.data);                                       // Update state with fetched cart items << array of carts
      });
  }, []);                                                             // Empty dependency array means this effect runs once on mount


  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />                          {/* Define route for HomePage path="/" same as index */}
      <Route path='/checkout' element={ <CheckoutPage cart={cart} />} />          {/* Define route for CheckoutPage path="/checkout" */} 
      <Route path='/orders' element={ <OrdersPage />} />              {/* Define route for Orders path="/orders" */}
      <Route path='/tracking' element={ <TrackingPage/>} />           {/* Define route for Tracking path="/tracking" */}      
    </Routes>
  )
}

export default App
