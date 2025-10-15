import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { formatMoney } from "../utils/money";
import "./HomePage.css";

function HomePage({cart}) {
  const [products, setProducts] = useState([]);           // State to hold products fetched from API
//Note: cart == array of cart items (not a single cart item/product). Each cart item has a productId and quantity!!
  useEffect(() => {
    axios.get("/api/products")
      .then((response) => {      
        setProducts(response.data);                       // Update state with fetched products << array of products
      });
  }, []);                                                 // Empty dependency array means this effect runs once on mount  
  
  
    


  return (
    <>
      <title>Ecommerce project</title>
{/* Quantity of the 'cart' is a header element, using props "cart"={cart} << state variable from above. This needs to be updated in Header.jsx*/}
      <Header cart={cart}/>

      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" 
                  src={product.image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {product.name}
                </div>

                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                  />
                  <div className="product-rating-count link-primary">
                    {product.rating.count}
                  </div>
                </div>

                <div className="product-price">
                  {formatMoney(product.priceCents)}                              {/* Call formatMoney function to convert cents to dollars */}  
                </div>

                <div className="product-quantity-container">
                  <select>
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

                <button className="add-to-cart-button button-primary">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default HomePage;
