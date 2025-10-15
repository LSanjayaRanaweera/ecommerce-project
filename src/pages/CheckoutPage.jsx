import { useState, useEffect } from "react"; //To set up delivery options
import axios from "axios"; //To fetch delivery options from backend
import dayjs from "dayjs"; //To format delivery date
import { formatMoney } from "../utils/money";
import "./checkout-header.css";
import "./CheckoutPage.css";

export function CheckoutPage({ cart }) {
  // Accept cart prop passed from App.jsx to generate HTML dynamically

  const [deliveryOptions, setDeliveryOptions] = useState([]); //To store delivery options fetched from backend
  const [paymentSummary, setPaymentSummary] = useState(null); //To store payment summary details

  useEffect(() => {
    //To fetch delivery options from backend when component mounts
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime") //Fetch delivery options from backend, "expanding" Query parameter estimatedDelivery details SEE BELOW (2)
      .then((response) => {
        setDeliveryOptions(response.data); //Set delivery options state with data from backend
      })
      .catch((error) => {
        console.error("Error fetching delivery options:", error);
      });

    //Fetch payment summary details from backend when component mounts
    axios
      .get("/api/payment-summary") //Fetch payment summary from backend
      .then((response) => {
        setPaymentSummary(response.data); //Set payment summary state with data from backend
      })
      .catch((error) => {
        console.error("Error fetching payment summary:", error);
      });
  }, []);

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
          <div className="order-summary">
            {deliveryOptions.length > 0 &&
              cart.map((cartItem) => {
                //Ensure delivery options are loaded before rendering cart items
                //For each cart item, find the selected delivery option from deliveryOptions state using deliveryOptionId from cart item
                const selectedDeliveryOption = deliveryOptions.find(
                  (deliveryOption) => {
                    //Find the selected delivery option for the cart item
                    return deliveryOption.id === cartItem.deliveryOptionId;
                  }
                );
                return (
                  /* Use productId as key */
                  <div key={cartItem.productId} className="cart-item-container">
                    <div className="delivery-date">
                      {/* Access estimated delivery time from "expanded" estimatedDeliveryTimeMs details and format it using dayjs */}
                      Delivery date:
                      {dayjs(
                        selectedDeliveryOption.estimatedDeliveryTimeMs
                      ).format("dddd, MMMM D")}
                    </div>
                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={cartItem.product.image}
                      />
                      {/* Access product image from ""expanded"" product details */}
                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                          {/* Access product name from "expanded" product details */}
                        </div>
                        <div className="product-price">
                          {formatMoney(cartItem.product.priceCents)}
                          {/* Access product price from "expanded" product details and convert cents to dollars */}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity:
                            <span className="quantity-label">
                              {cartItem.quantity}
                            </span>
                            {/* Access quantity from cart item << WHY NO 'expanded' product?? SEE BELOW (1) */}
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>
                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>

                        {deliveryOptions.map((deliveryOption) => {
                          let priceString = "FREE Shipping"; //Default price string for free shipping
                          if (deliveryOption.priceCents > 0) {
                            priceString = `${formatMoney(
                              deliveryOption.priceCents
                            )} - Shipping`;
                          }
                          return (
                            <div
                              key={deliveryOption.id}
                              className="delivery-option"
                            >
                              <input
                                type="radio"
                                checked={
                                  cartItem.deliveryOptionId ===
                                  deliveryOption.id
                                }
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {/* Access estimated delivery time from "expanded" estimatedDeliveryTimeMs details and format it using dayjs */}
                                  {dayjs(
                                    deliveryOption.estimatedDeliveryTimeMs
                                  ).format("dddd, MMMM D")}
                                </div>
                                <div className="delivery-option-price">
                                  {priceString}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>
            {paymentSummary  && (                                           /* Ensure payment summary is loaded before rendering details */
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax: </div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostCents)}
                  </div>
                </div>
                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
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
