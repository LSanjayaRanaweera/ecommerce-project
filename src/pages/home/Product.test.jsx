import { it, expect, describe, vi } from 'vitest';
import { render, screen} from '@testing-library/react';         //"render" renders the testing component and "screen" checks it in a fake webpage (a simulation)
import { Product } from './Product';

describe('Product component', () => {
    it('display the product details corretly', () => {
        //Sample data is from starting-code/data/product.js and it is stored in a varible to plug in as the value for product prop in the render()
        const product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };        
        //In the actual application, loadCart is implemented by an HTTP request to the backend. Here we will mock that request (create a fake version of that function)
        //To create a mock, import 'vi' from vitest (destructured above) 
        const loadCart = vi.fn();

        //Implement the testing component with its props within the render function. <Product /> has two props >> product and loadCart 
        render(<Product product={product} loadCart={loadCart}/>);    
       //NOTE: This setup will render a <Product /> in a fake webpage

       //Each test will be checked owith .screen  << fake display
       //1. Check if the name of the product is displayed correctly
       expect(
        screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
       ).toBeInTheDocument();

       //2. Check if the price of the product is diaplayed correctly
       expect(
        screen.getByText('$10.90')                              //NOTE: priceCents: 1090 converted to $10.90 
       ).toBeInTheDocument();

       //3.Check product image is displayed correctly. NOTE: we cannot implement a screen.getByText() for that. 
       //Instead we can check a immage attribute >> For that, assign a new <image> attribute in <Product /> called, data-testId="product-image" to be tested.
       expect(
        screen.getByTestId('product-image')
       ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

       //4.Check 'product rating star image', similar to above this also require an <image> attribute >> assign data-testId="product-rating-stars-iamage"
       expect(
        screen.getByTestId('product-rating-stars-image')
       ).toHaveAttribute('src', 'images/ratings/rating-45.png');       //'rating-45.png' is calculated from (4.5 rating * 10)  << from ${product.rating.stars * 10}

       //5.Check product rating count
       expect(
        screen.getByText('87')
       ).toBeInTheDocument();
    });
});