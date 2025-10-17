import axios from 'axios';
import dayjs from "dayjs"; // Import dayjs for date formatting
import { formatMoney } from "../../utils/money"; // Import formatMoney utility for formatting money values

export function DeliveryOptions({ cartItem, deliveryOptions, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping"; //Default price string for free shipping
        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
        }
        //Callback for onClick
        const updateDeliveryOption = async () => {
          //HTTP request - PUT method (URL, {data})
          await axios.put(`/api/cart-items/${cartItem.productId}`, { deliveryOptionId: deliveryOption.id }); 
          // Reload the cart, i.e., run loadCart() to update once the request is complete -- 200 OK
            //1st share the loadCart prop in App.jsx with <CheckoutPage /> implementation
            //2nd add loadCart prop in CheckoutPage,jsx, afterwards share it with <OrderSummary /> implementation
            //3rd add loadCart prop in OrderSummary.jsx, afterwards share it with <DeliveryOptions /> implementation
            //Finally add loadCart to props in DeliverySummary.jsx to be implemented
          await loadCart();
        }
        return (
          //Placing onClick on the wrapper <div> makes the entire content respond to click, i.e., NOT limited to radio input
          <div key={deliveryOption.id} className="delivery-option" onClick={updateDeliveryOption}>            
            <input
              type="radio"
              checked={cartItem.deliveryOptionId === deliveryOption.id}
              //checked attribute in <input> requires an onChange={} << warning in console. To override it, create a dummy onChange as below
              onChange= {() => {}} 
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {/* Access estimated delivery time from "expanded" estimatedDeliveryTimeMs details and format it using dayjs */}
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
/*

*/