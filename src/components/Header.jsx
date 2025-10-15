import { Link } from 'react-router';
import './header.css';

export function Header({ cart }) {                        //cart is an array of cart items, each cart item has a productId and quantity
  //Calculating total quantity of items in the cart
  let totalQuantity = 0;

  for (const item of cart) {
    totalQuantity += item.quantity;                        //summing up the quantity of each cart item to get total quantity
  }   
  /*for..of loop is implemented above << VSCode suggestion, could have used forEach as well to update total items in the cart
    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    })*/
  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">                                   
          <img className="logo" src="images/logo-white.png" />
          <img className="mobile-logo" src="images/mobile-logo-white.png" />
        </Link >
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}

/*
1. Anchor tags <a> are replaced with <Link> from react-router for client-side routing << for better performance, no full page reloads
2. to="" attribute is used instead of href in <Link> component
3  cart quantity is calculated using a for..of loop to sum up the quantity of each cart item
*/

