import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);      //Default value = 1, can't add 0 items to the cart with add button

  const AddToCart = async () => {
    await axios.post("/api/cart-items", {           // HTTP POST request and an object with productId and quantity
      productId: product.id,
      quantity,                                     //NOTE: this shorthand syntax >> quantity: quantity << property quantity assigned value of the same property name quantity
    });
    await loadCart();                               // Call loadCart function to refresh cart data in App.jsx
  };

  const selectQuantity = (event) => {
    // To update quantity state when user selects a different quantity
    const quantitySelected = Number(event.target.value); // converting string value to a Number
    setQuantity(quantitySelected); // update state of quantity
  };
  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image"                         
          src={product.image} 
          data-testid="product-image" />                      {/*"data-testid" attribute is SPECIFICALLY added during integration testing*/}
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"          
          src={`images/ratings/rating-${product.rating.stars * 10}.png`} 
          data-testid="product-rating-stars-image"/>          {/*"data-testid" attribute is SPECIFICALLY added during integration testing*/}
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {formatMoney(product.priceCents)}{" "}
        {/* Call formatMoney function to convert cents to dollars */}
      </div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button className="add-to-cart-button button-primary" 
        onClick={AddToCart}
        data-testid="add-to-cart-button">                     {/*"data-testid" attribute is SPECIFICALLY added to test user interactions during integration testing*/}
        Add to Cart
      </button>
    </div>
  );
}
/*
This illustrates a single <Product /> componenet of the Application and we can implement useState Hook to update the quantity of the items being added.
Each product was in an iterating loop (.map) in ProductGrid component >> NOTE: "NOT able to add useState to an iterating loop" per React convention
We are ONLY creating a single <Product /> component here. Hence we can implement useState per React convention (i.e., outside of an iterating loop).
Afterwards implement this component to the iterartion loop to satisfy React convention plus implemnt use state on each product
*/
