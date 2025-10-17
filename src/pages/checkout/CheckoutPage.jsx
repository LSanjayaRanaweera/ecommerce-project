import { useState, useEffect } from "react";          //To set up delivery options
import axios from "axios";                            //To fetch delivery options from backend
import { OrderSummary } from "./OrderSummary";        //Import OrderSummary component
import { PaymentSummary } from "./PaymentSummary";
import "./checkout-header.css";
import "./CheckoutPage.css";


export function CheckoutPage({ cart, loadCart }) {
  // Accept cart prop passed from App.jsx to generate HTML dynamically

  const [deliveryOptions, setDeliveryOptions] = useState([]); //To store delivery options fetched from backend
  const [paymentSummary, setPaymentSummary] = useState(null); //To store payment summary details

  useEffect(() => {
    const fetchCheckoutData = async () => {
      // Fetch delivery options from backend with expanded estimated delivery time details
      let response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime");
      setDeliveryOptions(response.data);
      // Fetch payment summary details from backend
      response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);    
    };

    fetchCheckoutData();
  }, [cart]);          
  //Everytime the value of cart changes, it will run useEffect and update the paymentSummary, e.g. everytime we change delivery option

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              3 items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          {/* Pass cart, deliveryOptions and loadCart as props to OrderSummary component */}
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/> 
          {/* Pass paymentSummary as prop to PaymentSummary component */}
          <PaymentSummary paymentSummary={paymentSummary} />                                

        </div>
      </div>
    </>
  );
}
/*EXPLANATION OF "EXPAND" QUERY PARAMETER USAGE IN AXIOS GET REQUESTS:
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
(1) When fetching cart items from the backend, we use the "expand" query parameter to include detailed information about each product in the cart items. 
This means that instead of just getting a reference ID for each product, we get the full details of that product included in the response. 
This is useful for displaying more comprehensive information about each product in the cart, such as its name, image, and price.
NOTE: This axios GET request with "expand" query parameter is already implemented in App.jsx   
http://localhost:3000/api/cart-items
The response would look something like this:
  {
    "id": 1,
    "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    "quantity": 2,
    "deliveryOptionId": "1",
    "createdAt": "2025-10-14T06:52:45.887Z",
    "updatedAt": "2025-10-14T06:52:45.887Z"
  },
http://localhost:3000/api/cart-items?expand=product           
NOTE: The response contains a property named "product" with detailed info about the product
The response would look something like this: 
  {
    "id": 1,
    "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    "quantity": 2,
    "deliveryOptionId": "1",
    "createdAt": "2025-10-14T06:52:45.887Z",
    "updatedAt": "2025-10-14T06:52:45.887Z",
    "product": {
      "keywords": [
        "socks",
        "sports",
        "apparel"
      ],
      "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
      "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
      "rating": {
        "stars": 4.5,
        "count": 87
      },
      "priceCents": 1090,
      "createdAt": "2025-10-14T06:52:45.887Z",
      "updatedAt": "2025-10-14T06:52:45.887Z"
    }
  },
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
(2) When fetching delivery options from the backend, we use the "expand" query parameter to include detailed information about the estimated delivery time for each option. 
This means that instead of just getting a reference ID for the estimated delivery time, we get the full details of that estimated delivery time object included in the response. 
This is useful for displaying more comprehensive information about each delivery option to the user. 
http://localhost:3000/api/delivery-options
The response would look something like this:
[
  {
    "id": "1",
    "deliveryDays": 7,
    "priceCents": 0,
    "createdAt": "2025-10-14T06:52:45.887Z",
    "updatedAt": "2025-10-14T06:52:45.887Z"
  },
  {
    "id": "2",
    "deliveryDays": 3,
    "priceCents": 499,
    "createdAt": "2025-10-14T06:52:45.888Z",
    "updatedAt": "2025-10-14T06:52:45.888Z"
  },
  {
    "id": "3",
    "deliveryDays": 1,
    "priceCents": 999,
    "createdAt": "2025-10-14T06:52:45.889Z",
    "updatedAt": "2025-10-14T06:52:45.889Z"
  }
]
http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime  
NOTE: The response contains a property: "estimatedDeliveryTimeMs" with detailed info about estimated delivery time
The response would look something like this:
[
  {
    "id": "1",
    "deliveryDays": 7,
    "priceCents": 0,
    "createdAt": "2025-10-14T06:52:45.887Z",
    "updatedAt": "2025-10-14T06:52:45.887Z",
    "estimatedDeliveryTimeMs": 1761112707408                            << This is the expanded object with detailed info about estimated delivery time
  },
  {
    "id": "2",
    "deliveryDays": 3,
    "priceCents": 499,
    "createdAt": "2025-10-14T06:52:45.888Z",
    "updatedAt": "2025-10-14T06:52:45.888Z",
    "estimatedDeliveryTimeMs": 1760767107409                            << This is the expanded object with detailed info about estimated delivery time             
  },
  {
    "id": "3",
    "deliveryDays": 1,
    "priceCents": 999,
    "createdAt": "2025-10-14T06:52:45.889Z",
    "updatedAt": "2025-10-14T06:52:45.889Z",
    "estimatedDeliveryTimeMs": 1760594307409                            << This is the expanded object with detailed info about estimated delivery time
  }
]
*/
