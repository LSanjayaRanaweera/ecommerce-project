import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductGrid } from "./ProductGrid";
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

        <ProductGrid products={products} />               {/* Pass products state as props to ProductGrid component */}

      </div>
    </>
  );
}
export default HomePage;
