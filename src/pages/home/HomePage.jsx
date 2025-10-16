import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductGrid } from "./ProductGrid";
import "./HomePage.css";

function HomePage({ cart, loadCart }) {                                  
  //Lifting state up - passing cart state from HomePage to App.jsx and then to CheckoutPage
  //So that cart state is available in both HomePage and CheckoutPage                           
  //Note: cart == array of cart items (not a single cart item/product). Each cart item has TWO properties >> productId and quantity
  //Note: loadCart function is also passed as prop from App.jsx to HomePage so that we can refresh the cart data after adding an item to the cart
  //State to hold products fetched from API
  const [products, setProducts] = useState([]);                           
  

  useEffect(() => {
    const getHomeData = async () => {                                     //defined async function to use await inside it
      const response = await axios.get("/api/products");                  // Fetch products from API
      setProducts(response.data);
    };
    getHomeData();                                                        // Call the async function to fetch products
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <title>Ecommerce project</title>
      {/* Quantity of the 'cart' is a header element, using props "cart"={cart} << state variable from above. This needs to be updated in Header.jsx*/}
      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart}/>
        {/* Pass products state as props to ProductGrid component */}
      </div>
    </>
  );
}
export default HomePage;
