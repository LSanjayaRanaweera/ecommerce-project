import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";

export function OrderSummary({ cart, deliveryOptions }) {
  return (
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
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
              </div>
              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />
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
                <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} />              {/* Pass cartItem and deliveryOptions as props to DeliveryOptions component */}
              </div>
            </div>
          );
        })}
    </div>
  );
}
