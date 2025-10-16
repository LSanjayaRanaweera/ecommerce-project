import { Product } from "./Product";

export function ProductGrid({ products, loadCart }) {
  

  return (
    <div className="products-grid">
      {products.map((product) => {                            
        return (
          <Product key={product.id} product={product} loadCart={loadCart}/> 
          //NOTE: single product to be impleneted in <Product> not the whole array products received by ProductGrid
        );
      })}
    </div>
  );
}
