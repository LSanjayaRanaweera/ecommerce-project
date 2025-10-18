import { it, expect, describe, vi } from 'vitest';
import { render, screen} from '@testing-library/react';         //"render" renders the testing component and "screen" checks it in a fake webpage (a simulation)
import userEvent from '@testing-library/user-event';            //simulate realistic user interactions in tests — e.g., typing, clicking, hovering etc.
import axios from 'axios';
import { Product } from './Product';

vi.mock('axios');               //Simulates an entire node package -axios in the test environment/fake version of axios and will not contact the backend

describe('Product component', () => {
    //A. SCREEN DISPLAY -- Each test will be checked with .screen implement << fake display of <Product />
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
        
        //1. Check if the name of the product is displayed correctly
        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();

        //2. Check if the price of the product is diaplayed correctly
        expect(
            screen.getByText('$10.90')                              //NOTE: priceCents: 1090 converted to $10.90 
        ).toBeInTheDocument();

        //3.Check product image is displayed correctly. NOTE: However we cannot implement a screen.getByText() for that. 
        //Instead we can check a immage attribute >> For that, assign a new <image> attribute in <Product /> called, data-testId="product-image" to be tested.
//Is this fake attribute get pushed upon deployment???        
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

    //B. USER INTERACTIONS
    it('adds a product to the cart', async () => {   
        //This also requires a product, a loadcart and a render of <Product />     
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

        const loadCart = vi.fn();                   //Fake function to avoid making actual HTTP requests to server

        render(<Product product={product} loadCart={loadCart}/>);                           
    
        //6. Check functionality of "Add to Cart" button of <Product />
        //Besides all above, we need to setup the ability to simulate events for testing 
        const user = userEvent.setup(); 
        //Capture the element from the screen (fake display/view)
        const addToCartButton = screen.getByTestId("add-to-cart-button");  
        //Simulating a click event by passing on the "screen" element
        await user.click(addToCartButton);           //Need to make the anonymous function asynchronous (above)  

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {            
                productId:  "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",        //id of the product in fake screen should be 
                quantity: 1                                                //nothing was in the the fake screen befoire, so quntity would be 1 (added with request)
            }
        );                                                                 //This checks if we make a mock request if it returns above value 

        expect(loadCart).toHaveBeenCalled();
    })
});
